function updateClock() {
    const clockElement = document.getElementById('clock');
    const countryElement = document.querySelector('.country');
    const now = new Date();
    
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const country = timeZone.split('/')[0].replace(/_/g, ' ');
    
    clockElement.textContent = `${hours}:${minutes}:${seconds}`;
    countryElement.textContent = country;
}

updateClock();
setInterval(updateClock, 1000);

document.getElementById('knowLink').addEventListener('click', function(e) {
    e.preventDefault();
    const mainContent = document.querySelector('.main-content');
    const knowContent = document.querySelector('.know-content');
    
    mainContent.classList.add('fade-out');
    knowContent.style.display = 'block';
    
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            knowContent.classList.add('fade-in');
        });
    });
});

document.getElementById('homeLink').addEventListener('click', function(e) {
    e.preventDefault();
    const mainContent = document.querySelector('.main-content');
    const knowContent = document.querySelector('.know-content');
    
    knowContent.classList.remove('fade-in');
    
    setTimeout(() => {
        knowContent.style.display = 'none';
        requestAnimationFrame(() => {
            mainContent.classList.remove('fade-out');
        });
    }, 300);
});

function showArticles(e) {
    if (e) e.preventDefault();
    
    document.querySelector('.background-video').classList.add('blur');
    
    document.querySelector('.content-container').classList.add('slide-up');
    
    document.querySelector('.articles-container').classList.add('slide-up');

    document.querySelector('.attribution').classList.add('fade-out');

    const blogLink = document.querySelector('.blog-link');
    blogLink.textContent = 'Home';
    blogLink.href = '/';
    blogLink.removeEventListener('click', showArticles);
    blogLink.addEventListener('click', hideArticles);
}

function hideArticles(e) {
    if (e) e.preventDefault();
    
    document.querySelector('.background-video').classList.remove('blur');
    
    document.querySelector('.content-container').classList.remove('slide-up');
    
    document.querySelector('.articles-container').classList.remove('slide-up');

    document.querySelector('.attribution').classList.remove('fade-out');
    
    const blogLink = document.querySelector('.blog-link');
    blogLink.textContent = 'Articles';
    blogLink.href = '/blog';
    blogLink.removeEventListener('click', hideArticles);
    blogLink.addEventListener('click', showArticles);
}

document.querySelector('a[href="/read"]').addEventListener('click', showArticles);
document.querySelector('.blog-link').addEventListener('click', showArticles);
document.querySelector('.back-home').addEventListener('click', hideArticles);