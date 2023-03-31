/**
 * Include your custom JavaScript here.
 *
 * We also offer some hooks so you can plug your own logic. For instance, if you want to be notified when the variant
 * changes on product page, you can attach a listener to the document:
 *
 * document.addEventListener('variant:changed', function(event) {
 *   var variant = event.detail.variant; // Gives you access to the whole variant details
 * });
 *
 * You can also add a listener whenever a product is added to the cart:
 *
 * document.addEventListener('product:added', function(event) {
 *   var variant = event.detail.variant; // Get the variant that was added
 *   var quantity = event.detail.quantity; // Get the quantity that was added
 * });
 *
 * If you just want to force refresh the mini-cart without adding a specific product, you can trigger the event
 * "cart:refresh" in a similar way (in that case, passing the quantity is not necessary):
 *
 * document.documentElement.dispatchEvent(new CustomEvent('cart:refresh', {
 *   bubbles: true
 * }));
 */

var links = document.links;
for (let i = 0, linksLength = links.length ; i < linksLength ; i++) {
  if (links[i].hostname !== window.location.hostname) {
    links[i].target = '_blank';
    links[i].relList.add('noreferrer', 'noopener');
  }
}   


$(document).ready(function() { 
  $("#shopify-block-14952540001915115444").appendTo(".PageContainer");

  // For Product Page - No option to change in Plugin Setting
  const fixReviewText =  document.getElementsByClassName('loox-rating-label')[0];
  fixReviewText.textContent = fixReviewText.textContent.substring(1);
});


function addtocartSuggestion_1(){
    var variant = $("#variants_1").val(); 
    console.log(variant);
     var items = [{ quantity: 1, id: variant }];
   $.ajax({
       type: "POST",
       url: '/cart/add.json',
       data: { items: items },
       success: function(data) {
              console.log('success');
           },
       dataType: 'application/json'
    });
    // Now I will do a get to show the itens from cart
   setTimeout(function() {
   jQuery.getJSON('/cart.js', function(cart) {
        let cartData = cart.items;
        document.dispatchEvent(new CustomEvent('cart:build' , {bubbles: true})); 
        document.dispatchEvent(new CustomEvent('cart:refresh', {
            bubbles: true,
             detail: cartData
        })); 
   });
   }, 400); 
}





