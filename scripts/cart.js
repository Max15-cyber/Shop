'use strict'

//  добавляем данные в хранилище
function setCartData(obj) {
    localStorage.setItem('CART-01', JSON.stringify(obj));
    return false;
}
// Получаем данные из хранилища
function getCartData() {
    return JSON.parse(localStorage.getItem('CART-01'));
}
// 
export function clearCart(cart, elem, addCart) {
    localStorage.removeItem('CART-01');
    cart.innerHTML = 'Cart is clear!'
    itemCount(elem)
    showProductCart(addCart)
}
// 
function deleteCartItem(cart, elem, addCart) {
    const cartData = getCartData();
    const itemId = event.target.dataset.id;
    delete cartData[itemId]
    setCartData(cartData);
    randerCart(cart, elem, addCart);
    itemCount(elem);
    showProductCart(addCart);
}

function addEventCloseCart(cart, elem, addCart) {
    const deleteItem = document.querySelectorAll('.cart__delete');
    deleteItem.forEach((btn) => {
        btn.addEventListener('click', () => deleteCartItem(cart, elem, addCart));
    });
    
}

// Добавляем товар в корзину
export function addToCart(e, title, price, elem, addCart) {
    let target = e.target;
    target.disabled = true;
    const cartData = getCartData() || {};
    const itemId = target.dataset.id;
    const parentBox = target.parentElement;
    const itemTitle = parentBox.querySelector(title).textContent;
    const itemPrice = parentBox.querySelector(price).textContent;
    const itemImg = parentBox.querySelector('img').src;
    if (!cartData.hasOwnProperty(itemId)) {
        cartData[itemId] = [itemTitle, itemPrice, itemImg]
    }
    if (!setCartData(cartData)) {
        target.disabled = false;
    }
    itemCount(elem);
    showProductCart(addCart)
    let alertProduct = document.createElement('div');
    alertProduct.className = 'alert-product';
    alertProduct.innerHTML = `<p><span>${itemTitle}</span> added to cart</p>`
    document.body.append(alertProduct);
    setTimeout(() => alertProduct.remove(), 3000);
}

export function randerCart(cart, elem, addCart) {
    const cartData = getCartData();
    let totalItems, totalSum = 0;
    if (!cartData || Object.keys(cartData).length === 0) {
        totalItems = 'Cart is clear!'
    } else {
        totalItems = '<table class="cart__table"><thead><tr><th>Title</th><th>Price</th></tr></thead><tbody>'
        for (let item in cartData) {
            totalItems += '<tr>'
            totalSum += +cartData[item][1]
            for (let i = 0; i < cartData[item].length; i++) {

                if (i == 2) {
                    totalItems += `<td style = 'background-image: url(${cartData[item][i]});' class='cart__img'></td>`;
                } else {
                    totalItems += `<td>${cartData[item][i]}</td>`;
                }
            }
            totalItems += `<td><button class = 'cart__delete' data-id = ${item}>Delete</button></td></tr>`
        }
        totalItems += '</tbody></table>';
        totalItems += `<p>Total price: ${totalSum}</p>`;
    }
    cart.innerHTML = totalItems;
    addEventCloseCart(cart, elem, addCart);
}
// Amount of products in the cart
export function itemCount(elem) {
    const cartData = getCartData();
    elem.textContent = cartData ? Object.keys(cartData).length : 0;
}

/* export function showProductCart(addCart) {
    const cartData = getCartData();
    addCart.forEach((btn) => {
        btn.textContent = (cartData && Object.keys(cartData).length !== 0 && cartData.hasOwnProperty(btn.dataset.id)) ? "Added to cart" : "Add to cart";
    })
} */
export function showProductCart(addCart) {
    const cartData = getCartData();
    addCart.forEach((btn) => {
        if (cartData && Object.keys(cartData).length !== 0 && cartData.hasOwnProperty(btn.dataset.id)) {
            btn.textContent = "Added to cart";
            btn.className = 'btn';
        } else {
            btn.textContent = "Add to cart";
            btn.className = 'products__btn';
        }

    })
}


export class ShopCart extends HTMLElement{
    connectedCallback(){
        this.innerHTML = `
            <div class="modal" id="modal">
                <div class="cart" id="cart">
                    <div id="cart-content" class="cart__content"></div>
                    <span id="cart-close" class="cart__close">&#10008;</span>
                    <button class="cart__clear" id="cart-clear">Clear cart</button>
                </div>
            </div>
        `
    }
}

