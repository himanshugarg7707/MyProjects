// Smart Launcher - JavaScript Code
document.addEventListener('DOMContentLoaded', function() {
    const modeButton = document.getElementById('Mode');
    const addGitButton = document.getElementById('addGit');
    const githubInput = document.getElementById('githubLink');
    const actionTypeSelect = document.getElementById('actionType');
    const savedLinksContainer = document.getElementById('savedLinks');
    const singleClickBtn = document.getElementById('singleClick');
    const doubleClickBtn = document.getElementById('doubleClick');
    const hoverDiv = document.getElementById('hoverDiv');
    const thumb = document.getElementById('thumb');

    // Initialize theme from localStorage
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.body.className = savedTheme;

    // Theme Toggle
    modeButton.addEventListener('click', function() {
        const currentTheme = document.body.className;
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.body.className = newTheme;
        localStorage.setItem('theme', newTheme);
    });

    // Load saved links on page load
    loadSavedLinks();

    // Add Link Button
    addGitButton.addEventListener('click', function() {
        const link = githubInput.value.trim();
        const actionType = actionTypeSelect.value;
        
        if (link === '') {
            alert('Please enter a valid link!');
            return;
        }

        // Save to localStorage
        let savedLinks = JSON.parse(localStorage.getItem('savedLinks')) || [];
        savedLinks.push({ link, actionType });
        localStorage.setItem('savedLinks', JSON.stringify(savedLinks));

        // Display the link
        addLinkButton(link, actionType);
        githubInput.value = '';
    });

    // Function to add link button
    function addLinkButton(link, actionType) {
        const linkBtn = document.createElement('button');
        linkBtn.className = 'saved-link-btn';
        linkBtn.textContent = link;

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = '×';
        deleteBtn.style.marginLeft = '5px';
        deleteBtn.style.padding = '5px 10px';

        // Create container for link and delete button
        const linkContainer = document.createElement('div');
        linkContainer.style.display = 'flex';
        linkContainer.style.gap = '5px';
        linkContainer.style.alignItems = 'center';
        linkContainer.appendChild(linkBtn);
        linkContainer.appendChild(deleteBtn);

        // Add action listener based on type
        if (actionType === 'click') {
            linkBtn.addEventListener('click', function() {
                window.open(link, '_blank');
            });
        } else if (actionType === 'dblclick') {
            linkBtn.addEventListener('dblclick', function() {
                window.open(link, '_blank');
            });
        } else if (actionType === 'hover') {
            linkBtn.addEventListener('mouseenter', function() {
                window.open(link, '_blank');
            });
        }

        // Delete functionality
        deleteBtn.addEventListener('click', function() {
            linkContainer.remove();
            let savedLinks = JSON.parse(localStorage.getItem('savedLinks')) || [];
            savedLinks = savedLinks.filter(item => item.link !== link);
            localStorage.setItem('savedLinks', JSON.stringify(savedLinks));
        });

        savedLinksContainer.appendChild(linkContainer);
    }

    // Load saved links from localStorage
    function loadSavedLinks() {
        let savedLinks = JSON.parse(localStorage.getItem('savedLinks')) || [];
        savedLinks.forEach(item => {
            addLinkButton(item.link, item.actionType);
        });
    }

    // Static Button Actions
    singleClickBtn.addEventListener('click', function() {
        alert('Single Click - ToDo List feature coming soon!');
    });

    doubleClickBtn.addEventListener('click', function() {
        alert('Double Click - PDF Merger feature coming soon!');
    });

    // Slider functionality
    let isSliding = false;
    let startX = 0;

    thumb.addEventListener('mousedown', function(e) {
        isSliding = true;
        startX = e.clientX - thumb.offsetLeft;
    });

    document.addEventListener('mousemove', function(e) {
        if (!isSliding) return;
        
        let x = e.clientX - startX;
        const maxX = hoverDiv.offsetWidth - thumb.offsetWidth;
        
        if (x < 0) x = 0;
        if (x > maxX) x = maxX;
        
        thumb.style.left = x + 'px';
    });

    document.addEventListener('mouseup', function() {
        if (isSliding) {
            isSliding = false;
            const maxX = hoverDiv.offsetWidth - thumb.offsetWidth;
            const threshold = maxX * 0.8;
            
            if (parseInt(thumb.style.left) > threshold) {
                alert('Slider activated!');
                thumb.style.left = maxX + 'px';
                setTimeout(() => {
                    thumb.style.left = '5px';
                }, 500);
            } else {
                thumb.style.left = '5px';
            }
        }
    });
});