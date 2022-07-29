let url = "https://fixedfitnesswebsite-default-rtdb.europe-west1.firebasedatabase.app/";
let productList = {};

async function getList(){
    const response = await fetch(url + ".json")
    productList = await response.json();
    draw();
}

function draw(){
    let strh = "";
    let str ="";
    for (let[ i, product] of Object.entries(productList)){
        console.log(product.image[0]);
        let productImage = product.image[0];
        let productName = product.name;
        let productCategory = product.category;
        let productPrice = product.price[0];
        let productQuantity = product.qty;

        
        strh = `
        <tr class="header">
        <th>Image</th>
        <th>Name</th>
        <th>Category</th>
        <th>Price</th>
        <th>In stock</th>
        <th><button onclick = "newProduct()" class="newProduct">+ADD A PRODUCT</button></th>
    </tr>
        `
        str+=
        `<tr class="row">
        <td>
            <img src=${productImage} name="Product image" alt="Product image">
        </td>
        <td>
        <span class="productName">${productName}</span>
        </td>
        <td>
        <span class="productCategory">${productCategory}</span>
        </td>
        <td>
        <span class="productPrice" >$${productPrice}</span>
        </td>
        <td>
        <span class="productQty" >${productQuantity}</span>
        </td>
        <td><button onclick = "editProduct(event, '${i}')" class="edit">EDIT</button>
            <button onclick = "deleteProduct('${i}')" class="delete">DELETE</button>
        </td>
        </tr>
        `
    }
    document.querySelector("table").innerHTML=strh + str;
}

function newProduct(){
    document.querySelector(".productArea").classList.add("hidden");
    document.querySelector(".editForm").classList.remove("hidden");

    let str = `
    <h1>Add a new Product</h1>
    <form name="form" onsubmit="saveNew(event)">
    <label for="name">Name</label>
    <input type="text" id="name">
    <label for="benefits">Benefits</label>
    <textarea id="benefits" cols="30" rows="5" placeholder = "Each benefit goes on separate row..."></textarea>
    <label for="category">Category</label>
    <input type="text" id="category">
    <label for="flavours">Flavours</label>
    <textarea name="" id="flavours" cols="30" rows="5" placeholder = "Each flavour goes on separate row..."></textarea>
    <label for="images">Images</label>
    <textarea name="" id="images" cols="30" rows="6" placeholder = "Each image URL goes on separate row..."></textarea>
    <label for="prices">Price per Unit</label>
    <textarea name="" id="prices" cols="30" rows="3" placeholder = "Each price goes on separate row..."></textarea>
    <label for="unit">Unit</label>
    <textarea name="" id="unit" cols="30" rows="3" placeholder = "Each unit goes on separate row..."></textarea>
    <label for="productOverview">Product Overview</label>
    <textarea name="" id="productOverview" cols="30" rows="5" ></textarea>
    <label for="stock">Stock</label>
    <input type="text" id="stock">
    <label for="suggestedUse">Suggested Use</label>
    <textarea name="" id="suggestedUse" cols="30" rows="5"></textarea>

    <input type="submit" value="SAVE">
    <input onclick="cancel()" type="button" value="CANCEL">
</form>
    `
    document.querySelector(".editForm").innerHTML = str;

}

function confirmation(message){
    var result = confirm(message);
    if(result){
    } else throw "exit"
}


