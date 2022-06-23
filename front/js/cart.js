const PRODUCT_KEY = "produit";

const itemCart = document.querySelector("#cart__items");

/**
 * Displays cart information
 */
function toCart() {
  const localStorageProducts = JSON.parse(localStorage.getItem(PRODUCT_KEY));
  if (localStorageProducts === null || localStorageProducts === 0 ) {
    itemCart.innerHTML = `<p>Votre panier est vide</p>`;
  } else {

    for (let product in localStorageProducts) {

      const productArticle = document.createElement("article");
      document.querySelector("#cart__items").appendChild(productArticle);
      productArticle.className = "cart__item";
      productArticle.setAttribute('data-id', localStorageProducts[product].idProduct);
      productArticle.setAttribute('data-color', localStorageProducts[product].colorsProduct);

      const productDivImg = document.createElement("div");
      productArticle.appendChild(productDivImg);
      productDivImg.className = "cart__item__img";

      const productImg = document.createElement("img");
      productDivImg.appendChild(productImg);
      productImg.src = localStorageProducts[product].imgProduct;
      productImg.alt = localStorageProducts[product].altImgProduct;

      const productItemContent = document.createElement("div");
      productArticle.appendChild(productItemContent);
      productItemContent.className = "cart__item__content";

      const productItemContentDescription = document.createElement("div");
      productItemContent.appendChild(productItemContentDescription);
      productItemContentDescription.className = "cart__item__content__description";

      const productTitle = document.createElement("h2");
      productItemContentDescription.appendChild(productTitle);
      productTitle.innerHTML = localStorageProducts[product].nameProduct;

      const productColor = document.createElement("p");
      productTitle.appendChild(productColor);
      productColor.innerHTML = localStorageProducts[product].colorsProduct;
      productColor.style.fontSize = "20px";

      const productPrice = document.createElement("p");
      productItemContentDescription.appendChild(productPrice);
      productPrice.innerHTML = localStorageProducts[product].priceProduct + " €";

      const productItemContentSettings = document.createElement("div");
      productItemContent.appendChild(productItemContentSettings);
      productItemContentSettings.className = "cart__item__content__settings";

      const productItemContentSettingsQuantity = document.createElement("div");
      productItemContentSettings.appendChild(productItemContentSettingsQuantity);
      productItemContentSettingsQuantity.className = "cart__item__content__settings__quantity";

      const productQte = document.createElement("p");
      productItemContentSettingsQuantity.appendChild(productQte);
      productQte.innerHTML = "Qté : ";

      const productQuantity = document.createElement("input");
      productItemContentSettingsQuantity.appendChild(productQuantity);
      productQuantity.value = localStorageProducts[product].quantityProduct;
      productQuantity.className = "itemQuantity";
      productQuantity.setAttribute("type", "number");
      productQuantity.setAttribute("min", "1");
      productQuantity.setAttribute("max", "100");
      productQuantity.setAttribute("name", "itemQuantity");

      const productItemContentSettingsDelete = document.createElement("div");
      productItemContentSettings.appendChild(productItemContentSettingsDelete);
      productItemContentSettingsDelete.className = "cart__item__content__settings__delete";

      const productSupprimer = document.createElement("p");
      productItemContentSettingsDelete.appendChild(productSupprimer);
      productSupprimer.className = "deleteItem";
      productSupprimer.innerHTML = "Supprimer";
    }
  }
    
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    console.log(localStorageProducts);
    
    const totalQuantityResult = localStorageProducts.map((product) => +product.quantityProduct).reduce(reducer, 0);
    const totalPriceResult = localStorageProducts.map((product) => +product.priceProduct * +product.quantityProduct).reduce(reducer, 0);

    document.querySelector("#totalQuantity").innerHTML += `${totalQuantityResult}`;
    document.querySelector("#totalPrice").innerHTML += `${totalPriceResult}`;

}
toCart();

function updateQuantity() {
  const updatedLocalStorage = JSON.parse(localStorage.getItem(PRODUCT_KEY))
  const itemQuantity = document.querySelectorAll(".itemQuantity");
  itemQuantity.forEach((item) => {
    item.addEventListener("change", (event) => {
      event.preventDefault();

      const elementArticle = item;
      while (elementArticle.getAttribute('data-id') === null) {
        elementArticle = elementArticle.parentElement;
      }

      const idProduct = elementArticle.getAttribute('data-id');
      const colorsProduct = elementArticle.getAttribute('data-color');
      updatedLocalStorage.map(product => { 
          if(idProduct === product.idProduct && colorsProduct === product.colorsProduct){
            product.quantityProduct = item.valueAsNumber;
          }
          return product;
        });
      localStorage
        .setItem(PRODUCT_KEY, JSON.stringify(updatedLocalStorage));
    })
  })
}
updateQuantity();

/**
 * @argument EventListener that deletes a product on each click
 */

function addDeleteProductEventListeners() {
  const localStorageProducts = JSON.parse(localStorage.getItem(PRODUCT_KEY));
  document.querySelectorAll(".deleteItem").forEach((button) => {
    button.addEventListener("click", () => {
      const article = button.closest('article');
      localStorageProducts.map(product => {
        if (localStorageProducts.idProduct === article.dataset.id && localStorageProducts.colorsProduct === article.dataset.color) {
          article.remove();
        }
        return product;
      });
    localStorage
      .setItem(PRODUCT_KEY, JSON.stringify(localStorageProducts));
      alert("Ce produit a bien été supprimé du panier");
    })
  });
}
addDeleteProductEventListeners();

