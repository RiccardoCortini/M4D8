const addProduct = async (name, desc, brand, imgUrl, price) => {
  const myProduct = {
    name: name,
    description: desc,
    brand: brand,
    imageUrl: imgUrl,
    price: price,
  };

  try {
    showLoader();
    const response = await fetch(endpoint, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(myProduct),
    });
    const result = await response.json();
    hideLoader();
    return result;
  } catch (error) {
    console.log(error);
  }
};

const resetFields = () => {
  document.getElementById("name").value = "";
  document.getElementById("description").value = "";
  document.getElementById("brand").value = "";
  document.getElementById("imageUrl").value = "";
  document.getElementById("price").value = "";
};

const createProductList = (products, section) => {
    const list = document.createElement('ol');
    products.forEach((item) => {
        const listItem = document.createElement('li');
        const span = document.createElement('span');
        span.classList.add('margin');
        span.innerText = item.name;
        const editButton = document.createElement("button");
        editButton.innerText = "Modifica";
        editButton.classList.add('margin');
        editButton.addEventListener("click", () => {
          openDialogBox(item);
        });
        const deleteButton = document.createElement("button");
        deleteButton.innerText = "Cancella";
        deleteButton.classList.add('margin');
        listItem.append(span, editButton, deleteButton);
        deleteButton.addEventListener("click", async () => {
        if (confirm("Sei sicuro di eliminare il prodotto selezionato?")) {
            await deleteProduct(item._id);
            window.location.reload();
        }
        });
        list.append(listItem);
  });
  section.append(list);
};

const deleteProduct = async (id) => {
  try {
    showLoader();
    await fetch(endpoint + id, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json",
      },
      method: "DELETE",
    });
    hideLoader();
  } catch (error) {
    console.log(err);
  }
};

const checkInputs = (inputs) => {
  for (let input of inputs) {
    if (input.value === "") {
      return false;
    }
  }
  return true;
};

const checkPrice = (input) => {
  if (isNaN(input.value)) {
    return false;
  } else {
    return true;
  }
};

const checkData = (inputs) => {
  let priceInput;
  for(let input of inputs) {
    if (input.id.includes("price")) {
      priceInput = input;
    }
  }
  if (checkInputs(inputs) && checkPrice(priceInput)) {
    return true;
  } else {
    if (!checkInputs(inputs)) {
      return "Tutti i campi devono essere compilati!";
    } else {
      return "Verifica il prezzo inserito per il prodotto";
    }
  }
};

const getInputValue = (inputs, id) => {
    let result;
    for(let input of inputs) {
      if (input.id === id) {
        result = input.value;
      }
    }
    return result;
};

const openDialogBox = (product) => {
    const dialog = document.getElementById('dialogBox');
    setDialogBoxValues(dialog, product);
    setDialogBoxListeners(dialog, product);
    dialog.show();
};

const setDialogBoxValues = (dialogBox, product) => {
  const inputs = dialogBox.getElementsByTagName('input');
  for(let input of inputs) {
    switch(input.id) {
      case 'd-name':
        input.value = product.name;
        break;
      case 'd-description':
        input.value = product.description;
        break;
      case 'd-brand':
        input.value = product.brand;
        break;
      case 'd-imageUrl':
        input.value = product.imageUrl;
        break;
      case 'd-price':
        input.value = product.price;
        break;
    }
  }
};

const getDialogBoxValues = (dialogBox, product) => {
  const inputs = dialogBox.getElementsByTagName('input');
  for(let input of inputs) {
    switch(input.id) {
      case 'd-name':
        product.name = input.value;
        break;
      case 'd-description':
        product.description = input.value;
        break;
      case 'd-brand':
        product.brand = input.value;
        break;
      case 'd-imageUrl':
        product.imageUrl = input.value;
        break;
      case 'd-price':
        product.price = input.value;
        break;
    }
  }
  return product;
};

const setDialogBoxListeners = (dialogBox, product) => {
  const saveButton = document.querySelector("#dialogBox > #saveButton");
  saveButton.addEventListener('click', async () => {
    const inputs = document.querySelectorAll("#dialogBox > input");
    const check = checkData(inputs);
    if (check === true) {
      await changeProduct(dialogBox, product);
      dialogBox.close();
      window.location.reload();
    } else {
      alert(check);
    }
  });
  const closeButton = document.querySelector("#dialogBox > #closeButton");
  closeButton.addEventListener('click', () => {
    dialogBox.close();
  });
};

const changeProduct = async (dialogBox, product) => {
  const id = product._id;
  const myProduct = getDialogBoxValues(dialogBox, product);

  try {
      showLoader();
      await fetch(endpoint + id, {
          headers: {
              "Authorization": `Bearer ${token}`,
              "Content-type": "application/json"
          },
          method: 'PUT',
          body: JSON.stringify(myProduct),
      });
      hideLoader();
  } catch (error) {
      console.log(error);
  }
};

const init = async () => {
  const addButton = document.getElementById("addProduct");
  addButton.addEventListener("click", async () => {
    const inputs = document.querySelectorAll(".form > input");
    const check = checkData(inputs);
    if (check === true) {
      const name = getInputValue(inputs, 'name');
      const description = getInputValue(inputs, 'description');
      const brand = getInputValue(inputs, 'brand');
      const imgUrl = getInputValue(inputs, 'imageUrl');
      const price = getInputValue(inputs, 'price');
      const data = await addProduct(
        name,
        description,
        brand,
        imgUrl,
        parseFloat(price)
      );
      resetFields();
      window.location.reload();
    } else {
      alert(check);
    }
  });
  const products = await getProducts();
  const section = document.querySelector('.productList');
  createProductList(products, section);
};

init();
