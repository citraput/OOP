const fs = require('fs');

class Cart{
    constructor(){
        this.item = [];
    }
    addItem({ item_id, price, quantity = 1}){
        this.item.push({item_id, price, quantity});
        return this;
    }
    removeItem({item_id}){
        let index = this.item.findIndex(obj => obj.item_id == item_id);
        if(index > -1){
            this.item.splice(index, 1)
        }
        return this;
    }
    addDiscount(disc){
        this.item.map(obj => obj.price = obj.price - (obj.price * (parseFloat(disc) / 100)));
        return this;
    }
    totalItems(){
        console.log(this.item.length)
    }
    totalQuantity(){
        let quantity = 0;
        for(let i = 0; i < this.item.length; i++){
            quantity += this.item[i].quantity;
        }
        console.log(quantity);
    }
    totalPrice(){
        let total = 0;
        for(let i = 0; i < this.item.length; i++){
            total += this.item[i].price;
        }
        console.log(total)
    }
    showAll(){
        console.log(this.item);
    }
    checkout(){
        fs.writeFile('store.txt', JSON.stringify(this.item), function(err){
            if(err) throw err;
            console.log('The items are stored in the file store.txt')
        })
    }
}

const cart = new Cart()

// Do some chainings
cart.addItem({ item_id: 1, price: 30000, quantity: 3 })
    .addItem({ item_id: 2, price: 10000 }) // By default quantity is 1
    .addItem({ item_id: 3, price: 5000, quantity: 2 })
    .removeItem({item_id: 2})
    .addItem({ item_id: 4, price: 400, quantity: 6 })
    .addDiscount('50%')

cart.totalItems() // 3

cart.totalQuantity() // 11

cart.totalPrice() // 51200

cart.showAll() // Show all items in cart

cart.checkout() // Store data in a file