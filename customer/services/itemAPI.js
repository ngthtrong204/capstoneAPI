const URL = "https://63ecb8e4be929df00cb0ba50.mockapi.io/api/capstoneAPI";


function apiGetItem(){
    return axios({
        method: "GET",
        url: URL,
    })
}   