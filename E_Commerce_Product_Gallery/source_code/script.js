// ======================================
// ShopSphere E-Commerce JavaScript
// ======================================


// PRODUCT DATABASE

const products = [

{
id:1,
name:"Wireless Headphones",
category:"Electronics",
price:79,
image:"images/headphones.jpg",
description:"High quality wireless headphones with clear sound and comfortable design.",
rating:"⭐⭐⭐⭐⭐"
},


{
id:2,
name:"Smart Watch",
category:"Electronics",
price:120,
image:"images/watch.jpg",
description:"Smart watch with fitness tracking and modern features.",
rating:"⭐⭐⭐⭐"
},


{
id:3,
name:"Running Shoes",
category:"Shoes",
price:95,
image:"images/shoes.jpg",
description:"Comfortable running shoes designed for daily workouts.",
rating:"⭐⭐⭐⭐⭐"
},


{
id:4,
name:"Casual T-Shirt",
category:"Fashion",
price:25,
image:"images/tshirt.jpg",
description:"Premium cotton casual t-shirt with stylish look.",
rating:"⭐⭐⭐⭐"
},


{
id:5,
name:"Modern Table Lamp",
category:"Home",
price:40,
image:"images/lamp.jpg",
description:"Elegant table lamp suitable for modern interiors.",
rating:"⭐⭐⭐⭐"
},


{
id:6,
name:"Winter Jacket",
category:"Fashion",
price:89,
image:"images/jacket.jpg",
description:"Warm winter jacket with comfortable fabric.",
rating:"⭐⭐⭐⭐⭐"
}

];



// LOCAL STORAGE

let cart = JSON.parse(localStorage.getItem("cart")) || [];

let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];



// SAVE DATA

function saveData(){

localStorage.setItem("cart",JSON.stringify(cart));

localStorage.setItem("wishlist",JSON.stringify(wishlist));

}




// ======================================
// DISPLAY PRODUCTS
// ======================================


function displayProducts(list = products){


const productGrid=document.getElementById("productGrid");


if(!productGrid)
return;



productGrid.innerHTML="";



list.forEach(product=>{


productGrid.innerHTML += `

<div class="product-card">


<img src="${product.image}" alt="${product.name}">


<h3>${product.name}</h3>


<p class="price">$${product.price}</p>


<div class="product-buttons">


<button onclick="viewProduct(${product.id})">

View

</button>


<button onclick="addToCart(${product.id})">

Cart

</button>


<button onclick="addToWishlist(${product.id})">

❤

</button>


</div>


</div>

`;

});


}



// ======================================
// SEARCH FUNCTION
// ======================================


function searchProducts(){


const input=document.getElementById("searchInput");


const value=input.value.toLowerCase();



const filtered=products.filter(product=>


product.name.toLowerCase().includes(value)


);


displayProducts(filtered);


}




// ======================================
// CATEGORY FILTER
// ======================================


function filterProducts(){


const category=document.getElementById("categoryFilter").value;



if(category==="All"){

displayProducts(products);

}

else{


const filtered=products.filter(product=>

product.category===category

);


displayProducts(filtered);


}


}




// ======================================
// VIEW PRODUCT
// ======================================


function viewProduct(id){


localStorage.setItem("selectedProduct",id);


window.location.href="product.html";


}




// ======================================
// LOAD PRODUCT DETAILS
// ======================================


function loadProductDetails(){


const id=localStorage.getItem("selectedProduct");


const product=products.find(p=>p.id==id);



if(!product)
return;



const image=document.getElementById("productImage");

const name=document.getElementById("productName");

const price=document.getElementById("productPrice");

const description=document.getElementById("productDescription");

const rating=document.getElementById("productRating");



if(image)
image.src=product.image;


if(name)
name.innerHTML=product.name;


if(price)
price.innerHTML="$"+product.price;


if(description)
description.innerHTML=product.description;


if(rating)
rating.innerHTML=product.rating;



const cartBtn=document.getElementById("addCartBtn");

const wishBtn=document.getElementById("wishlistBtn");



if(cartBtn){

cartBtn.onclick=function(){

addToCart(product.id);

}

}



if(wishBtn){

wishBtn.onclick=function(){

addToWishlist(product.id);

}

}



}




// ======================================
// CART FUNCTIONS
// ======================================


function addToCart(id){


const product=products.find(p=>p.id===id);



let item=cart.find(p=>p.id===id);



if(item){

item.quantity++;

}

else{

cart.push({

...product,

quantity:1

});

}


saveData();


alert("Product added to cart");


}




function displayCart(){


const cartItems=document.getElementById("cartItems");


if(!cartItems)
return;



cartItems.innerHTML="";


let total=0;

let count=0;



cart.forEach(item=>{


total += item.price * item.quantity;


count += item.quantity;



cartItems.innerHTML += `


<div class="cart-item">


<img src="${item.image}">


<div class="cart-details">

<h3>${item.name}</h3>

<p>

Quantity:

<input type="number" min="1"
value="${item.quantity}"
onchange="updateQuantity(${item.id},this.value)">

</p>

</div>


<div class="cart-price">

$${item.price * item.quantity}

</div>


<button class="remove-btn"
onclick="removeCart(${item.id})">

Remove

</button>


</div>


`;


});



document.getElementById("totalItems").innerHTML=count;


document.getElementById("totalPrice").innerHTML=total.toFixed(2);


}





function updateQuantity(id,value){


let item=cart.find(p=>p.id===id);


item.quantity=parseInt(value);


saveData();


displayCart();


}




function removeCart(id){


cart=cart.filter(item=>item.id!==id);


saveData();


displayCart();


}



// ======================================
// WISHLIST
// ======================================


function addToWishlist(id){


const product=products.find(p=>p.id===id);



if(!wishlist.some(item=>item.id===id)){


wishlist.push(product);


saveData();


alert("Added to wishlist");


}

else{


alert("Already in wishlist");


}


}



function displayWishlist(){


const container=document.getElementById("wishlistItems");


if(!container)
return;



container.innerHTML="";



wishlist.forEach(item=>{


container.innerHTML += `


<div class="wishlist-card">


<img src="${item.image}">


<h3>${item.name}</h3>


<p>$${item.price}</p>


<div class="wishlist-buttons">


<button onclick="addToCart(${item.id})">

Cart

</button>


<button onclick="removeWishlist(${item.id})">

Remove

</button>


</div>


</div>


`;


});


}




function removeWishlist(id){


wishlist=wishlist.filter(item=>item.id!==id);


saveData();


displayWishlist();


}




// ======================================
// PAGE LOAD
// ======================================


document.addEventListener("DOMContentLoaded",()=>{


displayProducts();


loadProductDetails();


displayCart();


displayWishlist();



const search=document.getElementById("searchInput");


if(search){

search.addEventListener("input",searchProducts);

}



const filter=document.getElementById("categoryFilter");


if(filter){

filter.addEventListener("change",filterProducts);

}



const checkout=document.getElementById("checkoutBtn");


if(checkout){


checkout.onclick=function(){

alert("Thank you for your order!");

cart=[];

saveData();

displayCart();

}


}



});