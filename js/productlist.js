const browserUrl = window.location.search;
const urlParams = new URLSearchParams(browserUrl);

const brand = urlParams.get("brand");
const category = urlParams.get("category");
console.log(category);

let url = "";

if (brand) {
  url = `https://kea-alt-del.dk/t7/api/products?brandname=${brand}`;
} else {
  url = `https://kea-alt-del.dk/t7/api/products?category=${category}`;
}

const brandBreadcrumb = document.querySelector(".brand-breadcrumb");
brandBreadcrumb.textContent = brand;
brandBreadcrumb.href = `productlist.html?brand=${brand}`;

fetch(url)
  .then((res) => res.json())
  .then((data) => showProducts(data));

function showProducts(products) {
  const headerTemplate = document.querySelector("#header-template").content;
  const headerClone = headerTemplate.cloneNode(true);

  if (products.length === 0) {
    headerClone.querySelector("h2").textContent = "No products to show";
  } else {
    if (brand) {
      headerClone.querySelector("h2").textContent = products[0].brandname;
    } else {
      headerClone.querySelector("h2").textContent = products[0].category;
    }
  }

  const headerParent = document.querySelector(".products-container");
  headerParent.insertBefore(headerClone, headerParent.childNodes[2]);
  products.forEach(showProduct);
}

function showProduct(product) {
  const productCardTemplate = document.querySelector(
    "#product-list-template"
  ).content;

  const productCardClone = productCardTemplate.cloneNode(true);
  let productCard = productCardClone.querySelector(".product-card");

  if (product.soldout) {
    let soldOutDiv = document.createElement("div");
    soldOutDiv.className = "sold-out";
    let soldOutText = document.createElement("p");
    soldOutText.textContent = "Sold Out";

    soldOutDiv.appendChild(soldOutText);
    productCard.appendChild(soldOutDiv);
  }

  if (product.discount) {
    console.log(product);

    let discountParagraph = document.createElement("p");
    discountParagraph.className = "product-discount";
    discountParagraph.textContent = `-${product.discount}%`;

    productCard.appendChild(discountParagraph);
  }
  productCardClone.querySelector("a").href = `product.html?id=${product.id}`;

  productCardClone.querySelector(
    "img"
  ).src = `https://kea-alt-del.dk/t7/images/jpg/640/${product.id}.jpg`;

  productCardClone.querySelector(".product-list-brand").textContent =
    product.brandname;

  productCardClone.querySelector(".product-list-price").textContent =
    product.price + " kr";

  productCardClone.querySelector(".product-list-type").textContent =
    product.productdisplayname;

  const productParent = document.querySelector(".products-list-container");
  productParent.appendChild(productCardClone);
}
