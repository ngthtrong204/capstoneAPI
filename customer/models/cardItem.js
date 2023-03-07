class Item{
    constructor(id, name, price, image, describe, type){
        this.id=id;
        this.name=name;
        this.price=price;
        this.image=image;
        this.describe=describe;
        this.type=type;
    }
}

class Cart{
    constructor(id,name,image,price,quantity){
        this.id=id;
        this.name=name;
        this.image=image;
        this.price=price;
        this.quantity=quantity;
    }
}

Cart.prototype.sumPrice = function(){
return this.price*this.quantity
}