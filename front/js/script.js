getProducts();

creationProducts();

async function getProducts() {
    let products = await fetch('http://localhost:3000/api/products');
    console.log("Produit récupéré")
    return  await products.json();
}

async function creationProducts() {
    let result = await getProducts()
    .then(function (product) {
        product.forEach(products => {
           let productLien = document.createElement("a");
           document.querySelector(".items").appendChild(productLien);
           productLien.href = `product.html?id=${products._id}`;

           let productArticle = document.createElement("article");
           productLien.appendChild(productArticle);

           let productImg = document.createElement("img");
           productArticle.appendChild(productImg);
           productImg.src = products.imageUrl;
           productImg.alt = products.altTxt;

           let productName = document.createElement("h3");
           productArticle.appendChild(productName);
           productName.classList.add("productName");
           productName.innerHTML = products.name;

           let productDescription = document.createElement("p");
           productArticle.appendChild(productDescription);
           productDescription.classList.add("productName");
           productDescription.innerHTML = products.description;    
        });
    });
    
    console.log("Création de produit");
}

