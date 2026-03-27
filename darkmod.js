// ===== UNIVERSAL SLIDER: Mouse & Touch support =====
let slider = document.querySelector("#hoverDiv");
let thumb = document.querySelector("#thumb");
let drag = false;
let startX = 0;

function updateThumb(x) {
    const min = 0;
    const max = slider.offsetWidth - thumb.offsetWidth - 5;
    x = Math.max(min, Math.min(x, max));
    thumb.style.left = x + "px";
    return x;
}
// --- Mouse ---
thumb.onmousedown = (e) => {
    drag = true;
    startX = e.clientX - thumb.offsetLeft;
    document.body.style.userSelect = "none";
};
document.onmousemove = (e) => {
    if (!drag) return;
    updateThumb(e.clientX - startX);
};
document.onmouseup = () => {
    if (!drag) return;
    const max = slider.offsetWidth - thumb.offsetWidth - 5;
    if (thumb.offsetLeft >= max - 2) {
        window.open("https://himanshugarg7707.github.io/pdfMerger/", "_blank");
    }
    thumb.style.left = "5px";
    drag = false;
    document.body.style.userSelect = "";
};
// --- Touch ---
thumb.ontouchstart = (e) => {
    drag = true;
    if (e.touches.length === 1) {
        startX = e.touches[0].clientX - thumb.offsetLeft;
    }
};
document.ontouchmove = (e) => {
    if (!drag || e.touches.length !== 1) return;
    updateThumb(e.touches[0].clientX - startX);
};
document.ontouchend = () => {
    if (!drag) return;
    const max = slider.offsetWidth - thumb.offsetWidth - 5;
    if (thumb.offsetLeft >= max - 2) {
        window.open("https://himanshugarg7707.github.io/pdfMerger/", "_blank");
    }
    thumb.style.left = "5px";
    drag = false;
};