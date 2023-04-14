const container = document.querySelector('.container'); 

const getProductData = async (id) => {

    let product;
    try {
        showLoader();
        await fetch(endpoint + id, {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-type": "application/json"
            }
        }).then(response => response.json()).then(data => product = data);

        hideLoader();
        return product;
    } catch (error) {
        console.log(error);
    }

};

const createCard = (product, container) => {
    const productName = document.createElement('p');
    productName.innerText = product.name;
    const productBrand = document.createElement('p');
    productBrand.innerText = product.brand;
    const productDescr = document.createElement('p');
    productDescr.innerText = product.description;
    const productImg = document.createElement('p');
    productImg.innerText = product.imageUrl;
    const productPrice = document.createElement('p');
    productPrice.innerText = product.price;
    container.append(productName, productBrand, productDescr, productImg, productPrice);
};

const init = async () => {
    const params = new URLSearchParams(window.location.search);
    const param = params.get('id');
    let product = await getProductData(param);
    createCard(product, container);

};

init();
