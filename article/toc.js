class TableOfContents {
    constructor() {
        this.initialize();
    }

    initialize() {
        const tocContainer = document.createElement('div');
        tocContainer.className = 'toc-container';
        
        const style = document.createElement('style');
        style.textContent = `
            .toc-container {
                position: fixed;
                top: 180px;
                left: 40px;
                max-width: 300px;
                max-height: calc(100vh - 340px);
                background: rgba(0, 0, 0, 0);
                backdrop-filter: blur(10px);
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: 12px;
                padding: 20px;
                z-index: 100;
                font-family: 'Manrope', sans-serif;
                display: flex;
                flex-direction: column;
            }

            .toc-title {
                font-size: 0.9rem;
                color: rgba(255, 255, 255, 0.6);
                margin-bottom: 20px;
                font-weight: 500;
                text-transform: uppercase;
                letter-spacing: 1px;
            }

            .toc-list {
                list-style: none;
                padding: 0;
                margin: 0;
                overflow-y: auto;
                scrollbar-width: thin;
                scrollbar-color: rgba(255, 255, 255, 0.15) transparent;
            }
            
            .toc-list::-webkit-scrollbar {
                width: 6px;
            }
            
            .toc-list::-webkit-scrollbar-track {
                background: transparent;
            }
            
            .toc-list::-webkit-scrollbar-thumb {
                background-color: rgba(255, 255, 255, 0.3);
                border-radius: 3px;
            }
            
            .toc-list::-webkit-scrollbar-thumb:hover {
                background-color: rgba(255, 255, 255, 0.5);
            }

            .toc-item {
                margin-bottom: 12px;
            }

            .toc-link {
                color: rgba(255, 255, 255, 0.8);
                text-decoration: none;
                font-size: 0.95rem;
                transition: all 0.2s ease;
                display: block;
                line-height: 1.4;
            }

            .toc-link:hover {
                color: #fff;
                transform: translateX(4px);
            }

            .toc-link.h3 {
                padding-left: 20px;
                font-size: 0.9rem;
                color: rgba(255, 255, 255, 0.6);
            }

            @keyframes blink-animation {
                0% { color: rgb(255, 255, 255); }
                50% { color: rgb(255, 0, 0); }
                100% { color: rgb(255, 255, 255); }
            }

            .blink-highlight {
                animation: blink-animation 1s ease-in-out;
            }

            @media (max-width: 1450px) {
                .toc-container {
                    display: none;
                }
            }
        `;
        document.head.appendChild(style);

        const tocTitle = document.createElement('div');
        tocTitle.className = 'toc-title';
        tocTitle.textContent = 'Table of Contents';

        const tocList = document.createElement('ul');
        tocList.className = 'toc-list';

        const headings = document.querySelectorAll('h2, h3');
        
        headings.forEach((heading, index) => {
            const listItem = document.createElement('li');
            listItem.className = 'toc-item';

            const link = document.createElement('a');
            link.className = `toc-link ${heading.tagName.toLowerCase()}`;
            link.textContent = heading.textContent;

            if (!heading.id) {
                heading.id = `heading-${index}`;
            }
            link.href = `#${heading.id}`;

            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                const rect = heading.getBoundingClientRect();
                const absoluteTop = rect.top + window.pageYOffset;
                
                const windowHeight = window.innerHeight;
                const elementHeight = rect.height;
                const centerPosition = absoluteTop - (windowHeight / 2) + (elementHeight / 2);
                
                window.scrollTo({
                    top: centerPosition,
                    behavior: 'smooth'
                });

                document.querySelectorAll('h2, h3').forEach(h => {
                    h.classList.remove('blink-highlight');
                });

                setTimeout(() => {
                    heading.classList.add('blink-highlight');
                    setTimeout(() => {
                        heading.classList.remove('blink-highlight');
                    }, 1000);
                }, 500);
            });

            listItem.appendChild(link);
            tocList.appendChild(listItem);
        });

        tocContainer.appendChild(tocTitle);
        tocContainer.appendChild(tocList);
        document.body.appendChild(tocContainer);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new TableOfContents();
});