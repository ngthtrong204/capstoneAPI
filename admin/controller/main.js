getProducts();
priceUpProducts();
priceDownProducts();
// Hàm gửi yêu cầu lấy danh sách sản phẩm từ API
function getProducts(searchValue) {
    apiGetProducts(searchValue)
    .then((response) => {
        // call API thành công
        const products = response.data.map((product) => {
            return new Product(product.id, product.name, product.price, product.screen, product.backCamera, product.frontCamera, product.img, product.description, product.type);
        })
        renderProducts(products);
    }).catch((error) => {
        // call API thất bại
        alert("API get products error");
    });
   
}

 //  Hàm SORT
 function sortJSON(arr, key, asc = true) {
    return arr.sort((a, b) => {
      let x = a[key];
      let y = b[key];
      if (asc) {
        return x < y ? -1 : x > y ? 1 : 0;
      } else {
        return x > y ? -1 : x < y ? 1 : 0;
      }
    });
  }


// Hàm sắp xếp sản phẩm theo giá tiền tăng dần
 function priceUpProducts(searchValue) {
    apiGetProducts(searchValue).then((response) => {
       
          let output = sortJSON(response.data, "price", true);
          renderProducts(output);
          console.log("sắp xếp tăng dần", output);
    }).catch((error) => {
        alert("API get products error");
    });
 }

 // Hàm sắp xếp sản phẩm theo giá tiền giảm dần
 function priceDownProducts(searchValue) {
    apiGetProducts(searchValue).then((response) => {
       
          let output = sortJSON(response.data, "price", false);
          renderProducts(output);
          console.log("sắp xếp giảm dần", output);
    }).catch((error) => {
        alert("API get products error");
    });
 }



// Hàm thêm sản phẩm
function createProduct() {
    const product = {
         name: getElement("#TenSP").value,
         price: getElement("#GiaSP").value,
         screen: getElement("#ManHinhSP").value,
         backCamera: getElement("#BackSP").value,
         frontCamera: getElement("#FrontSP").value,
         img: getElement("#ImgSP").value,
         description: getElement("#DesSP").value,
         type: getElement("#loaiSP").value,
    }
    
    apiCreateProduct(product)
    .then((response) => {
        getProducts();
    }).catch((error) => {
        alert("Thêm sản phẩm thất bại");
    });
    let isValid = validate();
    if(!isValid){
        return;
    }
   
}

// Hàm xóa sản phẩm
function deleteProduct(productId) {
    apiDeleteProduct(productId).then(() => {
       getProducts();
    }).catch((error) => {
        alert("Xóa sản phẩm thất bại");
    });
}

// Hàm lấy chi tiết 1 sản phẩm
function selectProduct(productId) {


  apiGetProductById(productId).then((response) => {
      const product = response.data;
      getElement("#TenSP").value = product.name;
      getElement("#GiaSP").value = product.price;
      getElement("#ManHinhSP").value = product.screen;
      getElement("#BackSP").value = product.backCamera;
      getElement("#FrontSP").value = product.frontCamera;
      getElement("#ImgSP").value = product.img;
      getElement("#DesSP").value = product.description;
      getElement("#loaiSP").value = product.type;

      getElement(".modal-title").innerHTML = "Cập nhật sản phẩm";
      getElement(".modal-footer").innerHTML = `
      <button class="btn btn-secondary" onclick="updateProduct('${product.id}')">Update</button>
      <button class="btn btn-primary" data-dismiss="modal">Close</button>
    `;

      
      $("#myModal").modal("show");
  }).catch((error) => {
    
    alert("Lấy chi tiết sản phẩm thất bại");
});
}

// Hàm cập nhật sản phẩm
function updateProduct(productId) {
    const product = {
        name: getElement("#TenSP").value,
        price: getElement("#GiaSP").value,
        screen: getElement("#ManHinhSP").value,
        backCamera: getElement("#BackSP").value,
        frontCamera: getElement("#FrontSP").value,
        img: getElement("#ImgSP").value,
        description: getElement("#DesSP").value,
        type: getElement("#loaiSP").value,
   };
   apiUpdateProduct(productId, product).then((response) => {
    getProducts();
   }).catch((error) => {
    alert("Cập nhật sản phẩm thất bại");
   });
}

