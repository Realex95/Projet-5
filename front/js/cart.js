let localStorageProducts = JSON.parse(localStorage.getItem("produit"));
const itemCart = document.querySelector("#cart__items");

function getCart(){
if (localStorageProducts === null || localStorageProducts == 0) {
    const emptyCart = `<p>Votre panier est vide</p>`;
    itemCart.innerHTML = emptyCart;
}
else {

for (let product in localStorageProducts) {

    let productArticle = document.createElement("article");
    document.querySelector("#cart__items").appendChild(productArticle);
    productArticle.className = "cart__item";
    productArticle.setAttribute('data-id', localStorageProducts[product].idProduct);
    productArticle.setAttribute('data-color', localStorageProducts[product].colorsProduct);


    let productDivImg = document.createElement("div");
    productArticle.appendChild(productDivImg);
    productDivImg.className = "cart__item__img";

    let productImg = document.createElement("img");
    productDivImg.appendChild(productImg);
    productImg.src = localStorageProducts[product].imgProduct;
    productImg.alt = localStorageProducts[product].altImgProduct;

    let productItemContent = document.createElement("div");
    productArticle.appendChild(productItemContent);
    productItemContent.className = "cart__item__content";

    let productItemContentDescription = document.createElement("div");
    productItemContent.appendChild(productItemContentDescription);
    productItemContentDescription.className = "cart__item__content__description";

    let productTitle = document.createElement("h2");
    productItemContentDescription.appendChild(productTitle);
    productTitle.innerHTML = localStorageProducts[product].nameProduct;

    let productColor = document.createElement("p");
    productTitle.appendChild(productColor);
    productColor.innerHTML = localStorageProducts[product].colorsProduct;
    productColor.style.fontSize = "20px";

    let productPrice = document.createElement("p");
    productItemContentDescription.appendChild(productPrice);
    productPrice.innerHTML = localStorageProducts[product].priceProduct + " €";

    let productItemContentSettings = document.createElement("div");
    productItemContent.appendChild(productItemContentSettings);
    productItemContentSettings.className = "cart__item__content__settings";

    let productItemContentSettingsQuantity = document.createElement("div");
    productItemContentSettings.appendChild(productItemContentSettingsQuantity);
    productItemContentSettingsQuantity.className = "cart__item__content__settings__quantity";


    let productQte = document.createElement("p");
    productItemContentSettingsQuantity.appendChild(productQte);
    productQte.innerHTML = "Qté : ";

    let productQuantity = document.createElement("input");
    productItemContentSettingsQuantity.appendChild(productQuantity);
    productQuantity.value = localStorageProducts[product].quantityProduct;
    productQuantity.className = "itemQuantity";
    productQuantity.setAttribute("type", "number");
    productQuantity.setAttribute("min", "1");
    productQuantity.setAttribute("max", "100");
    productQuantity.setAttribute("name", "itemQuantity");

    let productItemContentSettingsDelete = document.createElement("div");
    productItemContentSettings.appendChild(productItemContentSettingsDelete);
    productItemContentSettingsDelete.className = "cart__item__content__settings__delete";

    let productSupprimer = document.createElement("p");
    productItemContentSettingsDelete.appendChild(productSupprimer);
    productSupprimer.className = "deleteItem";
    productSupprimer.innerHTML = "Supprimer";
}
}}
getCart();

function getTotals(){

    let itemQuantity = document.getElementsByClassName('itemQuantity');
    let totalQuantity = 0;

    let totalPrice = 0;

    for (let i = 0;  i <  itemQuantity.length; ++i) {
        totalQuantity += itemQuantity[i].valueAsNumber;
    }

    let productTotalQuantity = document.getElementById('totalQuantity');
    productTotalQuantity.innerHTML = totalQuantity;

    for (let i = 0;  i <  itemQuantity.length; ++i) {
        totalPrice += (itemQuantity[i].valueAsNumber * localStorageProducts[i].priceProduct);
    }

    let productTotalPrice = document.getElementById('totalPrice');
    productTotalPrice.innerHTML = totalPrice;

}
getTotals();

