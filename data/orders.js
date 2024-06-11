import { products } from "./products.js";
import { formatDate } from "../scripts/utensil.js";



export let orders= JSON.parse(localStorage.getItem('orders')) || [];


function saveOrders(){
    localStorage.setItem('orders',JSON.stringify(orders));
}

export function addOrders(order){
    orders.unshift(order);
    saveOrders();
    console.log(orders);
}

export function orderDetailsHtml(order){
    let html=``;
    
    order.products.forEach((orderProduct) =>{
        // match product
        let matchingProduct;
        products.forEach((product) =>{
            if (product.id === orderProduct.productId)
                matchingProduct = product;
        });
        html +=`
        <div class="product-image-container">
          <img src=${matchingProduct.image}>
        </div>

        <div class="product-details">
          <div class="product-name">
            ${matchingProduct.name}
          </div>
          <div class="product-delivery-date">
            Arriving on: ${formatDate(orderProduct.estimatedDeliveryTime)}
          </div>
          <div class="product-quantity">
            Quantity: ${orderProduct.quantity}
          </div>
          <button class="buy-again-button button-primary js-buy-again-button" data-product-id='${matchingProduct.id}' data-product-quantity='${orderProduct.quantity}'>
            <img class="buy-again-icon" src="images/icons/buy-again.png">
            <span class="buy-again-message">Buy it again</span>
          </button>
        </div>

        <div class="product-actions">
          <a href="tracking.html?deliveryTime=${formatDate(orderProduct.estimatedDeliveryTime)}&name=${matchingProduct.name}&quantity= ${orderProduct.quantity}&image=${matchingProduct.image}">
            <button class="track-package-button button-secondary">
              Track package
            </button>
          </a>
        </div>
        `;
    });

  
    return html;
}


