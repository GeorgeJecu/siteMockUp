let url = "https://fixedfitnesswebsite-default-rtdb.europe-west1.firebasedatabase.app/";
let product = {};
let index = window.location.search.substring(4);
// let str = "";

if(index.length <1 ){
    window.location = "product.html"; 
}

async function getList() {
    const response = await fetch(url + index + ".json"); 
    product = await response.json(); 
    draw();
}

function draw(){
    document.querySelector("title").innerHTML = product.name;

    let str="";
    str = `<img class="slideshowImage fade" src="${product.image[0]}" alt="">
    `
    document.querySelector(".imageSelect").innerHTML = str;

    // str="";
    // for (let[i, content] of Object.entries(product.image)){
    //     str+=`<span class="dot" onclick=""></span>
    //     `
    // }

    // let dots = document.querySelectorAll(".dot");
    // dots[0].classList.add("active");

    str=""

    for (let [i, content] of Object.entries(product.productOverview)){   
        str += `<span>${product.productOverview[i]}
        </span>
    `
    }

    document.querySelector("#productOverview").innerHTML = str;

    str = "";

    for (let [i, content] of Object.entries(product.benefits)){   
        str += `<span>${product.benefits[i]}
        </span>
    `
}

    document.querySelector("#benefits").innerHTML = str;

    str = product.suggestedUse;

    document.querySelector("#suggestedUse").innerHTML = str;

    document.querySelector("#productTitle").innerHTML = product.name;
    document.querySelector("#responsiveProductTitle").innerHTML = product.name;
    str = `<span class="row">
            <img src="https://firebasestorage.googleapis.com/v0/b/fixedfitnesswebsite.appspot.com/o/navImg%2Ftick.svg?alt=media&token=514b9f5b-b1c7-4703-a0a3-0124ced119fd" alt=""> 
            <span>${product.category}</span>    
            </span>
            `
    document.querySelector(".benefits").innerHTML=str;
    document.querySelector(".responsiveBenefits").innerHTML=str;

    str="";

    for (let [i, content] of Object.entries(product.flavour)){   
        str +=    `<option value="${i*1+1}">${product.flavour[i]}</option>`
}

    document.querySelector("[name='flavour']").innerHTML= `<option value="0">Choose your flavour</option>` + str;

    str="";

    for (let [i, content] of Object.entries(product.unit)){   
        str +=    `<option value="${i*1+1}">${product.unit[i]}</option>`
}

    document.querySelector("[name='size']").innerHTML= `<option value="0">Choose your size</option>` + str;

    // let size = document.querySelector("[name='size']").value;
    // let price;
    // if (size === 0){
    //     price = product.price[size-1];
    // }else{
    //     price = product.price[size-1];
    // }

    // document.querySelector(".price > span").innerHTML = price;

    if(Number(product.qty) > 10 ){
        document.querySelector(".stock").innerHTML = `In stock: ${product.qty} items`
    }else{
        document.querySelector(".stock").innerHTML = `Only ${product.qty} left in stock!`
    }


}

function increment(){
    document.querySelector(".decrement-quantity").removeAttribute("disabled");
    let str = 1;
    idx = document.querySelector("[name='quantity']").value;
    let total = idx*1+str;
    if(Number(total) === Number(product.qty) ){
        document.querySelector(".increment-quantity").setAttribute("disabled", "disabled");
    }
    document.querySelector("[name='quantity']").value = total;
}

function decrement(){
    document.querySelector(".increment-quantity").removeAttribute("disabled", "disabled");
    let idx = document.querySelector("[name='quantity']").value;
    if (idx*1 == 2) {
        document.querySelector(".decrement-quantity").setAttribute("disabled", "disabled");
    }
    let str = 1;
    let total = idx*1-str;
    if (total > 0){
        document.querySelector("[name='quantity']").value = total;
    }

}


