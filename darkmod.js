// ===== THEME =====
let modeBtn = document.querySelector("#Mode");
let body = document.body;

modeBtn.onclick = () => {
    body.classList.toggle("dark");
    body.classList.toggle("light");
};


// ===== ELEMENTS =====
let addBtn = document.querySelector("#addGit");
let input = document.querySelector("#githubLink");
let actionSelect = document.querySelector("#actionType");
let container = document.querySelector("#savedLinks");


// ===== USERNAME EXTRACT =====
function getName(url) {
    try {
        let parts = url.split("/");
        return parts[3] || "Link";
    } catch {
        return "Link";
    }
}


// ===== CREATE CARD =====
function createCard(data, index) {

    let wrapper = document.createElement("div");
    wrapper.className = "card";

    let btn = document.createElement("button");
    btn.textContent = data.name + " (" + data.action + ")";

    if (data.action === "click") {
        btn.onclick = () => window.open(data.link, "_blank");
    }

    if (data.action === "dblclick") {
        btn.ondblclick = () => window.open(data.link, "_blank");
    }

    if (data.action === "hover") {
        btn.onmouseenter = () => window.open(data.link, "_blank");
    }

    let del = document.createElement("button");
    del.textContent = "❌";
    del.className = "delete";

    del.onclick = () => deleteItem(index);

    wrapper.appendChild(btn);
    wrapper.appendChild(del);

    container.appendChild(wrapper);
}


// ===== DELETE =====
function deleteItem(index) {
    let saved = JSON.parse(localStorage.getItem("links")) || [];
    saved.splice(index, 1);
    localStorage.setItem("links", JSON.stringify(saved));
    render();
}


// ===== RENDER =====
function render() {
    container.innerHTML = "";

    let saved = JSON.parse(localStorage.getItem("links")) || [];

    saved.forEach((item, index) => {
        createCard(item, index);
    });
}


// ===== LOAD =====
window.onload = render;


// ===== ADD =====
addBtn.onclick = () => {
    let link = input.value.trim();
    let action = actionSelect.value;

    if (!link) return;

    let data = {
        link,
        name: getName(link),
        action
    };

    let saved = JSON.parse(localStorage.getItem("links")) || [];
    saved.push(data);
    localStorage.setItem("links", JSON.stringify(saved));

    render();
    input.value = "";
};


// ===== SLIDER =====
let slider = document.querySelector("#hoverDiv");
let thumb = document.querySelector("#thumb");

let drag = false;
let startX = 0;

thumb.onmousedown = (e) => {
    drag = true;
    startX = e.clientX - thumb.offsetLeft;
};

document.onmousemove = (e) => {
    if (!drag) return;

    let x = e.clientX - startX;
    let max = slider.offsetWidth - thumb.offsetWidth - 5;

    x = Math.max(0, Math.min(x, max));
    thumb.style.left = x + "px";
};

document.onmouseup = () => {
    if (!drag) return;

    let max = slider.offsetWidth - thumb.offsetWidth - 5;

    if (thumb.offsetLeft >= max - 2) {
        window.open("https://google.com", "_blank");
    }

    thumb.style.left = "5px";
    drag = false;
};