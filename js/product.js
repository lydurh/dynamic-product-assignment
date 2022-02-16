const browserUrl = window.location.search;
const urlParams = new URLSearchParams(browserUrl);
console.log(urlParams.get("id"));

const url = `https://kea-alt-del.dk/t7/api/products/${urlParams.get("id")}`;

fetch(url)
  .then((res) => res.json())
  .then((data) => showProduct(data));

function showProduct(product) {
  const brandBreadcrumb = document.querySelector(".brand-breadcrumb");
  brandBreadcrumb.textContent = product.brandname;
  brandBreadcrumb.href = `/productlist.html?brand=${product.brandname}`;

  const productBreadcrumb = document.querySelector(".product-breadcrumb");
  productBreadcrumb.textContent = product.productdisplayname;
  productBreadcrumb.href = `product.html?id=${product.id}`;
  document.querySelector("title").textContent = product.productdisplayname;
  if (product.soldout) {
    let soldOutParagraph = document.createElement("p");
    soldOutParagraph.textContent = "This product is unfortunately sold out";

    document
      .querySelector(".product-form-container")
      .appendChild(soldOutParagraph);

    document.querySelector("button").disabled = true;
  }

  document.querySelector(
    ".product-details-container .product-brand"
  ).textContent = product.brandname;

  document.querySelector(
    ".product-details-container a"
  ).href = `productlist.html?brand=${product.brandname}`;

  document.querySelector(
    ".product-details-container .product-name"
  ).textContent = product.productdisplayname;

  document.querySelector(
    ".product-details-container .product-price"
  ).textContent = product.price + " kr";

  document.querySelector(
    ".product-container img"
  ).src = `https://kea-alt-del.dk/t7/images/jpg/1000/${product.id}.jpg`;

  document.querySelector(".product-container img").alt =
    product.productdisplayname;

  if (product.colour1 === "NA" || product.colour1 === "") {
    document.querySelector(
      ".product-details-container .product-color"
    ).textContent = product.basecolour;
  } else {
    document.querySelector(
      ".product-details-container .product-color"
    ).textContent = product.basecolour + ", " + product.colour1;
  }
}
