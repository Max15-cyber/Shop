export class HeaderMenu extends HTMLElement{
    // Браузер вызовет этот метод при добавлении элемента в документ
    connectedCallback(){
        this.innerHTML = `
            <header class="header">
                <img src=${this.getAttribute('logo-src')} alt="Logo" class="logo">
                <nav>
                    <ul class="menu">
                    <li><a href=${this.getAttribute('link-home-href')} class="menu__link">Home</a></li>
                    <li><a href=${this.getAttribute('link-phones-href')} class="menu__link">Phones</a></li>
                    <li><a href=${this.getAttribute('link-pc-href')} class="menu__link">PC</a></li>
                    </ul>
                </nav>
                <div class="cart-icon" id="cart-icon">
                    <span class="amount" id="amount"></span>
                </div>
            </header> 
        `
    }
}