import {cart, addToCart, calculateCartTotalQuantity} from '../data/cart.js'
import {products,loadProductsFromInternet, searchProduct} from '../data/products.js'




loadProductsFromInternet(loadAmazonHtml);

//两种方法均可
// new Promise ((resolve) =>{
//   loadProductsFromInternet(()=>{
//     resolve();
//   });
// }).then(()=>{loadAmazonHtml()});

function loadAmazonHtml(products){
  let productsHtml='';
  products.forEach((value,index) => {
      const html = `<div class="product-container">
      <div class="product-image-container">
        <img class="product-image"
          src=${value.image}>
      </div>

      <div class="product-name limit-text-to-2-lines">
        ${value.name}
      </div>

      <div class="product-rating-container">
        <img class="product-rating-stars"
          src="images/ratings/rating-${value.getStar()}.png">
        <div class="product-rating-count link-primary">
          ${value.rating.count}
        </div>
      </div>

      <div class="product-price">
        $${value.getPrice()}
      </div>

      <div class="product-quantity-container ">
        <select class='js-product-quantity-selector-${value.id}'>
          <option selected value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>

      ${value.getSizeChartHtml()}

      <div class="product-spacer"></div>

      <div class="added-to-cart">
        <img src="images/icons/checkmark.png">
        Added
      </div>

      <button class="add-to-cart-button button-primary js-add-to-cart-button"
      data-product-id='${value.id}' >
        Add to Cart
      </button>
    </div>`;
    productsHtml +=html;

    
  });
  // update cart number
  updateCartNumber();

  // load products html
  const productGrid = document.querySelector('.js-products-grid');
  productGrid.innerHTML = productsHtml;

  // set add-to-cart button
  const addToCartButton = document.querySelectorAll('.js-add-to-cart-button');
  addToCartButton.forEach((value, index) => {value.addEventListener('click', () => {
      // get number
      let quantity = document.querySelector(`.js-product-quantity-selector-${value.dataset.productId}`).value;
      // add product
      addToCart(value.dataset.productId, Number(quantity));
      updateCartNumber();
    });
  });

  // search button
  document.querySelector('.js-search-button').addEventListener('click', ()=>{
    //get string
    let searchString = document.querySelector('.js-search-bar').value;
    let productsMatching = searchProduct(searchString);
    loadAmazonHtml(productsMatching);
  });
}


// cart number
export function updateCartNumber(){
    // cart number update
    document.querySelector('.js-cart-quantity').innerHTML = calculateCartTotalQuantity();
}