async function saveNew(event){
    event.preventDefault();

    let name = document.querySelector("#name").value;
    if (name.length == 0){
        alert("Product has no name! Please fill in all values!")
        throw "exit";
    }
    let benefits = document.querySelector("#benefits").value.split("\n");
    let filteredBenefits = benefits.filter(element => {
        return element!=='';
    })
    if (filteredBenefits.length == 0){

        alert("Product has no benefits! Please fill in all values!")
 
        throw "exit";
    }
    let category = document.querySelector("#category").value;
    if (category.length == 0){
        alert("Product has no category! Please fill in all values!")
        throw "exit";
    }
    let flavours = document.querySelector("#flavours").value.split("\n");
    let filteredFlavours = flavours.filter(element => {
        return element!=='';
    })
    if (filteredFlavours.length == 0){
        alert("Product has no flavours! Please fill in all values!")
        throw "exit";
    }
    let images = document.querySelector("#images").value.split("\n");
    let filteredImages = images.filter(element => {
        return element!=='';
    })
    if (filteredImages.length == 0){
        alert("Product has no image! Please fill in all values!")
        throw "exit";
    }


    let prices = document.querySelector("#prices").value.split("\n");
    let filteredPrices = prices.filter(element => {
        return element!=='';
    })
    if (filteredPrices.length == 0){
        alert("Product has no price! Please fill in all values!")
        throw "exit";
    }

    let unit = document.querySelector("#unit").value.split("\n");
    let filteredUnit = unit.filter(element => {
        return element!=='';
    })
    if (filteredUnit.length == 0){
        alert("Product has no unit! Please fill in all values!")
        throw "exit";
    }


    let productOverview = document.querySelector("#productOverview").value.split("\n");
    let filteredProductOverview = productOverview.filter(element => {
        return element!=='';
    })
    if (filteredProductOverview.length == 0){
        alert("Product has no overview! Please fill in all values!")
        throw "exit";
    }
    let stock = document.querySelector("#stock").value;
    if (stock.length == 0){
        alert("Product has no stock! Please fill in all values!")
        throw "exit";
    }
    let suggestedUse = document.querySelector("#suggestedUse").value;
    if (suggestedUse.length == 0){
        alert("Product has no suggested use! Please fill in all values!")
        throw "exit";
    }

    let newProduct = {
        benefits:filteredBenefits,
        category:category,
        flavour:filteredFlavours,
        image:filteredImages,
        name:name,
        price:filteredPrices,
        productOverview:filteredProductOverview,
        qty:stock,
        suggestedUse:suggestedUse,
        unit:filteredUnit
    }

    confirmation(`Are you sure you want to save product ${name} ?`);

    const response = await fetch(url + ".json", { 
        method: "POST",
        body: JSON.stringify(newProduct),
        headers: {
          "Content-Type": "application/json",
        },
      });
      productList = await response.json(); 


    await getList();
    document.querySelector(".editForm").classList.add("hidden");
    document.querySelector(".productArea").classList.remove("hidden");
    document.querySelector("form").reset();

}

async function deleteProduct(idx){
    confirmation(`Are you sure you want to delete this product ?`);
    const response = await fetch(url + idx + ".json",{
        method: "delete",
    });
    productList = await response.json();


    await getList();  
}

async function editProduct(event, idx){

    const response = await fetch(url + idx + ".json")
    productList = await response.json();
    drawEditForm(idx);   
}

function drawEditForm(idx){
    document.querySelector(".productArea").classList.add("hidden");
    document.querySelector(".editForm").classList.remove("hidden");
    let benefits = productList.benefits;
    let category = productList.category;
    let flavours = productList.flavour;
    let images = productList.image;
    let name = productList.name;
    let prices = productList.price;
    let productOverview = productList.productOverview;
    let stock = productList.qty;
    let suggestedUse = productList.suggestedUse;
    let unit = productList.unit;

    let str = `
    <h1>Edit Product ${name}</h1>
    <form onsubmit="saveEdit(event, '${idx}')">
    <label for="name">Name</label>
    <input type="text" id="name">
    <label for="benefits">Benefits</label>
    <textarea id="benefits" cols="30" rows="5"></textarea>
    <label for="category">Category</label>
    <input type="text" id="category">
    <label for="flavours">Flavours</label>
    <textarea name="" id="flavours" cols="30" rows="5"></textarea>
    <label for="images">Images</label>
    <textarea name="" id="images" cols="30" rows="6"></textarea>
    <label for="prices">Price per Unit</label>
    <textarea name="" id="prices" cols="30" rows="3"></textarea>
    <label for="unit">Unit</label>
    <textarea name="" id="unit" cols="30" rows="3"></textarea>
    <label for="productOverview">Product Overview</label>
    <textarea name="" id="productOverview" cols="30" rows="5"></textarea>
    <label for="stock">Stock</label>
    <input type="text" id="stock">
    <label for="suggestedUse">Suggested Use</label>
    <textarea name="" id="suggestedUse" cols="30" rows="2"></textarea>

    <input type="submit" value="SAVE">
    <input onclick="cancel()" type="button" value="CANCEL">
</form>
    `
    document.querySelector(".editForm").innerHTML = str;

    document.querySelector("#benefits").value = benefits.join("\n");
    document.querySelector("#category").value = category;
    document.querySelector("#flavours").value = flavours.join("\n");
    document.querySelector("#images").value = images.join("\n");
    document.querySelector("#name").value = name;
    document.querySelector("#prices").value = prices.join("\n");
    document.querySelector("#productOverview").value = productOverview.join("\n");
    document.querySelector("#stock").value = stock;
    document.querySelector("#suggestedUse").value = suggestedUse;
    document.querySelector("#unit").value = unit.join("\n");
}


