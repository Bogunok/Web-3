function addProduct(){
    let newProduct = document.getElementById("search_bar").value;

    let productName = document.getElementsByClassName("product_name");

    let unique = true;

    for(let i= 0; i<productName.length; i++){
        if(productName[i].textContent === newProduct){
            unique=false;
            break;
        }
    }

    if(unique && newProduct !== "") {

        let product_shop = document.getElementById("products");

        let newSection = document.createElement("section");

        newSection.className = "product_panel";

        let newProductName = document.createElement("span");

        newProductName.className = "product_name";

        newProductName.innerHTML = newProduct;

        newProductName.addEventListener("click", function () {
            editName(this);
        })

        let newProductQuantity = document.createElement("div");

        newProductQuantity.className = "product_quantity";

        let newMinusProduct = document.createElement("button");

        newMinusProduct.className = "minus";

        newMinusProduct.innerHTML = "-";

        newMinusProduct.dataset.tooltip = "Менше";

        newMinusProduct.addEventListener('click', function (){
            minusProduct(this);
        })

        let newCounter = document.createElement("span");

        newCounter.className = "number";

        newCounter.innerHTML = "1";

        let newPlusProduct = document.createElement("button");

        newPlusProduct.className = "plus";

        newPlusProduct.innerHTML = "+";

        newPlusProduct.dataset.tooltip = "Більше";

        newPlusProduct.addEventListener('click', function (){
            plusProduct(this);
        })

        newCounter.style.marginRight = "4px";

        newCounter.style.marginLeft = "4px";

        let newProductPurchase = document.createElement("div");

        newProductPurchase.className = "product_purchase";

        let newBoughtButton = document.createElement("button");

        newBoughtButton.className = "bought";

        newBoughtButton.innerHTML = "Куплено";

        newBoughtButton.dataset.tooltip = "Придбати";

        newBoughtButton.addEventListener("click", function (){
            buyProduct(this);
        });

        let newCancel = document.createElement("button");

        newCancel.className = "delete";

        newCancel.innerHTML = "Х";

        newCancel.dataset.tooltip = "Видалити товар";

        newCancel.addEventListener("click", function (){
            deleteProduct(this);
        });

        newCancel.style.marginLeft = "4px";

        newProductQuantity.appendChild(newMinusProduct)

        newProductQuantity.appendChild(newCounter);

        newProductQuantity.appendChild(newPlusProduct);

        newProductPurchase.appendChild(newBoughtButton);

        newProductPurchase.appendChild(newCancel);

        newSection.appendChild(newProductName);

        newSection.appendChild(newProductQuantity);

        newSection.appendChild(newProductPurchase);

        product_shop.appendChild(newSection);

        document.getElementById("search_bar").focus();

        document.getElementById("search_bar").value = "";


        let statBox = document.getElementById("basket_box");

        let leftBox = document.getElementById("products_remained");

        let newProductStat = document.createElement("span");

        let newProductStatName = document.createElement("span");

        newProductStatName.innerText = newProduct;

        newProductStat.classList.add("basket_product");

        newProductStatName.classList.add("basket_product_name");

        let newProductCount = document.createElement("span");

        newProductCount.innerText = "1";

        newProductCount.classList.add("basket_products_number");

        newProductStat.appendChild(newProductStatName);

        newProductStat.appendChild(newProductCount);

        leftBox.appendChild(newProductStat);
    }
}
function deleteProduct(button) {
    let section = button.closest("section");
    let name = section.getElementsByTagName("span");
    let statBox = document.getElementById("basket_box");
    let productStats = statBox.getElementsByClassName("basket_product");
    for(let i= 0; i<productStats.length; i++){
        let productName = productStats[i].getElementsByClassName("basket_product_name");
        if (productName[0].innerText === name[0].innerText){
            productStats[i].remove();
        }
    }
    section.remove();
}

function buyProduct(button){
    button.innerHTML = "Не куплено";
    button.dataset.tooltip = "Товар куплено";
    button.removeEventListener("click", function (){
        buyProduct(this);
    });
    button.addEventListener("click", function (){
        notToBuy(this);
    });
    let closestDiv = button.closest("div");
    let cancel = closestDiv.getElementsByClassName("delete");
    cancel[0].remove();
    let closestSection = button.closest("section");
    let closestQuantity = closestSection.getElementsByClassName("product_quantity");
    let closestMinus = closestQuantity[0].getElementsByClassName("minus");
    let closestPlus = closestQuantity[0].getElementsByClassName("plus");
    closestMinus[0].remove();
    closestPlus[0].remove();
    let closestPanel = closestSection.closest("section");
    let closestName = closestPanel.getElementsByTagName("span");
    closestName[0].style.textDecoration = "line-through";

    let section = button.closest("section");
    let name = section.getElementsByTagName("span");
    let statBox = document.getElementById("basket_box");
    let productStats = statBox.getElementsByClassName("basket_product");
    let bought = document.getElementById("bought_products");
    for(let i= 0; i<productStats.length; i++){
        let productName = productStats[i].getElementsByClassName("basket_product_name");
        if (productName[0].innerText === name[0].innerText){
            productStats[i].style.textDecoration = "line-through";
            bought.appendChild(productStats[i]);
        }
    }
}

