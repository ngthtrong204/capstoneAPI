class Item{
    constructor(id, name, price, img, description, type){
        this.id=id;
        this.name=name;
        this.price=price;
        this.img=img;
        this.description=description;
        this.type=type;
    }
}

class Cart{
    constructor(id,name,img,price,quantity){
        this.id=id;
        this.name=name;
        this.img=img;
        this.price=price;
        this.quantity=quantity;
    }
}

Cart.prototype.sumPrice = function(){
return this.price*this.quantity
}