async function saveEdit(event, idx){
    event.preventDefault();

    let name = document.querySelector("#name").value;
    if (name.length == 0){

        alert("Product has no Name! Please fill in all values!")
 
        throw "exit";
    }


    let benefits = document.querySelector("#benefits").value.split("\n");
    let filteredBenefits = benefits.filter(element => {
        return element!=='';
    })
    if (filteredBenefits.length == 0){

        alert("Product has no Benefits! Please fill in all values!")
 
        throw "exit";
    }

    let category = document.querySelector("#category").value;
    if (category.length == 0){

        alert("Product has no Category! Please fill in all values!")
 
        throw "exit";
    }

    let flavours = document.querySelector("#flavours").value.split("\n");
    let filteredFlavours = flavours.filter(element => {
        return element!=='';
    })
    if (filteredFlavours.length == 0){

        alert("Product has no Flavour! Please fill in all values!")
 
        throw "exit";
    }

    let images = document.querySelector("#images").value.split("\n");
    let filteredImages = images.filter(element => {
        return element!=='';
    })
    if (filteredImages.length == 0){

        alert("Product has no Image! Please fill in all values!")
 
        throw "exit";
    }

    let prices = document.querySelector("#prices").value.split("\n");
    let filteredPrices = prices.filter(element => {
        return element!=='';
    })
    if (filteredPrices.length == 0){

        alert("Product has no Price! Please fill in all values!")
 
        throw "exit";
    }

    let unit = document.querySelector("#unit").value.split("\n");
    let filteredUnit = unit.filter(element => {
        return element!=='';
    })
    if (filteredUnit.length == 0){

        alert("Product has no Unit! Please fill in all values!")
 
        throw "exit";
    }




    let productOverview = document.querySelector("#productOverview").value.split("\n");
    let filteredProductOverview = productOverview.filter(element => {
        return element!=='';
    })
    if (filteredProductOverview.length == 0){

        alert("Product has no Overview! Please fill in all values!")
 
        throw "exit";
    }

    let stock = document.querySelector("#stock").value;
    if (stock.length == 0){

        alert("Product has no Stock! Please fill in all values!")
 
        throw "exit";
    }

    let suggestedUse = document.querySelector("#suggestedUse").value;
    if (suggestedUse.length == 0){

        alert("Product has no Suggested use! Please fill in all values!")
 
        throw "exit";
    }


    let productId = {
        benefits:filteredBenefits,
        category:category,
        flavour:filteredFlavours,
        image:filteredImages,
        name:name,
        price:filteredPrices,
        productOverview:filteredProductOverview,
        qty:stock,
        suggestedUse:suggestedUse,
        unit:filteredUnit
    }

    confirmation(`Are you sure you want to modify product ${name} ?`);

    const response = await fetch(url + idx + ".json", { 
        method: "put",
        body: JSON.stringify(productId),
        headers: {
          "Content-Type": "application/json",
        },
      });
      productList = await response.json(); 



    await getList();
    document.querySelector(".editForm").classList.add("hidden");
    document.querySelector(".productArea").classList.remove("hidden");
    document.querySelector("form").reset();

}

function cancel(){

    confirmation(`Are you sure you want to exit? Any unsaved changes will be lost!`);

    document.querySelector(".editForm").classList.add("hidden");
    document.querySelector(".productArea").classList.remove("hidden");
    document.querySelector("form").reset();

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
    window.location.href = "admin.html";
 }
