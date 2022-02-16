const categorieUrl = `https://kea-alt-del.dk/t7/api/categories`;

fetch(categorieUrl)
  .then((res) => res.json())
  .then((data) => showCategories(data));

function showCategories(categories) {
  categories.forEach(showCategory);
}

function showCategory(category) {
  const categoryTemplate = document.querySelector("#category-template").content;
  const categoryClone = categoryTemplate.cloneNode(true);

  const categoryParent = document.querySelector("nav ul li:nth-child(2)");
  categoryParent.appendChild(categoryClone);

  const categoryLinkTemplate = document.querySelector(
    "#category-link-template"
  ).content;
  const linkClone = categoryLinkTemplate.cloneNode(true);

  linkClone.querySelector("a").textContent = category.category;
  linkClone.querySelector(
    "a"
  ).href = `productlist.html?category=${category.category}`;

  const linkParent = document.querySelector(".category-list");
  linkParent.appendChild(linkClone);
}
