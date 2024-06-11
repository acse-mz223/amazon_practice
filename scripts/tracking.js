import { calculateCartTotalQuantity } from "../data/cart.js";

//get info from URL
let productInfo = new URL(window.location.href);

//update html
document.querySelector('.js-order-tracking').innerHTML=`
<a class="back-to-orders-link link-primary" href="orders.html">
View all orders
</a>

<div class="delivery-date">
Arriving on ${productInfo.searchParams.get('deliveryTime')}
</div>

<div class="product-info">
${productInfo.searchParams.get('name')}
</div>

<div class="product-info">
Quantity: ${productInfo.searchParams.get('quantity')}
</div>

<img class="product-image" src="${productInfo.searchParams.get('image')}">

<div class="progress-labels-container">
<div class="progress-label">
  Preparing
</div>
<div class="progress-label current-status">
  Shipped
</div>
<div class="progress-label">
  Delivered
</div>
</div>

<div class="progress-bar-container">
<div class="progress-bar"></div>
</div>`;


document.querySelector('.js-cart-quantity').innerHTML = calculateCartTotalQuantity();






