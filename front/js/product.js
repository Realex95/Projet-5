const PRODUCT_KEY = "produit";

/** 
 * @argument Retrieving the id via url parameters 
 * */

const idProduct = new URL(window.location.href).searchParams.get("id");

const titleProduct = document.getElementById("title");
const priceProduct = document.getElementById("price");
const descriptionProduct = document.getElementById("description");
const colorsProduct = document.getElementById("colors");
const imgProduct = document.querySelector(".item__img");
const img = document.createElement("img");
const colorTake = document.querySelector("#colors");
const quantityTake = document.querySelector("#quantity");

/** 
 * @argument Get products from api with product id
 * */

function loadProduct() {
  fetch("http://localhost:3000/api/products/" + idProduct)
    .then((res) => {
      return res.json();
    })

    .then(async function (resultatAPI) {
      const article = resultatAPI;
      if (article) {
        toHtml(article);
      }
    })
    .catch((error) => {
      console.error("Erreur lors de la récupération du produit");
    })
}
loadProduct();

/** 
 * @argument Retrieves items from the selected item
 * */

function toHtml(article) {
  const productImg = document.createElement("img");
  document.querySelector(".item__img").appendChild(productImg);
  productImg.src = article.imageUrl;
  productImg.alt = article.altTxt;

  const productName = document.getElementById('title');
  productName.innerHTML = article.name;

  const productPrice = document.getElementById('price');
  productPrice.innerHTML = article.price;

  const productDescription = document.getElementById('description');
  productDescription.innerHTML = article.description;
  article.colors.forEach(element => {
    const productColors = document.createElement("option");
    document.querySelector("#colors").appendChild(productColors);
    productColors.value = element;
    productColors.innerHTML = element;
  });
  addToCart(article);
}

/** 
 * @argument Added item to cart 
 * 
 */

function addToCart(article) {
  const sendCartBtn = document.querySelector("#addToCart");
  sendCartBtn.addEventListener("click", () => {
    if (quantityTake.value > 0 && quantityTake.value <= 100) {

      const choiceColors = colorTake.value;
      const choiceQuantity = quantityTake.value;

      const optionsProduct = {
        idProduct: idProduct,
        colorsProduct: choiceColors,
        quantityProduct: Number(choiceQuantity),
        nameProduct: article.name,
        priceProduct: article.price,
        descriptionProduct: article.description,
        imgProduct: article.imageUrl,
        altImgProduct: article.altTxt
      };

      let localStorageProducts = JSON.parse(localStorage.getItem(PRODUCT_KEY));

      if (localStorageProducts) {
        console.log(localStorageProducts);
        const resultFind = localStorageProducts.find((el) => el.idProduct === idProduct && el.colorsProduct === choiceColors);
        !!resultFind ? resultFind.quantityProduct = parseInt(optionsProduct.quantityProduct) + parseInt(resultFind.quantityProduct) : localStorageProducts.push(optionsProduct);
      } else {
        localStorageProducts = [optionsProduct];
      }
      localStorage.setItem(PRODUCT_KEY, JSON.stringify(localStorageProducts));
      if (window.confirm(`Votre commande de ${choiceQuantity} ${article.name} ${choiceColors} est ajoutée au panier. Pour consulter votre panier, cliquez sur OK`)) {
        window.location.href = "cart.html";
      }
    }
  });
}