function showDetail(idx){
    let strid = `#${idx.name}`
    let strname = `[name = "${idx.name}"]`
    let cls = document.querySelector(strid);
    if (cls.classList.contains("hidden")){
        document.querySelector(strid).classList.remove("hidden");
        document.querySelector(strid).classList.add("fade");
        document.querySelector(strname).src="https://firebasestorage.googleapis.com/v0/b/fixedfitnesswebsite.appspot.com/o/navImg%2FexpandLess.svg?alt=media&token=ff23cca1-e4d7-400d-89e6-76c28549a33c"


    } else{
        document.querySelector(strid).classList.add("hidden");
        document.querySelector(strid).classList.remove("fade");
        document.querySelector(strname).src="https://firebasestorage.googleapis.com/v0/b/fixedfitnesswebsite.appspot.com/o/navImg%2FexpandMore.svg?alt=media&token=bae3a9a6-e4c0-4163-b2f5-51c3de842602"

    }
    

}


let idx = 1;
function slideshowNext(){

    str="";
    if(idx === product.image.length){
        idx = 0;
    }


    str = `<img class="slideshowImage fade" src="${product.image[idx]}" alt="">

    `

    document.querySelector(".imageSelect").innerHTML = str;

    if (idx < product.image.length){
        idx+=1;
    }
}

function slideshowPrev(){

    idx-=1;



    if (idx === 0){

        idx = product.image.length;

    }


    str = `<img class="slideshowImage fade" src="${product.image[idx-1]}" alt="">
    `
    document.querySelector(".imageSelect").innerHTML = str;

       
}
function validate() {
    document.querySelector("[name='flavour']").classList.remove("error");
    document.querySelector("[name='flavour']").classList.add("valid");

    document.querySelector("[name='size']").classList.remove("error");
    document.querySelector("[name='size']").classList.add("valid");


}

function calcPrice(){
    validate();
    let select = document.querySelector("#select").value;

    prc = select*1;




    if (prc > 0) {
        document.querySelector(".price").classList.remove("hidden");
        document.querySelector(".price > span").innerHTML = `$${product.price[select-1]}` 
        
    } else {
        document.querySelector(".price").classList.add("hidden");
        document.querySelector(".price>span").innerHTML =""; 


    }
}

function addToCart(){
    let image = product.image[0];
    let name = product.name;
    let stock = product.qty;
    let flavour = document.querySelector("[name='flavour']").value;
    let size = document.querySelector("[name='size']").value;
    let price = document.querySelector(".price>span").innerHTML;
    price = Number(price.substring(1));

    if (flavour == 0){
        document.querySelector("[name='flavour']").classList.remove("valid");
        document.querySelector("[name='flavour']").classList.add("error");
    }else{
        document.querySelector("[name='flavour']").classList.remove("error");
        document.querySelector("[name='flavour']").classList.add("valid");
    }
    flavour = product.flavour[flavour-1];

    if(size == 0) {
        document.querySelector("[name='size']").classList.remove("valid");
        document.querySelector("[name='size']").classList.add("error");
    }
    else{
        document.querySelector("[name='size']").classList.remove("error");
        document.querySelector("[name='size']").classList.add("valid");
    }
    size = product.unit[size-1];


    let quantity = document.querySelector("[name='quantity']").value;
    quantity = Number(quantity);

    if (price === "" || price === 0){
        console.error("Please specify the marked values!")
        throw "exit"
    }


    let item = {
        productId: index,
        image:image,
        name: name,
        flavour: flavour,
        size: size,
        price: price,
        stock:stock,
        quantity:quantity
    }

    let cart = localStorage.getItem("cart");
    if( cart === null) {
        cart = [];
    } else {
        cart = JSON.parse(cart);
    }
    let found = false;
    for (let i of cart) {
        if ((i.productId === item.productId) && (i.flavour === item.flavour) && (i.size === item.size) ){
            i.quantity += item.quantity;
            found = true;
        } 
    }
    if(!found) {
        cart.push(item);
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    cartConfirmation()
}

function cartConfirmation(){
    document.querySelector(".confirmation").classList.remove("fadeOut");
    document.querySelector(".confirmation").classList.remove("noOpacity");
    document.querySelector(".confirmation").classList.add("fadeIn");
    setTimeout(
        function(){
            document.querySelector(".confirmation").classList.remove("fadeIn");
            document.querySelector(".confirmation").classList.add("fadeOut");
        }, 4000);

    setTimeout(
        function(){
            document.querySelector(".confirmation").classList.add("noOpacity");
        }, 5500);

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





