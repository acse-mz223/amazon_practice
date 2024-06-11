import { orders, orderDetailsHtml } from "../data/orders.js";
import { loadProductsWithFetch } from '../data/products.js';
import { calculateCartTotalQuantity, cart } from "../data/cart.js";
import { formatDate } from "./utensil.js";
import { addToCart } from "../data/cart.js";


// order display
function ordersDisplayHtml(){
    let html=``;
    orders.forEach((order) =>{
        html += `
        <div class="order-container">
        <div class="order-header">
          <div class="order-header-left-section">
            <div class="order-date">
              <div class="order-header-label">Order Placed:</div>
              <div>${formatDate(order.orderTime)}</div>
            </div>
            <div class="order-total">
              <div class="order-header-label">Total:</div>
              <div>$${(order.totalCostCents/100).toFixed(2)}</div>
            </div>
          </div>

          <div class="order-header-right-section">
            <div class="order-header-label">Order ID:</div>
            <div>${order.id}</div>
          </div>
        </div>

        <div class="order-details-grid js-order-details-grid">
          ${orderDetailsHtml(order)}
        </div>
      </div>`;

      document.querySelector('.js-orders-grid').innerHTML= html;  

      // cart number
      document.querySelector('.js-cart-quantity').innerHTML = calculateCartTotalQuantity();

      // buy again button
      document.querySelectorAll('.js-buy-again-button').forEach((button)=>{
        button.addEventListener('click',()=>{
          addToCart(button.dataset.productId,Number(button.dataset.productQuantity));
          // update header total cart quantity
          document.querySelector('.js-cart-quantity').innerHTML =calculateCartTotalQuantity();
        });
      });
    });
}

loadProductsWithFetch().then(() =>{
    ordersDisplayHtml();
    console.log(orders);
});