function notToBuy(button){

    let section = button.closest("section");
    let name = section.getElementsByTagName("span");
    let statBox = document.getElementById("basket_box");
    let productStats = statBox.getElementsByClassName("basket_product");
    let left = document.getElementById("products_remained");
    for(let i= 0; i<productStats.length; i++){
        let productName = productStats[i].getElementsByClassName("basket_product_name");
        if (productName[0].innerText === name[0].innerText){
            productStats[i].style.textDecoration = "none";
            left.appendChild(productStats[i]);
        }
    }

    let closestDiv = button.closest("div");
    let closestSection = button.closest("section");
    let closestPanel = closestSection.closest("section");
    let closestName = closestPanel.getElementsByTagName("span");
    closestName[0].style.textDecoration = "none";
    button.remove();
    let newBoughtButton = document.createElement("button");
    newBoughtButton.className = "bought";
    newBoughtButton.innerHTML = "Куплено";
    newBoughtButton.dataset.tooltip = "Придбати";
    newBoughtButton.addEventListener("click", function (){
        buyProduct(this);
    });

    let newCancel = document.createElement("button");

    newCancel.className = "delete";

    newCancel.innerHTML = "Х";

    newCancel.dataset.tooltip = "Видалити товар";

    newCancel.addEventListener("click", function (){
        deleteProduct(this);
    });

    newCancel.style.marginLeft = "4px";

    closestDiv.appendChild(newBoughtButton);
    closestDiv.appendChild(newCancel);

    let newPlusProduct = document.createElement("button");

    newPlusProduct.className = "plus";

    newPlusProduct.innerHTML = "+";

    newPlusProduct.dataset.tooltip = "Більше";

    newPlusProduct.addEventListener('click', function (){
        plusProduct(this);
    })

    let newMinusProduct = document.createElement("button");

    newMinusProduct.className = "minus";

    newMinusProduct.innerHTML = "-";

    newMinusProduct.dataset.tooltip = "Менше";

    newMinusProduct.addEventListener('click', function (){
        minusProduct(this);
    })

    let closestProductCounter = closestPanel.getElementsByClassName("product_quantity");

    let closestCounter = closestProductCounter[0].getElementsByClassName("number");

    closestProductCounter[0].appendChild(newMinusProduct);
    closestProductCounter[0].appendChild(newPlusProduct);

    closestProductCounter[0].insertBefore(closestCounter[0], newPlusProduct);

    closestCounter[0].style.marginRight = "4px";

    closestCounter[0].style.marginLeft = "4px";

    isMoreThanOne(newMinusProduct);
}

function editName(name){
    if(name.style.textDecoration != "line-through") {
        let initialName = name.innerHTML;
        let newNameInput = document.createElement("input");
        newNameInput.value = initialName;
        name.replaceWith(newNameInput);

        newNameInput.addEventListener('blur', function () {

            let names = document.getElementsByClassName("product_name");

            let unique = true;

            for (let i = 0; i < names.length; i++) {
                if (names[i].textContent === newNameInput.value) {
                    unique = false;
                    break;
                }
            }

            let newName = "";

            if (unique && newNameInput.value != "") {

                newName = newNameInput.value;

                let statBox = document.getElementById("basket_box");
                let productStats = statBox.getElementsByClassName("basket_product");
                for(let i= 0; i<productStats.length; i++){
                    let productName = productStats[i].getElementsByClassName("basket_product_name");
                    if (productName[0].innerText === initialName){
                        productName[0].innerText = newName;
                    }
                }

            } else{
                newName = initialName;
            }
            let newNameSpan = document.createElement("span");
            newNameSpan.classList.add("product_name");
            newNameSpan.addEventListener("click", function () {
                editName(this);
            })
            newNameSpan.innerText = newName;
            newNameInput.replaceWith(newNameSpan);


        })

        newNameInput.focus();
    }
}

function plusProduct(button){
    let closestDiv = button.closest("div");
    let counter = closestDiv.getElementsByTagName("span");
    let currentNumber = parseInt(counter[0].innerText);
    let minusButton = closestDiv.getElementsByClassName("minus");
    if(currentNumber === 1){
        minusButton[0].style.backgroundColor = "rgb(255 50 50)";
        minusButton[0].style.borderColor = "rgb(255 50 50)";
    }
    let newNumber = currentNumber+1;
    counter[0].innerHTML = newNumber;

    let section = closestDiv.closest("section");
    let name = section.getElementsByTagName("span");
    let statBox = document.getElementById("basket_box");
    let productStats = statBox.getElementsByClassName("basket_product");
    for(let i= 0; i<productStats.length; i++){
        let productName = productStats[i].getElementsByClassName("basket_product_name");
        let productQuantity = productStats[i].getElementsByClassName("basket_products_number");
        if (productName[0].innerText === name[0].innerText){
            productQuantity[0].innerText = newNumber;
        }
    }
}

function minusProduct(button){
    let closestDiv = button.closest("div");
    let counter = closestDiv.getElementsByTagName("span");
    let currentNumber = parseInt(counter[0].innerText);
    if(currentNumber>1) {
        if (currentNumber === 2) {
            button.style.backgroundColor = "indianred";
            button.style.borderColor = "indianred";
        }
        let newNumber = currentNumber - 1;
        counter[0].innerHTML = newNumber;

        let section = closestDiv.closest("section");
        let name = section.getElementsByTagName("span");
        let statBox = document.getElementById("basket_box");
        let productStats = statBox.getElementsByClassName("basket_product");
        for(let i= 0; i<productStats.length; i++){
            let productName = productStats[i].getElementsByClassName("basket_product_name");
            let productQuantity = productStats[i].getElementsByClassName("basket_products_number");
            if (productName[0].innerText === name[0].innerText){
                productQuantity[0].innerText = newNumber;
            }
        }
    }
}

function isMoreThanOne(button){
    let closestDiv = button.closest("div");
    let counter = closestDiv.getElementsByTagName("span");
    let currentNumber = parseInt(counter[0].innerText);
    if(currentNumber > 1){
        button.style.backgroundColor = "red";
        button.style.borderColor = "red";
    }
}