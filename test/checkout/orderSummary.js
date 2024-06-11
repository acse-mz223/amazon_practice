import {updateOrderHtml} from '../../scripts/checkout/orderSummary.js'
import {cartLoad, cart} from '../../data/cart.js'
import { loadProductsFromInternet,loadProductsWithFetch } from '../../data/products.js';


describe("test suite: orderSummary", () =>{
    //加载project --使用XML
    // beforeAll((done) =>{ //jasime提供阻塞功能，这里声明done。后面done（）函数被执行，才会执行继续执行，不然一直阻塞
    //     loadProductsFromInternet(done);  
    // });
    // or
    //加载project --使用fetch
    beforeAll((done) =>{ 
        loadProductsWithFetch().then(()=> {
            done();
        });
    });
    //加载cart
    beforeEach(() =>{
        // cart
        //mock  --加载有目前商品的cart
        spyOn(localStorage,'getItem').and.callFake(() =>{
            return JSON.stringify([{
                productId:'82bb68d7-ebc9-476a-989c-c78a40ee5cd9',
                quantity:1,
                deliveryOptionsId:'1'},
                {
                    productId:'901eb2ca-386d-432e-82f0-6fb1ee7bf969',
                    quantity:2,
                    deliveryOptionsId:'1'}]);
        });
        cartLoad(); // 修改getItem后重新加载cart
        // 或者直接 let cart = [];
        //mock  --add后不进行本地保存
        spyOn(localStorage,'setItem').and.callFake(() =>{});
    });
    it("displays the cart", () =>{
        //test
        //看显示是否正确
        document.querySelector('.js-test-container').innerHTML = `<div class='order-summary'></div>`;
        
        updateOrderHtml();
        
        console.log("hello");
        console.log("1"+document.querySelector('.order-summary').innerHTML);
        
        //查产品种类数是否正确
        expect(document.querySelectorAll('.js-cart-item-container').length).toEqual(2);
        //查看每件商品数量是否正确
        cart.forEach((cartItem) =>{
            expect(document.querySelector(`.js-product-quantity-${cartItem.productId}`).innerText).toContain(`Quantity: ${cartItem.quantity}`);
        });

        // 恢复html页面
        document.querySelector('.js-test-container').innerHTML ='';
    });

    it("delete button", () =>{
        //test
        document.querySelector('.js-test-container').innerHTML = `<div class='order-summary'></div><div class='js-payment-summary'></div>`;
 
        updateOrderHtml();

        document.querySelector('.js-delete-82bb68d7-ebc9-476a-989c-c78a40ee5cd9').click();
        expect(cart.length).toEqual(1);
        expect(document.querySelectorAll('.js-cart-item-container').length).toEqual(1);
        expect(document.querySelector('.js-cart-item-container-82bb68d7-ebc9-476a-989c-c78a40ee5cd9')).toEqual(null);
        expect(document.querySelector('.js-cart-item-container-901eb2ca-386d-432e-82f0-6fb1ee7bf969')).not.toEqual(null);
        expect(cart[0].productId).toEqual('901eb2ca-386d-432e-82f0-6fb1ee7bf969');

        // 恢复html页面
        document.querySelector('.js-test-container').innerHTML ='';
    });
});