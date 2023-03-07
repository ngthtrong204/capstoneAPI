const URL = "https://63f6e87eab76703b15c677f7.mockapi.io/api/products";

function apiGetProducts(searchValue) {
     return axios({
        method: "GET",
        url: URL,
        params: {
            name: searchValue || undefined,
        },
    });
}

function apiCreateProduct(product) {
    return axios({
        method: "POST",
        url: URL,
        data: product,
    });
}

function apiDeleteProduct(productId) {
    return axios({
        method: "DELETE",
        url: `${URL}/${productId}`,
       
    });
}

function apiGetProductById(productId) {
    return axios({
        method: "GET",
        url: `${URL}/${productId}`,
       
    });
}

function apiUpdateProduct(productId, product){
    return axios({
        method: "PUT",
        url: `${URL}/${productId}`,
        data: product,
       
    });
}