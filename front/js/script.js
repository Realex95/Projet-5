/** 
 * @argument Fetch products from api
 * */

 async function getProducts() {
    const products = await fetch('http://localhost:3000/api/products');
    console.log("Produit récupéré")
    return await products.json();
  }
  
  async function loadProducts() {
    const result = await getProducts()
      .then(function (product) {
        product.forEach(products => {
  
          /**
           * @argument Inserting html elements 
           * 
           */
  
          const productLien = document.createElement("a");
          document.querySelector(".items").appendChild(productLien);
          productLien.href = `product.html?id=${products._id}`;
  
          const productArticle = document.createElement("article");
          productLien.appendChild(productArticle);
  
          const productImg = document.createElement("img");
          productArticle.appendChild(productImg);
          productImg.src = products.imageUrl;
          productImg.alt = products.altTxt;
  
          const productName = document.createElement("h3");
          productArticle.appendChild(productName);
          productName.classList.add("productName");
          productName.innerHTML = products.name;
  
          const productDescription = document.createElement("p");
          productArticle.appendChild(productDescription);
          productDescription.classList.add("productName");
          productDescription.innerHTML = products.description;
        });
      });
  
    console.log("Création de produit");
  }
  
  getProducts();
  
  loadProducts();