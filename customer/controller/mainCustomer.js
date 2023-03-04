getItem()
//Hàm gửi yêu cầu lấy dữ liệu từ server
function getItem() {
    apiGetItem()
        .then((response) => {
            const items = response.data.map((item) => {
                return new Item(
                    item.id,
                    item.name,
                    item.price,
                    item.image,
                    item.describe,
                    item.type,
                )
            })
            renderItem(items)
        })
        .catch((error) => {
            alert("API get products error");
        });
}


function renderItem(items) {
    let html = items.reduce((result, item) => {
        return (
            result + `
        <div class="Mycard-item col-6 col-md-4  col-lg-3 mb-4" id="${item.id}">
            <div class="card" style="width: 100%;">
                <div class="Mycard-body">
                    <div class="Mycard-body-describe">
                        <p>${item.describe}</p>
                    </div>
                    <!-- image -->
                    <img src="${item.image}"
                        class="round w-75 mx-auto d-block p-2">
                    <!-- name -->
                    <h5 class="text-center my-3">${item.name}</h5>
                </div>
                <ul class="list-group list-group-flush">
                    <div class="d-flex justify-content-around align-items-center my-3">
                        <!-- price -->
                        <p>$<span>${item.price}</span></p>
                        <!-- type brand -->
                        <p><span class="typeInCard d-block">${item.type}</span></p>
                    </div>
                </ul>
                <div class="my-3 mx-sm-4 mx-2 d-flex justify-content-between align-items-center">
                    <div class="Mycard-number  d-flex">
                        <button class="btn-more"><i class="fa fa-minus"></i></button>
                        <input type="number" class="mx-1 text-center" id="001" value="0">
                        <button class="btn-less"><i class="fa fa-plus"></i></button>
                    </div>
                    <button class="Mycard-add "><i class="fa fa-cart-plus"></i></button>
                </div>
            </div>
        </div>
            `
        )
    }, "")
    getElement("#mainContent").innerHTML = html;
}








//==============Helper===============//
function getElement(selector) {
    return document.querySelector(selector)
}