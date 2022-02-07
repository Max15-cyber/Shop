'use strict'

const CART = {
    //  добавляем данные в хранилище
    setCartData(obj) {
        localStorage.setItem('CART-01', JSON.stringify(obj));
        return false;
    },
    // Получаем данные из хранилища
    getCartData() {
        return JSON.parse(localStorage.getItem('CART-01'));
    },
    // 
    clearCart(cart){
        localStorage.removeItem('CART-01');
        cart.innerHTML = 'Cart is clear!'
    },
    // 
    deleteCartItem(cart){
        const cartData = CART.getCartData();
        const itemId = event.target.dataset.id;
        delete cartData[itemId]
        CART.setCartData(cartData);
        this.randerCart(cart);
    },

    addEventCloseCart(cart){
        const deleteItem = document.querySelectorAll('.cart__delete');
        deleteItem.forEach((btn) => {
            btn.addEventListener('click', () => CART.deleteCartItem(cart));
        });
    },
    // Добавляем товар в корзину
    addToCart(title, price, event) {
        let target = event.target
        target.disabled = true;
        const cartData = CART.getCartData() || {};
        const itemId = target.dataset.id;
        const parentBox = target.parentElement;
        const itemTitle = parentBox.querySelector(title).textContent;
        const itemPrice = parentBox.querySelector(price).textContent;
        if (!cartData.hasOwnProperty(itemId)) {
            cartData[itemId] = [itemTitle, itemPrice]
        }
        if (!this.setCartData(cartData)) {
            target.disabled = false;
        }
    },

    randerCart(cart) {
        const cartData = CART.getCartData();
        if (cartData !== null) {
            let totalItems = '<table class="cart__table"><thead><tr><th>Title</th><th>Price</th></tr></thead><tbody>'
            for (let item in cartData) {
                totalItems += '<tr>'
                for (let i = 0; i < cartData[item].length; i++) {
                    totalItems += `<td>${cartData[item][i]}</td>`
                }
                totalItems += `<td><button class = 'cart__delete' data-id = ${item}>Delete</button></td></tr>`
            }
            totalItems += '</tbody></table>'
            cart.innerHTML = totalItems;
            CART.addEventCloseCart(cart);
        }
        if(Object.keys(cartData).length === 0){
            cart.innerHTML = 'Cart is clear!'
        }
    },
}
