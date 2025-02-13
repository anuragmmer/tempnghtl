const styles = {
    dropdown: `
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 1000;
        opacity: 0;
        transition: opacity 0.3s ease;
    `,
    backdrop: `
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0);

        cursor: pointer;
    `,
    content: `
        position: absolute;
        top: 100px;
        right: 40px;
        width: 220px;
        background: rgba(255, 255, 255, 0.01);
        backdrop-filter: blur(4px);
        border-radius: 12px;
        border: 1px solid rgba(255, 255, 255, 0.1);
        overflow: hidden;
        z-index: 1001;
        transform: translateY(-10px);
        transition: transform 0.3s ease;
    `,
    contactItem: `
        padding: 20px;
    `,
    contactItemWithBorder: `
        padding: 20px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    `,
    name: `
        color: #ffffff;
        font-family: Mulish, serif;
        font-size: 16px;
        margin-bottom: 8px;
        font-family: 'Manrope', sans-serif;
    `,
    email: `
        color:rgb(255, 0, 0);
        font-family: Funnel Display, serif;
        font-size: 14px;
        margin-bottom: 12px;
    `,
    socialLinks: `
        display: flex;
        Font-family: Mulish, serif;
        font-size: 12px;
        gap: 12px;
    `,
    socialLink: `
        color: #a3a3a3;
        text-decoration: none;
        transition: opacity 0.3s ease;
    `
};

const contactDropdown = {
    isOpen: false,
    
    init() {
        this.createDropdownHTML();
        
        const contactLink = document.querySelector('a[href="/contact"]');
        contactLink.href = '#';
        contactLink.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.toggleDropdown();
        });

        const backdrop = document.querySelector('.dropdown-backdrop');
        backdrop.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.closeDropdown();
        });

        const dropdownContent = document.querySelector('.dropdown-content');
        dropdownContent.addEventListener('click', (e) => {
            e.stopPropagation();
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.closeDropdown();
            }
        });
    },

    createDropdownHTML() {
        const dropdownHTML = `
            <div class="contact-dropdown" style="${styles.dropdown}">
                <div class="dropdown-backdrop" style="${styles.backdrop}"></div>
                <div class="dropdown-content" style="${styles.content}">
                    <div class="contact-item" style="${styles.contactItemWithBorder}">
                        <h3 style="${styles.name}">Anurag Kumar</h3>
                        <div style="${styles.email}">anurag@noughtlab.com</div>
                        <div class="social-links" style="${styles.socialLinks}">
                            <a href="https://twitter.com/anuragkr_" target="_blank" style="${styles.socialLink}">Twitter</a>
                            <a href="https://github.com/anuragkr" target="_blank" style="${styles.socialLink}">GitHub</a>
                        </div>
                    </div>
                    <div class="contact-item" style="${styles.contactItem}">
                        <h3 style="${styles.name}">Kumar Aadarsh</h3>
                        <div style="${styles.email}">aadarsh@noughtlab.com</div>
                        <div class="social-links" style="${styles.socialLinks}">
                            <a href="https://twitter.com/k_aadarsh" target="_blank" style="${styles.socialLink}">Twitter</a>
                            <a href="https://github.com/kumaraadarsh" target="_blank" style="${styles.socialLink}">GitHub</a>
                        </div>
                    </div>
                </div>
            </div>
        `;

        const dropdownContainer = document.createElement('div');
        dropdownContainer.innerHTML = dropdownHTML;
        document.body.appendChild(dropdownContainer.firstElementChild);

        const socialLinks = document.querySelectorAll('.social-links a');
        socialLinks.forEach(link => {
            link.addEventListener('mouseenter', () => {
                link.style.opacity = '0.6';
            });
            link.addEventListener('mouseleave', () => {
                link.style.opacity = '1';
            });
        });
    },

    toggleDropdown() {
        const dropdown = document.querySelector('.contact-dropdown');
        const content = dropdown.querySelector('.dropdown-content');
        
        if (!this.isOpen) {
            dropdown.style.display = 'block';
            dropdown.offsetHeight; // Trigger reflow
            dropdown.style.opacity = '1';
            content.style.transform = 'translateY(0)';
            this.isOpen = true;
        } else {
            this.closeDropdown();
        }
    },

    closeDropdown() {
        const dropdown = document.querySelector('.contact-dropdown');
        const content = dropdown.querySelector('.dropdown-content');
        
        dropdown.style.opacity = '0';
        content.style.transform = 'translateY(-10px)';
        
        setTimeout(() => {
            dropdown.style.display = 'none';
        }, 300);
        this.isOpen = false;
    }
};

document.addEventListener('DOMContentLoaded', () => {
    contactDropdown.init();
});
