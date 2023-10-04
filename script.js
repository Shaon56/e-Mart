const bar = document.getElementById('bar');
const close = document.getElementById('close');
const nav = document.getElementById('navbar');

if(bar){
    bar.addEventListener('click', ()=>{
        nav.classList.add('active');
    })
}
if(close){
    close.addEventListener('click', ()=>{
        nav.classList.remove('active');
    })
}


// -------------------- for individual price
document.addEventListener("DOMContentLoaded", function() {
    // Define the array with name data
    let prices = ["71", "82", "63", "74", "91", "62", "83", "74", "78", "98", "53", "69", "63", "74", "91", "62"];

    // Loop through each content box and update the name
    let contentBoxes = document.querySelectorAll(".des");
    contentBoxes.forEach((box, index) => {
        let priceElement = box.querySelector(".price");
        priceElement.textContent =`$ ` + prices[index];
    });
});



// -------------------- for individual rating
document.addEventListener("DOMContentLoaded", function() {

    function generateStars(rating) {
        let fullStarClass = 'bx bxs-star';
        let halfStarClass = 'bx bxs-star-half';
        let emptyStarClass = 'bx bx-star'; // Assuming you have a class for an empty star, modify if different.

        let fullStars = Math.floor(rating);
        let hasHalfStar = rating % 1 !== 0;
        let emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

        // Generate the stars
        let stars = '';
        for(let i = 0; i < fullStars; i++) {
            stars += `<i class="${fullStarClass}"></i>`;
        }
        if(hasHalfStar) {
            stars += `<i class="${halfStarClass}"></i>`;
        }
        for(let i = 0; i < emptyStars; i++) {
            stars += `<i class="${emptyStarClass}"></i>`;
        }

        return stars;
    }

    let starDiv = document.querySelectorAll('.star');

    starDiv.forEach(starDiv => {
        let rating = parseFloat(starDiv.getAttribute('data-rating'));
        starDiv.innerHTML = generateStars(rating);
    });
});




// script.js
function getProductIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}

function displaySelectedProduct(productId) {
    const allProducts = document.querySelectorAll('.single-product');

    allProducts.forEach(product => {
        if (product.getAttribute('data-product-id') === productId) {
            product.style.display = 'flex';  // Show the selected product
        } else {
            product.style.display = 'none';   // Hide other products
        }
    });
}

window.onload = function() {
    const productId = getProductIdFromUrl();
    displaySelectedProduct(productId);
}
