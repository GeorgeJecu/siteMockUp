let productList = {};
let url = "https://fixedfitnesswebsite-default-rtdb.europe-west1.firebasedatabase.app/"

async function getList() {

    const response = await fetch(url + ".json");
    productList = await response.json();

    draw();
}

let str = "";

function draw() {

    for (let [i, product] of Object.entries(productList)){
        let productImage = product.image[0];
        let productName = product.name;
        // let productOverview = product.productOverview[0];
        let productPrice = product.price[0];

        str += `<a href=detail.html?id=${i}>
        <div onclick="openDetail(${i})" class="productCard">
            <div class="productImage">
                <img src=${productImage} alt="Product image">
            </div>
            <div class="productInfo">
                <span class="title">${productName}</span>
                <span class="price">$${productPrice}</span>
            </div>
            <button>VIEW DETAILS</button>
        </div>
                </a>`
                // <span class="description">${productOverview}</span>
            }
    
    document.querySelector(".productList").innerHTML = str; 
}

function toggleMenu(){
    let responsiveNav = document.querySelector(".responsiveNav");
    if (responsiveNav.classList.contains("hidden")){
        responsiveNav.classList.remove("hidden")
    }else{
        responsiveNav.classList.add("hidden")

    }
}


function openCart(){
    window.location.href = "../cart/cart.html";
 }
 function logIn(){
    window.location.href = "../admin/admin.html";
 }

 
