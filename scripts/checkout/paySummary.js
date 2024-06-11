import {cart, cartClear} from '../../data/cart.js'
import {products} from '../../data/products.js'
import { deliveryOptions } from '../../data/deliveryOptions.js';
import { orders, addOrders } from '../../data/orders.js';

export function updatePayHtml(){ 
    //得到数量和总数
    let Cost=0, totalNumber=0, deliveryPrice=0;
    cart.forEach((cartItem) =>{
        //得到物品价钱
        let productPrice;
        products.forEach((productItem) =>{
            if (productItem.id === cartItem.productId)
                productPrice = productItem.priceCents;
        });
        //得到运送费
        let deliveryCost=0;
        deliveryOptions.forEach((deliveryOption) =>{
            if (deliveryOption.id === cartItem.deliveryOptionsId)
                deliveryCost = deliveryOption.priceCents;
        });
        //计算
        Cost += cartItem.quantity * productPrice;
        deliveryPrice += deliveryCost;
        totalNumber += cartItem.quantity;

    });

    //HTML
    document.querySelector('.js-payment-summary').innerHTML =
    `<div class="payment-summary js-payment-summary">
    <div class="payment-summary-title">
      Order Summary
    </div>

    <div class="payment-summary-row">
      <div>Items (${totalNumber}):</div>
      <div class="payment-summary-money">$${(Cost/100).toFixed(2)}</div>
    </div>

    <div class="payment-summary-row">
      <div>Shipping &amp; handling:</div>
      <div class="payment-summary-money">$${(deliveryPrice/100).toFixed(2)}</div>
    </div>

    <div class="payment-summary-row subtotal-row">
      <div>Total before tax:</div>
      <div class="payment-summary-money">$${((deliveryPrice + Cost)/100).toFixed(2)}</div>
    </div>

    <div class="payment-summary-row">
      <div>Estimated tax (10%):</div>
      <div class="payment-summary-money">$${((deliveryPrice + Cost)/1000).toFixed(2)}</div>
    </div>

    <div class="payment-summary-row total-row">
      <div>Order total:</div>
      <div class="payment-summary-money">$${((deliveryPrice + Cost)*11/1000).toFixed(2)}</div>
    </div>

    
      <button class="place-order-button button-primary js-place-order-button-primary">
      Place your order
      </button>
    
  </div>`

  document.querySelector('.js-place-order-button-primary')
    .addEventListener('click', async () =>{
      if (cart.length === 0){
        //console.log("empty");
        alert('Your order is empty');
      }
      else{
        // 通信 -- send order
        let response = await fetch('https://supersimplebackend.dev/orders', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({cart})
        });
        // response
        const order =  await response.json();
        addOrders(order);
        console.log(orders);
        // clean cart
        cartClear();

        // change to orders page
        window.location.href= 'orders.html';
      }
    });
}

