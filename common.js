const endpoint = "https://striveschool-api.herokuapp.com/api/product/";
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDM5NjI1ODFhZjZmNjAwMTRiODUyMGQiLCJpYXQiOjE2ODE0ODIzMjgsImV4cCI6MTY4MjY5MTkyOH0.bwxwHlvf2jF1d2QDbsfwVmGqmFbH8R2TLOoFQ0dPmEY";

const getProducts = async () => {

    try {
        showLoader();
        const response = await fetch(endpoint, {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-type": "application/json"
            }
        });
        const products = await response.json();
        hideLoader();
        return products;
    } catch (error) {
        console.log(error);
    }

};

const showLoader = () => {
    const loader = document.querySelector('div.lds-dual-ring');
    loader.style.display = 'block';
};

const hideLoader = () => {
    const loader = document.querySelector('div.lds-dual-ring');
    loader.style.display = 'none';
};
