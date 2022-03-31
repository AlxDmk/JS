'use strict';

const itemsFeatured = document.querySelectorAll('.featuredItem');
const products = {};

// Формирую массив из товаров. По идее этот массив должен приходить на страницу извне (из БД и т.п.)
// В верстке к кнопке привязал data аттрибуты: sku, name, price

document.addEventListener('DOMContentLoaded', () => {
    itemsFeatured.forEach(item => {
        const infoSource = item.querySelector('button');
        const id = infoSource.dataset.sku;
        const product = {
            'id': id,
            'name': infoSource.dataset.name,
            'price': Number(infoSource.dataset.price),
        }
        products[id] = product;
    });
});

// Реализация изменения числа в мини-корзине при клике на кнопку "add to cart"
// Дополнительно для span в верстке дал класс "countOfItemsInCart"

const countSpan = document.querySelector('.countOfItemsInCart');
let countOfItems = Number(countSpan.innerHTML);

itemsFeatured.forEach(item => {
    item.addEventListener('click', (event) => {

        if (event.target.tagName.toLowerCase() === 'button') {
            countOfItems = countOfItems + 1;
            countSpan.innerHTML = String(countOfItems);

            addToCart(event.target.dataset.sku);
        };
    });
});


//Всплывающая корзина при наведении на иконку "корзинка"

const cartIcon = document.querySelector('.cartIconWrap');
const openedCart = document.querySelector('.basket');
cartIcon.addEventListener('mouseover', () => openedCart.classList.remove('hidden'));
cartIcon.addEventListener('mouseout', () => openedCart.classList.add('hidden'));


const cartPosition = document.querySelector('.basketHeader');
const totalArea = document.querySelector('.basketTotalValue');

const myCart = {};

//Добавление товара в корзину. Проект реализовал так, что в массив корзины попадает только SKU товара и количество.
// А при прорисовке корзины данные "Наименование" и "Цена" подтягиваются из массива товаров.
function addToCart(product_sku) {
    myCart[product_sku] ? myCart[product_sku]['count']++ : myCart[product_sku] = {'count': 1};
    printCart(myCart);
}

//Очистка корзины перед ее обновлением
function emptyCart() {
    const cartContentArea = document.querySelectorAll('.basketRow.cartContent')
    cartContentArea.forEach(el => el.remove());
    totalArea.textContent = '0';
}

//Вывод на экран корзины.
function printCart(array) {
    emptyCart();
    let total = 0;
    for (const item in array) {
        cartPosition.insertAdjacentHTML('afterend',
            `<div class="basketRow cartContent">
                        <div>${products[item].name}</div>
                        <div>${array[item].count}</div>
                        <div>${products[item].price}</div>
                        <div>${array[item].count * products[item].price}</div>
                </div>`);

        total = total + array[item].count * products[item].price;
        console.log(total);
    };
    // Вывод ИТОГО в конце корзины
    totalArea.textContent = `${total}`;
}