/** 
 * @argument Creating a form with regex 
 * */
function createForm() {

  const form = document.querySelector(".cart__order__form");

  form.firstName.addEventListener('change', function () {
    validFirstName(this);
  });

  const validFirstName = function (inputFirstName) {
    let message;
    const valide = false;
    if (inputFirstName.value.length < 3) {
      message = 'Le prénom doit contenir au moins 3 caractère';
    } else if (!/[A-Z]/.test(inputFirstName.value)) {
      message = 'le prénom doit contenir une majuscule';
    } else if (!/[a-z]/.test(inputFirstName.value)) {
      message = 'le prénom doit contenir une minuscule';
    } else if (/[0-9]/.test(inputFirstName.value)) {
      message = 'le prénom ne doit pas contenir de chiffre';
    } else {
      message = 'le prénom est valide';
      valide = true;
    }

    const firstnameErrorMsg = inputFirstName.nextElementSibling;
    if (valide) {
      firstnameErrorMsg.innerHTML = 'Prénom valide';
      firstnameErrorMsg.classList.add('test-success');
      firstnameErrorMsg.classList.remove('test-success');
    } else {
      firstnameErrorMsg.innerHTML = message;
      firstnameErrorMsg.classList.add('test-danger');
      firstnameErrorMsg.classList.remove('test-success');
    }
  };

  form.lastName.addEventListener('change', function () {
    validLastName(this);
  });

  const validLastName = function (inputLastName) {
    let message;
    const valide = false;
    if (inputLastName.value.length < 3) {
      message = 'le nom doit contenir au moins 3 caractère';
    } else if (!/[A-Z]/.test(inputLastName.value)) {
      message = 'le nom doit contenir une majuscule';
    } else if (!/[a-z]/.test(inputLastName.value)) {
      message = 'le nom doit contenir une minuscule';
    } else if (/[0-9]/.test(inputLastName.value)) {
      message = 'le nom ne doit pas contenir de chiffre';
    } else {
      message = 'le nom est valide';
      valide = true;
    }

    const lastNameErrorMsg = inputLastName.nextElementSibling;
    lastNameErrorMsg.innerHTML = message;
    if (valide) {
      lastNameErrorMsg.classList.add('test-success');
      lastNameErrorMsg.classList.remove('test-danger');
    } else {
      lastNameErrorMsg.classList.add('test-danger');
      lastNameErrorMsg.classList.remove('test-success');
    }

  };

  form.address.addEventListener('change', function () {
    validAddress(this);
  });

  const validAddress = function (inputAdress) {
    const addressReg = new RegExp("^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+");
    const testAddress = addressReg.test(inputAdress.value);
    if (testAddress) {
      const addressErrorMsg = inputAdress.nextElementSibling;
      addressErrorMsg.innerHTML = 'Adresse valide';
      addressErrorMsg.classList.add('test-success');
      addressErrorMsg.classList.remove('test-danger');
    } else {
      addressErrorMsg.innerHTML = 'Adresse non valide';
      addressErrorMsg.classList.add('test-danger');
      addressErrorMsg.classList.remove('test-success');
    }
  };

  form.city.addEventListener('change', function () {
    validCity(this);
  });

  const validCity = function (inputCity) {
    let message;
    const valide = false;
    if (inputCity.value.length < 3) {
      message = 'la ville doit contenir au moins 3 caractère';
    } else if (!/[A-Z]/.test(inputCity.value)) {
      message = 'la ville doit contenir une majuscule';
    } else if (!/[a-z]/.test(inputCity.value)) {
      message = 'la ville doit contenir une minuscule';
    } else if (/[0-9]/.test(inputCity.value)) {
      message = 'la ville ne doit pas contenir de chiffre';
    } else {
      message = 'la ville est valide';
      valide = true;
    }

    const cityErrorMsg = inputCity.nextElementSibling;
    if (valide) {
      cityErrorMsg.innerHTML = 'Ville valide';
      cityErrorMsg.classList.add('test-success');
      cityErrorMsg.classList.remove('test-success');
    } else {
      cityErrorMsg.innerHTML = message;
      cityErrorMsg.classList.add('test-danger');
      cityErrorMsg.classList.remove('test-success');
    }
  };

  form.email.addEventListener('change', function () {
    validEmail(this);
  });

  const validEmail = function (inputEmail) {
    const emailReg = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$', 'g');
    const testEmail = emailReg.test(inputEmail.value);
    if (testEmail) {
      const emailErrorMsg = inputEmail.nextElementSibling;
      emailErrorMsg.innerHTML = 'Email Valide';
      emailErrorMsg.classList.add('test-success');
      emailErrorMsg.classList.remove('test-success');
    } else {
      emailErrorMsg.innerHTML = 'Email non valide';
      emailErrorMsg.classList.add('test-danger');
      emailErrorMsg.classList.remove('test-success');
    }
  };
}
createForm();

function postForm() {
  const submitOrder = document.getElementById("order");

  submitOrder.addEventListener("click", (event) => {
    console.log(event);
    const inputName = document.getElementById('firstName');
    const inputLastName = document.getElementById('lastName');
    const inputAdress = document.getElementById('address');
    const inputCity = document.getElementById('city');
    const inputMail = document.getElementById('email');
    /** 
     * @argument get form data into an object 
     * */

    const order = {
      contact: {
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
        document.location.href = "confirmation.html?orderId=" + data.orderId;
        localStorage.clear();
      })
      .catch((err) => {
        console.error(err);
      });
  })
}
postForm();