export let cart;

cartLoad();

export function cartLoad(){
    cart = JSON.parse(localStorage.getItem('jsonCart')) || [];
}

export function cartClear(){
    cart = [];
    saveCart();
}

export function addToCart(productId,quantity){
    let matchingItem = true;
    //判断商品是否已经在cart中
    cart.forEach((cartValue) => {if (cartValue.productId === productId)
    {   //存在
        cartValue.quantity+= quantity;
        matchingItem = false;
    }
    });
    //不存在
    if (matchingItem) {
        cart.push({
            productId,
            quantity,
            deliveryOptionsId:'1'});
    }
    // print
    console.log(cart);
    // save cart
    saveCart();
}

export function deleteProduct(productId){
    //const newCart=[];
    cart.forEach((cartProduct,index) =>{
        // if (cartProduct.productId !== productId){
        //     newCart.push(cartProduct);
        // }
        if (cartProduct.productId === productId){
            cart.splice(index,1);
        }
    });
    //cart=newCart;
    // save cart
    saveCart();
}

export function updateCartQuantity(productId,newQuantity){
    cart.forEach((cartItem) =>{
        if(cartItem.productId === productId)
            cartItem.quantity = newQuantity;
        //console.log(cartItem.quantity);
    });
    saveCart();
}

export function calculateCartTotalQuantity(){
    let productTotalNumber = 0;
    cart.forEach((value) => {productTotalNumber += value.quantity;});
    return productTotalNumber;
}

function saveCart(){
    let jsonCart = JSON.stringify(cart);
    localStorage.setItem("jsonCart", jsonCart);
}

// export function loadCart(){
//     cart = localStorage.getItem("jsonCart");
// }

//更新deliveryOption to cart
export function updateDeliveryOptions(productId,deliveryOptionsId){

    cart.forEach((cartValue) => {if (cartValue.productId === productId)
    {  
        cartValue.deliveryOptionsId = deliveryOptionsId;
    }
    });
    // 保存
    saveCart();

}

// 使用backend获取cart
// export function loadCartsFromInternet(fun){
//   const xhr = new XMLHttpRequest();
//   xhr.addEventListener('load', () =>{
//     carts = JSON.parse(xhr.response);
//     fun();
//   });
//   xhr.open('GET', 'https://supersimplebackend.dev/cart');
//   xhr.send();
// }
