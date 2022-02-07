'use strict'
const cart = document.getElementById('cart');
const modal = document.getElementById('modal');
const cartClear = document.getElementById('cart-clear');
const cartContent = document.getElementById('cart-content');
const cartClose = document.getElementById('cart-close');
const itemBox = document.querySelectorAll('.products__item');
const cartIcon = document.getElementById('cart-icon');
itemBox.forEach(element => {
    element.querySelector('.products__btn').addEventListener('click', CART.addToCart.bind(CART, '.products__title', '.products__price'));
});
function closeCart(){
    modal.style.display = 'none'
    document.body.style.overflow = "auto"
}
cartClose.addEventListener('click', closeCart);
cartClear.addEventListener('click', CART.clearCart.bind(CART, cartContent));

cartIcon.addEventListener('click', (event) => {
    CART.randerCart(cartContent, event);
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
});