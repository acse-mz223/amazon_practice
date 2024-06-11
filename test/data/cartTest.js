import {addToCart, cart, cartLoad} from '../../data/cart.js'

describe("test suite: addToCart", () =>{
    it("add a prodcut already in the cart",() =>{
        //mock  --加载有目前商品的cart
        spyOn(localStorage,'getItem').and.callFake(() =>{
            return JSON.stringify([{
                productId:'82bb68d7-ebc9-476a-989c-c78a40ee5cd9',
                quantity:1,
                deliveryOptionsId:'1'}]);
        });
        cartLoad(); // 修改getItem后重新加载cart
        // 或者直接 let cart = [];

        //mock  --add后不进行本地保存
        spyOn(localStorage,'setItem').and.callFake(() =>{});
        
        //test
        addToCart('82bb68d7-ebc9-476a-989c-c78a40ee5cd9');
        cart.forEach((cartItem) =>{
            if (cartItem.productId === '82bb68d7-ebc9-476a-989c-c78a40ee5cd9')
                expect(cartItem.quantity).toEqual(2);
        });
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);

    });

    it("add a new prodcut into the cart",() =>{
        //mock  --加载空cart
        spyOn(localStorage,'getItem').and.callFake(() =>{
            return JSON.stringify([]);
        });
        cartLoad(); // 修改getItem后重新加载cart
        // 或者直接 let cart = [];

        //mock  --add后不进行本地保存
        spyOn(localStorage,'setItem').and.callFake(() =>{});
        
        //test
        addToCart('82bb68d7-ebc9-476a-989c-c78a40ee5cd9');
        cart.forEach((cartItem) =>{
            if (cartItem.productId === '82bb68d7-ebc9-476a-989c-c78a40ee5cd9')
                expect(cartItem.quantity).toEqual(1);
        });
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    });
});