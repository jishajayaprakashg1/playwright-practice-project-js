class CartPage {
    constructor(page){
        this.page = page

        this.cartBadge = page.locator('.shopping_cart_link');

        this.cartItems = page.locator('.cart_item_label');

        this.removeButton = page.locator('.remove-sauce-labs-bike-light');

        this.continueButton = page.getByRole('button', {name: 'Checkout'});
    }

    async goToCart(){
       await  this.cartBadge.click();
    }

    async filterItemToBeRemoved(itemName){
       return this.cartItems.filter({hasText : itemName})
    }

    async removeItem(itemName){
        const removeButton =  await this.filterItemToBeRemoved(itemName);
        await removeButton.click();
    }

    async clickContinueButton(){
        await this.continueButton.click();
    }

}

module.exports = { CartPage };