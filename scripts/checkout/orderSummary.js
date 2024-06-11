import {cart, deleteProduct, updateDeliveryOptions, updateCartQuantity, calculateCartTotalQuantity} from '../../data/cart.js'
import {products} from '../../data/products.js'
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js'
import { deliveryOptions } from '../../data/deliveryOptions.js';
import {updatePayHtml} from  "./paySummary.js";
import { updateHearderHtml } from './header.js';

//html
export function updateOrderHtml(){
    let checkoutHtml = '';
    let cartProduct;
    cart.forEach((cartItem) => {
        //得到产品信息
        products.forEach((product) => {
            if (product.id === cartItem.productId) 
                cartProduct = product;    
        });
        // 计算送达日期
        let deliveryDay = '';
        deliveryOptions.forEach((day) =>{
            if (day.id === cartItem.deliveryOptionsId)
                deliveryDay = dayjs().add(day.deliveryDays,'days').format('dddd, MMMM D');
        });
        //构建html
        let html = `<div class="cart-item-container js-cart-item-container js-cart-item-container-${cartProduct.id}">
        <div class="delivery-date">
        Delivery date: ${deliveryDay}
        </div>

        <div class="cart-item-details-grid">
        <img class="product-image"
            src=${cartProduct.image}>

        <div class="cart-item-details">
            <div class="product-name">
            ${cartProduct.name}
            </div>
            <div class="product-price">
            $${cartProduct.getPrice()}
            </div>
            <div class="product-quantity js-product-quantity-${cartProduct.id}">
            <span>
                Quantity: <input value='${cartItem.quantity}' class='quantity-input js-quantity-input-${cartItem.productId}'>
            </span>
            <span class="update-quantity-link link-primary js-update-quantity-link" data-product-id='${cartItem.productId}'>
                Update
            </span>
            <span class="delete-quantity-link link-primary js-delete js-delete-${cartItem.productId}" data-product-id='${cartItem.productId}'>
                Delete
            </span>
            </div>
        </div>

        <div class="delivery-options">
            <div class="delivery-options-title">
            Choose a delivery option:
            </div>
        ${deliveryOptionsHtml(cartItem.productId,cartItem.deliveryOptionsId)}
        </div>
        </div>
    </div>`;
        checkoutHtml += html;
        document.querySelector('.order-summary').innerHTML = checkoutHtml;
    });

    // update item number
    //document.querySelector('.js-return-to-home-link').innerHTML = calculateCartTotalQuantity() + ' items';


    //delete event
    document.querySelectorAll('.js-delete').forEach((button) =>{
        button.addEventListener("click", () =>{
            deleteProduct(button.dataset.productId);
            //console.log(cart);
            document.querySelector(`.js-cart-item-container-${button.dataset.productId}`).remove();
            updatePayHtml();
            updateHearderHtml();
        });   
    });

    // deliveryOption event
    document.querySelectorAll('.js-delivery-option').forEach((option) =>{
        option.addEventListener('click', () =>{
            updateDeliveryOptions(option.dataset.productId, option.dataset.deliveryOptionId);
            updateOrderHtml();
            updatePayHtml();
        });
    });

    //update event 
    document.querySelectorAll('.update-quantity-link').forEach((button) =>{
        button.addEventListener('click',()=>{
            // 得到input box
            let newQuantity = document.querySelector(`.js-quantity-input-${button.dataset.productId}`).value;
            // 更新到cart
            updateCartQuantity(button.dataset.productId,Number(newQuantity));
            updateOrderHtml();
            updatePayHtml();
            updateHearderHtml();
        });
    });

}

// calculate delivert data
function deliveryOptionsHtml(productId,deliveryOptionsId){
    let deliveryOptionsHtmlAll ='';
    let today = dayjs();
    deliveryOptions.forEach((day) =>{
        deliveryOptionsHtmlAll +=
        `<div class="delivery-option js-delivery-option" data-product-id = '${productId}' data-delivery-option-id = '${day.id}'>
            <input type="radio"
                class="delivery-option-input"
                name="delivery-option-${productId}"
                ${(deliveryOptionsId === day.id)? 'checked': ''}>
            <div>
                <div class="delivery-option-date">
                ${today.add(day.deliveryDays,'days').format('dddd, MMMM D')}
                </div>
                <div class="delivery-option-price">
                $${(day.priceCents /100).toFixed(2) || 'FREE'} - Shipping
                </div>
            </div>
            </div>`;

    });
    return deliveryOptionsHtmlAll;
}
