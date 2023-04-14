    const createCard = () => {
    const bodyCard = '<p id="name"></p>' + 
    '<p id="description"></p>' +
    '<p id="brand"></p>' +
    '<p id="imageUrl"></p>' +
    '<p id="price"></p>';
    const anchor = document.createElement('a');
    anchor.href = '#';
    anchor.style.textDecoration = 'none';
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = bodyCard;
    anchor.append(card);
    return anchor;
};

const setCard = (card, product) => {
    const listItems = card.querySelectorAll('p');
    card.href = 'product.html?id=' + product._id;
    card.target = '_blank';
    listItems.forEach(item => {
        let value;
        switch(item.id) {
            case 'name':
                value = product.name;
                break;
            case 'description':
                value = product.description;
                break;
            case 'brand':
                value = product.brand;
                break;
            case 'imageUrl':
                value = product.imageUrl;
                break;
            case 'price':
                value = product.price;
                break;
        }
        item.innerHTML = `<strong>${item.id}: </strong>${value}`;
    });
    return card;
};

const createPage = (products) => {
    const container = document.querySelector('.container');
    const title = document.querySelector('h1');
    title.style.display = 'block';
    products.forEach(item => {
        let card = createCard();
        card = setCard(card, item);
        container.append(card);
    });
};


const init = async () => {
    let products = await getProducts();
    createPage(products);
};

init();
