function Cart(localStorageKey){
    const cart={
        cartItems: undefined,
        cartLoad(){
            this.cartItems = JSON.parse(localStorage.getItem(localStorageKey)) || [];
        },
        addToCar(productId){
            let matchingItem = true;
            //判断商品是否已经在cart中
            this.cartItems.forEach((cartValue) => {if (cartValue.productId === productId)
            {   //存在
                cartValue.quantity++;
                matchingItem = false;
            }
            });
            //不存在
            if (matchingItem) {
                this.cartItems.push({
                    productId,
                    quantity:1,
                    deliveryOptionsId:'1'});
            }
            // print
            console.log(this.cartItems);
            // save cart
            this.saveCart();
        },
        deleteProduct(productId){
            //const newCart=[];
            this.cartItems.forEach((cartProduct,index) =>{
                // if (cartProduct.productId !== productId){
                //     newCart.push(cartProduct);
                // }
                if (cartProduct.productId === productId){
                    this.cartItems.splice(index,1);
                }
            });
            //cart=newCart;
            // save cart
            this.saveCart();
        },
        
        saveCart(){
            let jsonCart = JSON.stringify(this.cartItems);
            localStorage.setItem(localStorageKey, jsonCart);
        },
        
        
        //更新deliveryOption to cart
        updateDeliveryOptions(productId,deliveryOptionsId){
        
            this.cartItems.forEach((cartValue) => {if (cartValue.productId === productId)
            {  
                cartValue.deliveryOptionsId = deliveryOptionsId;
            }
            });
            // 保存
            this.saveCart();
        }

    };
    return cart;
};


let cart = Cart('jsonCart-oop');
cart.cartLoad();



