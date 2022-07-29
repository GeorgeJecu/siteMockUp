let cart = localStorage.getItem("cart");
if( cart === null) {
    cart = [];
} else {
    cart = JSON.parse(cart);
}



function getList(){
    cart = localStorage.getItem("cart");
    if( cart === null) {
        cart = [];
    } else {
        cart = JSON.parse(cart);
}

    let str = "";
    let units
    for (let [i, value] of Object.entries(cart)){
        units += cart[i].quantity;
        str += `
    <div  class="productInfo">
        <div onclick="" class="generalInfo">
            <img src="${cart[i].image}" alt="">
            <h2><a href = "../product/detail.html?id=${cart[i].productId}">${cart[i].name}</a></h2>
        </div>

        <div class="detailedInfo">
            <span class="flavour">Flavour:${cart[i].flavour}</span>
            <span class="size">Size:${cart[i].size}</span>
        </div>

        <div class="quantityInfo">
            <div class="quantity">
                <span class="stock ${cart[i].productId}">In stock:${cart[i].stock}</span>
                <button onclick="decrement(event, '${cart[i].productId}')" class="decrement-quantity ${cart[i].productId}" aria-label="Subtract one" data-direction="-1">&#8722;</button>
                <input id='${cart[i].productId}' data-min="1" data-max="0" type="text" name="quantity" value="${cart[i].quantity}" readonly="true">

                <button onclick="increment(event, '${cart[i].productId}')" class="increment-quantity ${cart[i].productId}" aria-label="Add one" data-direction="1">&#43;</button>

            </div>

            <div class="price ${cart[i].productId}">$${cart[i].price}</div>
        </div>
        </div>
        `  

        let qty = "";
        let price = ""
        qty = cart[i].quantity;
        qty = Number(qty);
        price = cart[i].price;
        price = Number(price);

        let cost = qty * price;
        cost = cost.toFixed(2);
        cost = Number(cost);

        totalCost += cost;
        totalCost = Number(totalCost);
        totalCost = totalCost.toFixed(2);
        totalCost = Number(totalCost);

        total=totalCost + 14.99;
        total = Number(total);
        total = total.toFixed(2);
        total = Number(total);


        
    }
    document.querySelector(".orderCost > .value").innerHTML = `$${totalCost}`;
    document.querySelector(".total > .value").innerHTML = `$${total}`;



    document.querySelector(".row").innerHTML =str;
    
    // if (cart[all].quantity > 0){
    //     document.querySelector(".decrement-quantity").removeAttribute("disabled");

    // }

}

function confirmation(message){
    var result = confirm(message);
    if(result){
    } else throw "exit"
}


function increment(event, item){
    let maxVal = document.querySelector(`.stock.${item}`).innerHTML;
    maxVal = Number(maxVal.substring(9));

    document.querySelector(`.decrement-quantity.${item}`).removeAttribute("disabled");
    let str = 1;
    idx = document.querySelector(`#${item}`).value;
    let total = idx*1+str;



    if(Number(total) === maxVal ){
        document.querySelector(`.increment-quantity.${item}`).setAttribute("disabled", "disabled");
    }


    document.querySelector(`#${item}`).value = total;
    addToCart(item);

}

function decrement(event, item){
    let idx = document.querySelector(`#${item}`).value;
    if (idx ==1 ){
        confirmation("This will remove your product from the cart! Are you sure?");
        remove(item);



    }
    document.querySelector(`.increment-quantity.${item}`).removeAttribute("disabled", "disabled");

    let str = 1;
    let total = idx*1-str;
    if (total > 0){
        document.querySelector(`#${item}`).value = total;
    }
    subtractFromCart(item)

}

function remove(item){
    // if( cart === null) {
    //     cart = [];
    // } else {
    //     cart = JSON.parse(cart);
    // }

    for(let i = 0; i < cart.length; i++){
        if(item === cart[i].productId){
            cart.splice(i, 1);
        }
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    getList();
    location.reload();


    }

    let totalCost = 0;
    let total = 0;

    function addToCart(item){

        let qty = "";
        let price = ""
        qty = document.querySelector(`#${item}`).value;
        qty = Number(qty);

        price = document.querySelector(`.price.${item}`).innerHTML.substring(1);
        price = Number(price);




        totalCost += price;
        totalCost = Number(totalCost);
        totalCost = totalCost.toFixed(2);
        totalCost = Number(totalCost);

        total=totalCost + 14.99;
        total = Number(total);
        total = total.toFixed(2);
        total = Number(total);



        // totalCost = totalCost.toFixed(0);

        document.querySelector(".orderCost > .value").innerHTML = `$${totalCost}`;
        document.querySelector(".total > .value").innerHTML = `$${total}`;

    }

    function subtractFromCart(item){

        let qty = "";
        let price = ""
        qty = document.querySelector(`#${item}`).value;
        qty = Number(qty);

        price = document.querySelector(`.price.${item}`).innerHTML.substring(1);
        price = Number(price);




        totalCost -= price;

        totalCost = Number(totalCost);
        totalCost = totalCost.toFixed(2);
        totalCost = Number(totalCost);

        total=totalCost + 14.99;
        total = Number(total);
        total = total.toFixed(2);
        total = Number(total);




        document.querySelector(".orderCost > .value").innerHTML = `$${totalCost}`;
        document.querySelector(".total > .value").innerHTML = `$${total}`;


    }

    function openCart(){
        window.location.href = "cart.html";
     }
     function logIn(){
        window.location.href = "../admin/admin.html";
     }
    















