class GoedemiddagNav extends HTMLElement {
    connectedCallback() {
        setTimeout(() => {
            let originalMenu = this.querySelector('menu');
            if(originalMenu) {


                let mobileMenu = originalMenu.cloneNode(true);
                let desktopMenu = originalMenu.cloneNode(true);

                let mobileNav = this.__createDialogMenu('mobile-menu', mobileMenu);
                let desktopNav = this.__createNav('desktop-menu', desktopMenu);

                this.innerHTML ='';
                this.append(desktopNav, mobileNav);
            }
        }, 0);
    }

    __createNav(key, menu) {
        let nav = document.createElement('nav');
        nav.id = key;
        nav.append(menu);

        return nav;
    }

    __createDialogMenu(key, menu) {
        let aside = document.createElement('aside');
        aside.setAttribute('nav-for', key);

        let dialog = document.createElement('dialog');
        dialog.setAttribute('closedby', 'any');
        dialog.appendChild(this.__createNav(key, menu));

        let dialogButton = document.createElement('button');
        dialogButton.textContent = 'Open Menu';
        dialogButton.addEventListener('click', () => {
            if (dialog) {
                dialog.showModal();
            }
        });

        aside.appendChild(dialogButton);
        aside.appendChild(dialog);
        return aside;
    }
}
customElements.define('goedemiddag-menu', GoedemiddagNav);