function modificationQuantity() {
    let itemQuantity = document.querySelectorAll(".itemQuantity");

    itemQuantity.forEach((item) => {
        item.addEventListener("change" , (event) => {
            event.preventDefault();

            let elementArticle = item;
            while(elementArticle.getAttribute('data-id') === null){
                elementArticle = elementArticle.parentElement;
            }

            let idProduct = elementArticle.getAttribute('data-id');
            let colorsProduct = elementArticle.getAttribute('data-color');

                let itemsQuantity = item.valueAsNumber;
                localStorageProducts
                .filter((product) => idProduct === product.idProduct && colorsProduct === product.colorsProduct)
                .forEach(product => product.quantityProduct = itemsQuantity);

            localStorage
            .setItem("produit", JSON.stringify(localStorageProducts));
            getTotals();
        })
    })
}
modificationQuantity();

function deleteProduct() {
    let deleteButton = document.querySelectorAll(".deleteItem");

    for (let i = 0; i < deleteButton.length; i++){
        deleteButton[i].addEventListener("click" , (event) => {
            event.preventDefault();

            let idProductDelete = localStorageProducts[i].idProduct;
            let colorsProductDelete = localStorageProducts[i].colorsProduct;

            localStorageProducts = localStorageProducts.filter( element => element.idProduct !== idProductDelete || element.colorsProduct !== colorsProductDelete );

            localStorage.setItem("produit", JSON.stringify(localStorageProducts));

            alert("Ce produit a bien été supprimé du panier");

            location.reload();
            
        })
    }
}

deleteProduct();

function getForm() {

    let form = document.querySelector(".cart__order__form");

    let charactereReg = new RegExp("^[a-zA-Z ,.'-]+$");

    form.firstName.addEventListener('change', function() {
        validFirstName(this);
    });

    const validFirstName = function(inputFirstName) {
        let firstNameErrorMsg = inputFirstName.nextElementSibling;
        firstNameErrorMsg.innerHTML = 'Champ obligatoire';
        if (charactereReg.test(inputFirstName.value)) {
            firstNameErrorMsg.innerHTML = '';
        }
    };

    form.lastName.addEventListener('change', function() {
        validLastName(this);
    });

    const validLastName = function(inputLastName) {
        let lastNameErrorMsg = inputLastName.nextElementSibling;
        lastNameErrorMsg.innerHTML = 'Champ obligatoire';
        if (charactereReg.test(inputLastName.value)) {
            lastNameErrorMsg.innerHTML = '';
        }
    };

    form.address.addEventListener('change', function() {
        validAddress(this);
    });

    let addressReg = new RegExp("^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+");

    const validAddress = function(inputAddress) {
        let addressErrorMsg = inputAddress.nextElementSibling;
        addressErrorMsg.innerHTML = 'Champ obligatoire';
        if (addressReg.test(inputAddress.value)) {
            addressErrorMsg.innerHTML = '';
        }
    };

    form.city.addEventListener('change', function() {
        validCity(this);
    });

    const validCity = function(inputCity) {
        let cityErrorMsg = inputCity.nextElementSibling;
        cityErrorMsg.innerHTML = 'Champ obligatoire';
        if (charactereReg.test(inputCity.value)) {
            cityErrorMsg.innerHTML = '';
        }
    };

    form.email.addEventListener('change', function() {
        validEmail(this);
    });

    let emailReg = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$');

    const validEmail = function(inputEmail) {
        let emailErrorMsg = inputEmail.nextElementSibling;
        emailErrorMsg.innerHTML = 'Champ obligatoire';
        if (emailReg.test(inputEmail.value)) {
            emailErrorMsg.innerHTML = '';
        }
    };
    }
getForm();

function postForm(){
    const submitOrder = document.getElementById("order");

    submitOrder.addEventListener("click", (event)=>{
        console.log(event);
        let inputName = document.getElementById('firstName');
        let inputLastName = document.getElementById('lastName');
        let inputAdress = document.getElementById('address');
        let inputCity = document.getElementById('city');
        let inputMail = document.getElementById('email');

        const order = {
            contact : {
                firstName: inputName.value,
                lastName: inputLastName.value,
                address: inputAdress.value,
                city: inputCity.value,
                email: inputMail.value,
            },
            products: localStorageProducts.map(product => product.idProduct)
        } 

        const options = {
            method: 'POST',
            body: JSON.stringify(order),
            headers: {
                'Accept': 'application/json', 
                "Content-Type": "application/json" 
            },
        };

        console.log(order);

        fetch("http://localhost:3000/api/products/order", options)
        .then((response) => response.json())
        .then((data) => {
            localStorage.setItem("orderId", data.orderId);

            document.location.href = "confirmation.html?orderId="+data.orderId;
        })
        .catch((err) => {
            console.error(err);
        });
    })
}
postForm();
