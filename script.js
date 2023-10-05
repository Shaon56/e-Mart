//------------------------------------------index.html-----------------------------------------------

//--------**************************carosal slider************************************
let currentIndex = 0;
const slides = document.querySelectorAll('#hero .slide');

setInterval(function() {
    // Reset the position of the current slide to the right
    slides[currentIndex].style.left = "100%";

    // Increment the current index
    currentIndex = (currentIndex + 1) % slides.length;

    // Move the next slide to be visible
    slides[currentIndex].style.left = "0";
}, 8000); // Change every 2 seconds


//*******************************************text writing****************************** */
document.addEventListener("DOMContentLoaded", function() {
    var typed = new Typed(".text", {
        strings: ["ON E-Mart.", "with DISCOUNT Offer.", "With FREE Delivery."],
        typeSpeed: 100,
        backSpeed: 100,
        backDelay: 1000,
        loop: true
    });
});

//******************************************* counter design *******************************************

document.addEventListener("DOMContentLoaded",() => {
    function counter(id, start, end, duration){
        let obj = document.getElementById(id),
        current = start,
        range = end - start,
        increment = end > start ? 1 : -1,
        step = Math.abs(Math.floor(duration/range)),
        timer = setInterval(() => {
            current += increment;
            obj.textContent = current;
            if(current == end){
                clearInterval(timer);
            }
        }, step);
    }
    counter("count1", 0, 400, 2000);
    counter("count2", 23000, 25000, 2500);
    counter("count3", 0, 1600, 2000);
    counter("count4", 98000, 100110, 3000);
});


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


// -------------------- for individual price------------------------------------------------------------------------------------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", function() {
    // Define the array with name data
    let prices = ["71", "82", "63", "74", "91", "62", "83", "74", "78", "98", "53", "69", "63", "74", "91", "62"];

    let contentBoxes = document.querySelectorAll(".des");

    contentBoxes.forEach((box, index) => {
        let priceElement = box.querySelector(".price");
        
        if (priceElement) {
            priceElement.textContent = `$ ` + prices[index];
        } else {
            console.log('Price element not found inside box', index);
        }
    });
});



// -------------------- for individual rating-------------------------------------------------------------------------------------------------------------------------------------------------
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




// ---for individual product details (home+shop) to sproduct.html-----------------------------------------------------------------------------------------------------------------------------------------
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



//****************************************************sproduct.html************************************************************************************* */

//*******************************************************image gallery of sproduct------------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", function() {
    const smallImgs = document.querySelectorAll(".small-img");

    smallImgs.forEach(function(smallImg) {
        smallImg.addEventListener("click", function(){
            const mainImg = smallImg.closest(".single-pro-image").querySelector(".mainImg");
            mainImg.src = smallImg.src;
        });
    });
});


// for product quantity calculation---------------------------------------------------
document.addEventListener("DOMContentLoaded", function(){
    //for calling target item
    const quantity = document.querySelectorAll(".quantity");

    quantity.forEach(quantity =>{
        const liElements = quantity.querySelectorAll("li");

        const plusBtn = liElements[0];
        const valueLi = liElements[1];
        const minusBtn = liElements[2];

        plusBtn.addEventListener("click", function(){
            valueLi.textContent = (parseInt(valueLi.textContent)) + 1;
        });
        
        minusBtn.addEventListener("click", function(){
            if(parseInt(valueLi.textContent) > 1){
                valueLi.textContent = (parseInt(valueLi.textContent)) - 1;
            }
        });
    });
});


//add click function on button--------------------------------------------------------
document.addEventListener("DOMContentLoaded", function(){
    const moveCarts = document.querySelectorAll(".redirectCart");

    moveCarts.forEach(function(moveCart) {
        moveCart.addEventListener("click", function(){
            window.location.href = "./cart.html";
        });
    });
});


//***************************************************sproduct to add to cart***************************************** */
document.addEventListener("DOMContentLoaded", function(){
    
    // Add to cart function
    const addToCart = (product) => {
        let cart = JSON.parse(localStorage.getItem('cart') || '[]');
        
        const existingProduct = cart.find(p => p.name === product.name);
        
        if(existingProduct) {
            existingProduct.quantity += product.quantity;
        } else {
            cart.push(product);
        }

        localStorage.setItem('cart', JSON.stringify(cart));
    };

    // Event listener for "Add to Cart" buttons
    document.querySelectorAll('.redirectCart').forEach(button => {
        button.addEventListener('click', function() {
            const productDiv = this.closest('.single-product');
            
            const product = {
                imgSrc: productDiv.querySelector('.mainImg').src,
                name: productDiv.querySelector('.single-pro-details h4').textContent,
                price: productDiv.querySelector('.single-pro-details h2 ').textContent.trim(),
                quantity: parseInt(productDiv.querySelector('.quantity li:nth-child(2)').textContent)
            };

            addToCart(product);
            
            // Optionally, redirect to the cart page after adding the product
            // window.location.href = 'cart.html';
        });
    });
});









//------pagination system ------------------------------------------------------------
document.addEventListener("DOMContentLoaded", function() {
    // All products
    const products = document.querySelectorAll('.proShop');

    // All page links
    const pageLinks = document.querySelectorAll('#pagination a');

    // Function to show products for a page
    function showProductsForPage(page) {
        products.forEach(product => {
            // Hide all products first
            product.style.display = 'none';

            // Show products that match the selected page
            if(product.getAttribute('data-page') === page.toString()) {
                product.style.display = 'block';
            }
        });
    }

    // Initial display: show products for the first page
    showProductsForPage(1);

    // Add click event to page links
    pageLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Prevent default link behavior
            e.preventDefault();

            // Remove 'active' class from all page links
            pageLinks.forEach(l => l.classList.remove('active'));

            // Add 'active' class to the clicked link
            this.classList.add('active');

            // Get the page number from the clicked link's text
            const pageNumber = parseInt(this.textContent);

            // Show products for the selected page
            showProductsForPage(pageNumber);
        });
    });
});


