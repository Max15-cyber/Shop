'use strict'

import { addToCart, clearCart, createItemPage, itemCount, randerCart, ShopCart, showProductCart } from "./cart.js";
import { HeaderMenu } from "./HeaderMenu.js";
// Регистрируем веб-компонент
customElements.define('header-menu', HeaderMenu);
customElements.define('shop-cart', ShopCart);
const modal = document.getElementById('modal');
const cartClear = document.getElementById('cart-clear');
const cartContent = document.getElementById('cart-content');
const cartClose = document.getElementById('cart-close');
const addCart = document.querySelectorAll('.products__btn');
const cartIcon = document.getElementById('cart-icon');
const amount = document.getElementById('amount');
const productItem = document.querySelectorAll('.products__item');
const itemPage = document.querySelector('.item-page')
addCart.forEach((btn) => {
    btn.addEventListener('click', (e) => addToCart(e, '.products__title', '.products__price', amount, addCart));
})
function closeCart(){
    modal.style.display = 'none'
    if(itemPage == undefined){
        document.body.style.overflow = "auto"
    }
}
cartClose.addEventListener('click', closeCart);
cartClear.addEventListener('click', () => clearCart(cartContent, amount, addCart));


productItem.forEach((btn) =>{
    btn.addEventListener('click', createItemPage);
})
itemCount(amount);

cartIcon.addEventListener('click', () => {
    randerCart(cartContent, amount, addCart);
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
});
showProductCart(addCart);