// Hàm hiển thị danh sách sản phẩm ra table
function renderProducts(products) {
    let html = products.reduce((result, product, index) => {
        return (result +
            `
          <tr>
            <td>${index + 1}</td>
            <td>${product.name}</td>
            <td>${product.price}</td>
            <td>
              <img src="${product.img}" with="70" height="70"/>
            </td>
            <td>${product.description}</td>
            <td>
              <button class="btn btn-primary"  onclick="selectProduct('${product.id}')">Edit</button>
              <button class="btn btn-danger" onclick="deleteProduct('${product.id}')">Delete</button>
            </td>
          </tr>
        `
        );
    },"");
    document.getElementById("tblDanhSachSP").innerHTML = html;
}



// ================ DOM =================
getElement("#btnThemSP").addEventListener("click", () => {
    getElement(".modal-title").innerHTML = "Thêm sản phẩm";
    getElement(".modal-footer").innerHTML = `
      <button class="btn btn-secondary" onclick="createProduct()">Add phone</button>
      <button class="btn btn-secondary" onclick="resetForm()">Reset</button>
      <button class="btn btn-primary" data-dismiss="modal">Close</button>
    `;
});

getElement("#txtSearch").addEventListener("keydown", (event) => {
    if(event.key !== "Enter") return;
     const searchValue = event.target.value;
     getProducts(searchValue);

})

// RESET FORM
function resetForm(){
      getElement("#TenSP").value = "";
      getElement("#GiaSP").value = "";
      getElement("#ManHinhSP").value = "";
      getElement("#BackSP").value = "";
      getElement("#FrontSP").value = "";
      getElement("#ImgSP").value = "";
      getElement("#DesSP").value = "";
      getElement("#loaiSP").value = "";
}
// Validate
function validate() {
    let isValid = true;
    // kiểm tra name
    let name = getElement("#TenSP").value;
    if(!name.trim()){
        isValid = false;
        getElement("#tbname").innerHTML = "tên điện thoại không được để trống";
        // getElement("#tbname").style.display = "block";
    } else{
        getElement("#tbname").innerHTML = "";
    }
     // kiểm tra price
     let price = getElement("#GiaSP").value;
     if(!price.trim()){
         isValid = false;
         getElement("#tbprice").innerHTML = "giá điện thoại không được để trống";
         // getElement("#tbname").style.display = "block";
     } else{
         getElement("#tbprice").innerHTML = "";
     }
      // kiểm tra screen
    let screen = getElement("#ManHinhSP").value;
    if(!screen.trim()){
        isValid = false;
        getElement("#tbscreen").innerHTML = "màn hình điện thoại không được để trống";
        // getElement("#tbname").style.display = "block";
    } else{
        getElement("#tbscreen").innerHTML = "";
    }
     // kiểm tra backCamera
     let bCamera = getElement("#BackSP").value;
     if(!bCamera.trim()){
         isValid = false;
         getElement("#tbback").innerHTML = "BackCamera điện thoại không được để trống";
         // getElement("#tbname").style.display = "block";
     } else{
         getElement("#tbback").innerHTML = "";
     }
      // kiểm tra frontCamera
    let fCamera = getElement("#FrontSP").value;
    if(!fCamera.trim()){
        isValid = false;
        getElement("#tbfront").innerHTML = "FrontCamera điện thoại không được để trống";
        // getElement("#tbname").style.display = "block";
    } else{
        getElement("#tbfront").innerHTML = "";
    }
     // kiểm tra img
     let img = getElement("#ImgSP").value;
     if(!img.trim()){
         isValid = false;
         getElement("#tbimg").innerHTML = "hình ảnh điện thoại không được để trống";
         // getElement("#tbname").style.display = "block";
     } else{
         getElement("#tbimg").innerHTML = "";
     }
     // kiểm tra des
     let des = getElement("#DesSP").value;
     if(!des.trim()){
         isValid = false;
         getElement("#tbdes").innerHTML = "mô tả điện thoại không được để trống";
         // getElement("#tbname").style.display = "block";
     } else{
         getElement("#tbdes").innerHTML = "";
     }
      
}

// ================= helpers =================
function getElement(selector) {
    return document.querySelector(selector);
}




