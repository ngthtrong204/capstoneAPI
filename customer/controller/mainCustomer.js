const URL = "https://63ecb8e4be929df00cb0ba50.mockapi.io/api/capstoneAPI";
getItem(URL)
createOption()
let cartList = getCartList()
renderItemInCart(cartList)
quantityInCart()




//====================Display==========================================/

//Hàm gửi yêu cầu lấy dữ liệu từ server
function getItem(URL) {
    apiGetItem(URL)
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

//Hàm tạo option dựa theo thuộc tính type của ob
function createOption() {
    let html = ` <option selected value="default">All brand</option>`;
    apiGetItem(URL)
        .then((response) => {
            let typeArr = []
            response.data.forEach((item => {
                let exist = false;
                typeArr.forEach((brandName) => {
                    if (item.type == brandName) {
                        exist = true;
                    }
                })
                if (!exist) {
                    typeArr.push(item.type)
                };
            }))
            for (let index = 0; index < typeArr.length; index++) {
                html += ` <option value="${typeArr[index]}">${typeArr[index]}</option>`
            }
            getElement("#filterSelect").innerHTML = html;
        })



}
//Hàm lọc sản phẩm theo
function filterItem() {
    const value = getElement("#filterSelect").value
    if (value == "default") {
        getItem(URL)
        return;
    }
    getItem(`${URL}?type=${value}`)

}
function renderItem(items) {
    let html = items.reduce((result, item) => {
        return (
            result + `
        <div class="Mycard-item col-6 col-md-4  col-lg-3 mb-4" >
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
                        <p><span class="typeInCard  d-block">${item.type}</span></p>
                    </div>
                </ul>
                <div class="my-3 mx-sm-4 mx-2 d-flex justify-content-between align-items-center">
                    <div class="Mycard-number  d-flex">
                        <button class="btn-less" onclick="minusButton(${item.id})"><i class="fa fa-minus"></i></button>
                        <input type="number" class="mx-1 text-center" id="${item.id}" value="0">
                        <button class="btn-more"  onclick="plusButton(${item.id})"><i class="fa fa-plus"></i></button>
                    </div>
                    <button class="Mycard-add " onclick="getDataItem(${item.id})" ><i class="fa fa-cart-plus"></i></button>
                </div>
            </div>
        </div>
            `
        )
    }, "")
    getElement("#mainContent").innerHTML = html;
}
//===========================plus minus===================================/

function plusButton(id) {
    let quantity = +document.getElementById(id).value
    if (quantity >= 10) {
        return quantity;
    }
    quantity += 1;
    document.getElementById(id).value = quantity;
    return quantity
}
function minusButton(id) {
    let quantity = +document.getElementById(id).value
    if (quantity <= 0) {
        return quantity;
    }
    quantity -= 1;
    document.getElementById(id).value = quantity
    return quantity
}
function plusButtonInCart(id) {
    let quantity = plusButton(id)
    cartList.forEach((item) => {
        if (item.id == id) {
            item.quantity = quantity
            document.getElementById(`sumItem-${id}`).innerHTML = item.sumPrice()
            storageCartList()
        }
    })
    quantityInCart()

}
function minusButtonInCart(id) {
    let quantity = minusButton(id)
    if (quantity==0){
        deleteItemInCart(id)
        return
    }

    cartList.forEach((item) => {
        if (item.id == id) {
            item.quantity = quantity
            document.getElementById("sumItem-" + id).innerHTML = item.sumPrice()
            storageCartList()
        }
    })
    quantityInCart()

}




//==============================Cart================================/




function getDataItem(id) {
    let quantity = +document.getElementById(id).value
    if (!quantity) {
        alert("Bạn chưa chọn số lượng")
        return
    }
    apiGetItem(`${URL}/${id}`)
        .then((response) => {
            let id = 1000 + response.data.id  //1000 nhằm để id không bị trùng lập với item ngoài màng hình hiển thị
            exist = false
            cartList.forEach((item) => {
                if (item.id == id) {
                    exist = true
                    if ((item.quantity + quantity) <= 10) {

                        item.quantity += quantity
                        renderItemInCart(cartList)
                    } else {
                        alert("Giỏ chỉ nhận số lượng 10c/sản phẩm")
                    }
                }
            })
            if (!exist) {
                const itemInCart = new Cart(
                    id,
                    response.data.name,
                    response.data.image,
                    response.data.price,
                    quantity
                )
                cartList.push(itemInCart)
                renderItemInCart(cartList)
            }
            storageCartList()
            quantityInCart()

        })
        .catch((error) => {
            alert("api loi itemInCart")
        });
    document.getElementById(id).value = 0;
}

function deleteItemInCart(id) {
    cartList = cartList.filter((item) => {
        return item.id != id
    })
    storageCartList()
    renderItemInCart(cartList)
    quantityInCart()

}

//Hàm hiển thị số lượng sản phẩm trong giỏ hàng
function quantityInCart(){
    let quantity = cartList.reduce((result,item)=>{
        return result + item.quantity
    },0)
    if (quantity==0){
        getElement("#cart-number").style.display= "none";
        return
    }
    getElement("#cart-number").style.display= "block";
    getElement("#cart-number").innerHTML = quantity;
}

function renderItemInCart(cartList) {
    let html = cartList.reduce((result, item) => {
        return (
            result + `
            <div class="d-flex cart-popup-item mb-3">
            <img class=" me-sm-3"
                src="${item.image}">
            <div class=" d-flex flex-column my-auto align-items-left">
                <h5 class="m-0">${item.name}</h5>
                <p class="my-2">Giá: $${item.price}</p>
                <div class="cart-popup-number  d-flex">
                    <button class="btn-more" onclick="minusButtonInCart(${item.id})"><i class="fa fa-minus"></i></button>
                    <input type="number" class="mx-1 text-center" id="${item.id}" value="${item.quantity}">
                    <button class="btn-less"  onclick="plusButtonInCart(${item.id})"><i class="fa fa-plus"></i></button>
                </div>
            </div>
            <p class="d-lg-flex my-auto  align-items-center">Tổng:
                <span class="my-2 mx-lg-1 d-block" id="sumItem-${item.id}" >${item.sumPrice()}</span>
                <button onclick="deleteItemInCart(${item.id})" ><i class="fa fa-trash-alt"></i></button>
            </p>
        </div>
            `
        )
    }, "")
    getElement("#cartContent").innerHTML = html;
}

function clearButton(){
    localStorage.clear()
    cartList = []
    renderItemInCart(cartList)
    quantityInCart()

}


function payButton(){
    let payValue = cartList.reduce((result,item)=>{
        return result + Number(item.sumPrice())
    },0)
    alert("Số tiền bạn cần phải thanh toán là: "+payValue)
    alert("Thanh toán thành công")
    clearButton()
}
//storage
function storageCartList() {
    let json = JSON.stringify(cartList)
    localStorage.setItem("cartList", json)
}
function getCartList() {
    const json = localStorage.getItem("cartList")
    if (!json) {
        return []
    }
    const cartList = JSON.parse(json)
    for (let i = 0; i < cartList.length; i++) {
        let item = cartList[i];
        cartList[i] = new Cart(
            item.id,
            item.name,
            item.image,
            item.price,
            item.quantity,
        )
    }
    return cartList
}

//==============Helper===============//
function getElement(selector) {
    return document.querySelector(selector)
}
