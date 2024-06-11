class Cart{
    // 初始化参数
    constructor(localStorageKey){
        this.#localStorageKey = localStorageKey;
        this.cartLoad();
    }

    // 参数设置
    cartItems = undefined;
    try= undefined;
    #localStorageKey = undefined;

    //函数设置
    cartLoad(){
        this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey)) || [];
    };
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
    };
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
    };
    
    saveCart(){
        let jsonCart = JSON.stringify(this.cartItems);
        localStorage.setItem(this.#localStorageKey, jsonCart);
    };
    
    
    //更新deliveryOption to cart
    updateDeliveryOptions(productId,deliveryOptionsId){
    
        this.cartItems.forEach((cartValue) => {if (cartValue.productId === productId)
        {  
            cartValue.deliveryOptionsId = deliveryOptionsId;
        }
        });
        // 保存
        this.saveCart();
    };
};

let cart = new Cart(localStorageKey);