export function createItemPage(e){
    if(e.target.tagName == 'BUTTON') return;
    let itemPage = document.createElement('div');
    itemPage.className = 'item-page'
    itemPage.style.height = document.documentElement.clientHeight - 77 + "px";
    itemPage.innerHTML = `
    <h1 class="item-title">${this.querySelector('.products__title').textContent}</h1>
    <div class="item-page__img" style="background-image: url(${this.querySelector('img').src});"></div>
    <p>
    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ut mollitia sequi, labore, dicta perspiciatis, atque praesentium accusamus animi officia voluptatibus dolorum! Reiciendis vero repellendus inventore velit consectetur! Nemo impedit saepe officia quam eius laborum harum rem nam corrupti! Molestiae fuga quae dolorem sit quaerat, cum, suscipit veniam unde at architecto ipsa aliquam non possimus nobis minima quidem quas odio a perspiciatis nisi consequuntur. Adipisci dolorum consectetur aliquid, repudiandae corrupti numquam. Quis, amet. Praesentium quibusdam sunt ratione dignissimos, ex maxime veritatis! Maxime esse libero distinctio ad nobis repudiandae recusandae architecto, omnis nemo velit eos facere molestias soluta nisi iure! Nobis non odio amet a eligendi, id sunt quia sint facere ad pariatur nam fugit at alias perferendis recusandae fuga deleniti maxime delectus voluptatum repellat saepe doloremque neque? Veritatis consequuntur aspernatur reiciendis esse ratione necessitatibus animi, a eius error, officia voluptas adipisci non dicta expedita itaque quas pariatur? Facilis tenetur saepe, dolorem debitis id distinctio culpa enim magni, magnam explicabo obcaecati sed vitae ab laboriosam incidunt quia optio nihil. Harum ut reprehenderit quo voluptates consequuntur animi doloribus rerum consequatur debitis esse praesentium unde sed reiciendis eius eaque provident laudantium numquam, quam at repellat tempore incidunt. Quos impedit molestiae architecto illo esse quam porro sed fuga quisquam eligendi hic blanditiis nam unde non reiciendis, voluptas similique illum molestias ducimus, modi voluptates perferendis eius nobis ipsum. Eligendi aspernatur a dolores quibusdam quisquam sunt, unde culpa, perspiciatis aperiam, alias dignissimos ea blanditiis? Ipsam aspernatur quisquam asperiores repellat ducimus aperiam cupiditate voluptates provident esse corrupti nobis id illum mollitia obcaecati nisi fugit sit, facilis inventore, natus, est commodi laboriosam neque doloremque molestias. Ex impedit ipsum nam delectus suscipit hic, quae eaque dolores eos voluptatem voluptatum alias aliquid, eum voluptates esse obcaecati facere facilis dicta. Et harum hic quidem, sit repellendus sint! Nulla voluptatum pariatur dolorem corrupti illo nihil veniam expedita esse in quasi. Blanditiis odio dolorem perferendis, quasi quis dolorum veritatis facere doloribus vero, voluptas voluptatibus sed architecto aspernatur sit ratione delectus neque corporis itaque! Laborum quo blanditiis expedita officia ab! Sint vel tempora soluta molestias adipisci cupiditate quos a ab, fugit nesciunt voluptatibus molestiae, dolor perferendis labore iure odio totam necessitatibus dolore exercitationem pariatur nobis fuga! Numquam soluta eius, delectus deserunt perferendis, voluptas unde explicabo quisquam optio, illo adipisci facere. Harum, commodi veniam molestiae impedit dolores sit mollitia reiciendis a numquam necessitatibus ducimus. Eius itaque placeat sit aspernatur illo consequuntur unde. Id fugit ab commodi dolorum inventore vero atque cupiditate optio quibusdam cumque distinctio blanditiis, deleniti adipisci dignissimos ad tenetur. Saepe, blanditiis! Ipsam, corrupti repudiandae. Vitae labore expedita hic laboriosam dolores laborum odit ipsam necessitatibus ex quaerat quis veritatis, molestiae itaque et facilis magnam corrupti. Porro mollitia officia accusamus eveniet ducimus. Harum neque nemo beatae expedita corporis, qui nobis. Ab quia voluptatum laborum voluptatem soluta blanditiis asperiores necessitatibus quaerat dolor eligendi eius, repudiandae exercitationem, autem officia veritatis qui provident non aspernatur! Voluptatem minima cupiditate voluptates id ratione numquam deleniti libero modi nostrum ex! Temporibus sapiente nulla quisquam ea quod facere a eius quos expedita praesentium!
    </p>
    <span class = "item-page__close" id="close-page">Return &#8634</span>
    `
    document.body.append(itemPage);
    document.body.style.overflow = "hidden"
    document.getElementById("close-page").addEventListener('click', () => itemPage.remove());
    document.querySelector('.item-page__img').addEventListener('mousemove', (e) => {
        e.target.style.backgroundPositionX = `${-e.offsetX + 80}px`;
        /* e.target.style.backgroundPositionY = `${-e.offsetY + 80}px`; */

        e.target.style.backgroundPositionY = 'center';
    })
}
