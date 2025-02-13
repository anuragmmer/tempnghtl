const transitionStyles = document.createElement('style');
transitionStyles.textContent = `
    body {
        margin: 0;
        opacity: 1;
        transition: all 0.5s ease-out;
    }
    
    body.blur-transition {
        filter: blur(8px);
        opacity: 0.7;
    }

    body.initial-blur {
        filter: blur(8px);
        opacity: 0.7;
        transition: none;
    }

    /* Common styles for animated elements */
    header, .toc-container {
        opacity: 0;
        transition: none;
        visibility: hidden;
    }

    header.positioned, .toc-container.positioned {
        transition: opacity 0.5s ease-out;
        visibility: visible;
    }

    header.show, .toc-container.show {
        opacity: 1;
    }

    .element-hidden {
        opacity: 0;
    }
`;
document.head.appendChild(transitionStyles);

function initializePageTransitions() {
    if (window.pageTransitionInitialized) return;
    window.pageTransitionInitialized = true;

    document.body.classList.add('initial-blur');

    const elementsToAnimate = ['header', '.toc-container'];
    elementsToAnimate.forEach(selector => {
        const element = document.querySelector(selector);
        if (element) {
            element.classList.add('element-hidden');
        }
    });

    function navigateWithBlur(targetUrl, isBackNavigation = false) {
        document.body.classList.add('blur-transition');
        sessionStorage.setItem('isBackNavigation', isBackNavigation);
        setTimeout(() => {
            window.location.href = targetUrl;
        }, 500);
    }

    document.addEventListener('click', function(e) {
        const backHomeButton = e.target.closest('.back-home-link');
        const link = e.target.closest('a[href$=".html"]');

        if (backHomeButton) {
            e.preventDefault();
            sessionStorage.setItem('previousPage', window.location.href);
            navigateWithBlur('/', true);
        }
        else if (link && link.hostname === window.location.hostname) {
            e.preventDefault();
            sessionStorage.setItem('previousPage', window.location.href);
            navigateWithBlur(link.href, false);
        }
    });

    function animateElement(element, delay) {
        if (element) {
            element.style.visibility = 'hidden';
            element.classList.add('element-hidden');

            element.classList.add('positioned');

            setTimeout(() => {
                element.style.visibility = 'visible';
                element.classList.remove('element-hidden');
                element.classList.add('show');
            }, delay);
        }
    }

    function removeBlur() {
        document.body.classList.remove('initial-blur');
        document.body.classList.remove('blur-transition');

        setTimeout(() => {
            const header = document.querySelector('header');
            animateElement(header, 0);

            const toc = document.querySelector('.toc-container');
            animateElement(toc, 200);
        }, 500);
    }

    window.addEventListener('DOMContentLoaded', () => {
        requestAnimationFrame(() => {
            document.body.offsetHeight;
            setTimeout(removeBlur, 50);
        });
    });

    window.addEventListener('popstate', () => {
        document.body.classList.add('blur-transition');
        elementsToAnimate.forEach(selector => {
            const element = document.querySelector(selector);
            if (element) {
                element.classList.remove('show');
                element.classList.add('element-hidden');
            }
        });
    });

    window.addEventListener('pageshow', function(event) {
        if (event.persisted) {
            document.body.classList.add('initial-blur');
            requestAnimationFrame(() => {
                setTimeout(removeBlur, 50);
            });
        }
    });

    window.addEventListener('unload', () => {
        sessionStorage.setItem('pageIsLoading', 'true');
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializePageTransitions);
}
else {
    initializePageTransitions();
}
