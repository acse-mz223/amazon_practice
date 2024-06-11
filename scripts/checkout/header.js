import { calculateCartTotalQuantity } from "../../data/cart.js";

export function updateHearderHtml(){
    document.querySelector('.js-return-to-home-link').innerHTML = calculateCartTotalQuantity() + ' items';
}