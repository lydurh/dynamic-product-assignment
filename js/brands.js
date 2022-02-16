const url = "https://kea-alt-del.dk/t7/api/brands";

fetch(url)
  .then((res) => res.json())
  .then((data) => showBrands(data));

let uniqueLetterArray = [];

function showBrands(brands) {
  const sortedBrands = brands.sort((a, b) =>
    a.brandname.toString().localeCompare(b.brandname.toString())
  );

  sortedBrands.forEach((brand) => {
    let firstLetter = brand.brandname.toString().toUpperCase()[0];

    if (!uniqueLetterArray.includes(firstLetter)) {
      uniqueLetterArray.push(firstLetter);
    }
    return uniqueLetterArray;
  });

  uniqueLetterArray.forEach(showLetters);
  brands.forEach(showBrand);
}

function showLetters(letter) {
  const brandLetter = document.querySelector(".brand-letter");

  const template = document.querySelector("#brand-letter-template").content;
  const clone = template.cloneNode(true);

  clone.querySelector(".brand-letter").textContent = letter;

  // change id of container to letter name
  clone.querySelector(".brand-letter-container").id = "brand-letter-" + letter;

  const parent = document.querySelector("#brand-list-container");
  parent.appendChild(clone);
}

function showBrand(brand) {
  const brandTemplate = document.querySelector("#brand-link-template").content;
  const clone = brandTemplate.cloneNode(true);

  brand.brandname = brand.brandname.toString();
  //console.log(brand);

  if (uniqueLetterArray.includes(brand.brandname[0].toString())) {
    clone.querySelector(".brand-link").textContent = brand.brandname;
    clone.querySelector(
      ".brand-link"
    ).href = `productlist.html?brand=${brand.brandname}`;

    const parent = document.querySelector(
      "#brand-letter-" + brand.brandname[0].toString() + " ul"
    );
    parent.appendChild(clone);
  }
}
