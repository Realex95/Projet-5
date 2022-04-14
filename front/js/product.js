const idProduct = new URL(window.location.href).searchParams.get("id");

let titleProduct = document.getElementById("title");
let priceProduct = document.getElementById("price");
let descriptionProduct = document.getElementById("description");
let colorsProduct = document.getElementById("colors");
let imgProduct = document.querySelector(".item__img");
let img = document.createElement("img");
const colorTake = document. querySelector("#colors");
const quantityTake = document.querySelector("#quantity");

getProduct();

function getProduct() {
    fetch("http://localhost:3000/api/products/" + idProduct)
    .then((res) => {
        return res.json();
    })

    .then(async function (resultatAPI) {
        const article = resultatAPI;
        if (article){
            populateHtml(article);
        }
    })
    .catch((error) => {
        console.error("Erreur lors de la récupération du produit");
    })
}

function populateHtml(article){
    let productImg = document.createElement("img");
    document.querySelector(".item__img").appendChild(productImg);
    productImg.src = article.imageUrl;
    productImg.alt = article.altTxt;

    let productName = document.getElementById('title');
    productName.innerHTML = article.name;

    let productPrice = document.getElementById('price');
    productPrice.innerHTML = article.price;

    let productDescription = document.getElementById('description');
    productDescription.innerHTML = article.description;

    article.colors.forEach(element => {
        let productColors = document.createElement("option");
        document.querySelector("#colors").appendChild(productColors);
        productColors.value = element;
        productColors.innerHTML = element;
    });

    addToCart(article);
}

addToCart();

function addToCart(article) {
    const sendCartBtn = document.querySelector("#addToCart");

    sendCartBtn.addEventListener("click", (event)=>{
        if (quantityTake.value > 0 && quantityTake.value <=100 && quantityTake.value != 0) {

            let choiceColors = colorTake.value;

            let choiceQuantity = quantityTake.value;
        
            let optionsProduct = {
                idProduct: idProduct,
                colorsProduct: choiceColors,
                quantityProduct: Number(choiceQuantity),
                nameProduct: article.name,
                priceProduct: article.price,
                descriptionProduct: article.description,
                imgProduct: article.imageUrl,
                altImgProduct: article.altTxt
            };

        let localStorageProducts = JSON.parse(localStorage.getItem("produit"));

        const popupConfirmation = () =>{
            if(window.confirm(`Votre commande de ${choiceQuantity} ${article.name} ${choiceColors} est ajoutée au panier. Pour consulter votre panier, cliquez sur OK`)){
                window.location.href ="cart.html";
            }
        }


        if (localStorageProducts) {
            const resultFind = localStorageProducts.find((el) => el.idProduct === idProduct && el.colorsProduct === choiceColors);
            !!resultFind ? resultFind.quantityProduct = parseInt(optionsProduct.quantityProduct) + parseInt(resultFind.quantityProduct) : localStorageProducts.push(optionsProduct);  
        } else {
            localStorageProducts =[optionsProduct];
            }
            localStorage.setItem("produit", JSON.stringify(localStorageProducts));  
            popupConfirmation();
        }
    });
}