var btnAdd = document.getElementById("btnAdd");
var productNameInput = document.getElementById("productName");
var productPriceInput = document.getElementById("productPrice");
var productCategoryInput = document.getElementById("productCategory");
var productDescriptionInput = document.getElementById("productDescription");
var productImageInput = document.getElementById("productImage");
var searchInput = document.getElementById("searchInput");
var btnUpdate = document.getElementById("btnUpdate");
var formNotValid = document.getElementById("formNotValid");

var currentIndex = 0;
var productList = [];
if (localStorage.getItem("productContainer")) {
  productList = JSON.parse(localStorage.getItem("productContainer"));
  displayData();
}
btnAdd.addEventListener("click", function () {
  if (
    productNameInput.classList.contains("is-valid") &&
    productPriceInput.classList.contains("is-valid") &&
    productCategoryInput.classList.contains("is-valid") &&
    productDescriptionInput.classList.contains("is-valid") &&
    productImageInput.classList.contains("is-valid")
  ) {
    formNotValid.classList.add("d-none");

    addProduct();
  } else {
    formNotValid.classList.replace("d-none", "d-block");
  }
  clearValidation();
});

searchInput.addEventListener("input", function () {
  searchData();
});

btnUpdate.addEventListener("click", function () {
  updateData();
  clearValidation();
  clearForm();
});

productNameInput.addEventListener("blur", function () {
  validationInputs(this, "msgName");
});
productPriceInput.addEventListener("blur", function () {
  validationInputs(this, "msgPrice");
});
productCategoryInput.addEventListener("blur", function () {
  validationInputs(this, "msgCategory");
});
productDescriptionInput.addEventListener("blur", function () {
  validationInputs(this, "msgDescription");
});
productImageInput.addEventListener("change", function () {
  validationInputs(this, "msgDescription");
});
function validationInputs(element, msgID) {
  var text = element.value;
  var regex = {
    productName: /^[A-Z][a-z]{3,19}$/,
    productPrice: /^\d+(\.\d{1,2})?$/,
    productCategory: /^(TV|screens|mobile|electronic)$/i,
    productDescription: /^.{3,}$/m,
    productImage: /^.*\.(jpg|jpeg|png|gif|bmp|webp|svg|tiff)$/,
  };
  var msg = document.getElementById(msgID);
  if (regex[element.id].test(text)) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
    msg.classList.add("d-none");
  } else {
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");
    msg.classList.replace("d-none", "d-block");
  }
}
function addProduct() {
  product = {
    name: productNameInput.value,
    price: productPriceInput.value,
    category: productCategoryInput.value,
    description: productDescriptionInput.value,
    Image: `images/${productImageInput.files[0]?.name}`,
  };
  productList.push(product);
  localStorage.setItem("productContainer", JSON.stringify(productList));
  displayData();
  clearForm();
}

function clearForm() {
  productNameInput.value = null;
  productPriceInput.value = null;
  productCategoryInput.value = null;
  productDescriptionInput.value = null;
  productImageInput.value = null;
}

function displayData() {
  var container = "";
  for (var i = 0; i < productList.length; i++) {
    container += `  <div class="col">
    <div class="card h-100">
      <img height="150px" class="card-img-top" src="  ${
        productList[i].Image
      }  " alt=" ${productList[i].name} " />
      <div class="card-body">
        <span class="badge bg-info">ID: ${i + 1} </span>
        <h3 class="card-title h6">${productList[i].name}</h3>
        <div class="d-flex flex-column gap-2">
          <h4 class="card-text small">${productList[i].price} </h4>
          <h4 class="card-text small">  ${productList[i].category} </h4>
          <p class="card-text small">  ${productList[i].description} </p>
        </div>
      </div>

      <div class="card-footer text-center d-flex gap-2 justify-content-center">
        <button onclick="deleteItem(${i})" class="btn btn-outline-danger"><i class="fas fa-trash"></i></button>
        <button onclick="setUpdateItem(${i})" class="btn btn-outline-warning"><i class="fas fa-edit"></i></button>
      </div>
    </div>
  </div>`;
  }
  document.getElementById("rowData").innerHTML = container;
}

function deleteItem(index) {
  productList.splice(index, 1);
  localStorage.setItem("productContainer", JSON.stringify(productList));
  displayData();
}

function searchData() {
  var term = searchInput.value;
  var container = "";
  for (var i = 0; i < productList.length; i++) {
    if (productList[i].name.toLowerCase().includes(term.toLowerCase())) {
      container += `  <div class="col">
    <div class="card h-100">
      <img height="150px" class="card-img-top" src="  ${
        productList[i].Image
      }  " alt=" ${productList[i].name} " />
      <div class="card-body">
        <span class="badge bg-info">ID: ${i + 1} </span>
        <h3 class="card-title h6">${productList[i].name.replace(
          term,
          `<span class="bg-info">${term}</span>`
        )}</h3>
        <div class="d-flex flex-column gap-2">
          <h4 class="card-text small">${productList[i].price} </h4>
          <h4 class="card-text small">  ${productList[i].category} </h4>
          <p class="card-text small">  ${productList[i].description} </p>
        </div>
      </div>

      <div class="card-footer text-center d-flex gap-2 justify-content-center">
        <button onclick="deleteItem(${i})" class="btn btn-outline-danger"><i class="fas fa-trash"></i></button>
        <button  class="btn btn-outline-warning"><i class="fas fa-edit"></i></button>
      </div>
    </div>
  </div>`;
    }
    document.getElementById("rowData").innerHTML = container;
  }
}

function setUpdateItem(index) {
  currentIndex = index;
  productNameInput.value = productList[index].name;
  productPriceInput.value = productList[index].price;
  productCategoryInput.value = productList[index].category;
  productDescriptionInput.value = productList[index].description;

  btnAdd.classList.add("d-none");
  btnUpdate.classList.replace("d-none", "d-block");
}

function updateData() {
  // product = {
  //   name: productNameInput.value,
  //   price: productPriceInput.value,
  //   category: productCategoryInput.value,
  //   description: productDescriptionInput.value,
  //   Image: `images/${productImageInput.files[0]?.name}`,
  // };

  // productList.splice(currentIndex, 1, product);
  if (productNameInput.value) {
    productList[currentIndex].name = productNameInput.value;
  }
  if (productPriceInput.value) {
    productList[currentIndex].price = productPriceInput.value;
  }
  if (productCategoryInput.value) {
    productList[currentIndex].category = productCategoryInput.value;
  }
  if (productDescriptionInput.value) {
    productList[currentIndex].description = productDescriptionInput.value;
  }
  if (productImageInput.files[0]?.name) {
    productList[
      currentIndex
    ].Image = `images/${productImageInput.files[0].name}`;
  }
  displayData();
  localStorage.setItem("productContainer", JSON.stringify(productList));
  btnUpdate.classList.replace("d-block", "d-none");
  btnAdd.classList.replace("d-none", "d-block");
}
function clearValidation() {
  productNameInput.classList.remove("is-valid");
  productPriceInput.classList.remove("is-valid");
  productCategoryInput.classList.remove("is-valid");
  productDescriptionInput.classList.remove("is-valid");
  productImageInput.classList.remove("is-valid");
}
