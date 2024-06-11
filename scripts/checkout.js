import { updateOrderHtml } from "./checkout/orderSummary.js";
import {updatePayHtml} from  "./checkout/paySummary.js";
import '../data/backend-practice.js';
import { loadProductsFromInternet,loadProductsWithFetch } from "../data/products.js";
import { updateHearderHtml } from "./checkout/header.js";

// 使用XML
// new Promise((resolve) =>{
//     loadProductsFromInternet(()=>{resolve();});
//     console.log('hello')
// }).then(() =>{
//     updateOrderHtml();
//     updatePayHtml();
// });   

//or
//使用fetch
loadProductsWithFetch().then(() =>{
    updateHearderHtml();
    updateOrderHtml();
    updatePayHtml();
}); 

// or 
// 使用 async await 代替 then
// async function loadData(){
//     try {
//         await loadProductsWithFetch();
//         updateOrderHtml();
//         updatePayHtml();
//     } catch(error){
//         console.log('error');
//     }
// };

    

// //show products html
// loadProductsFromInternet(() =>{
//     updateOrderHtml();
//     updatePayHtml();
// });
