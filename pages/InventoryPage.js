class InventoryPage {
    constructor (page){
        this.page = page;

        //locators : this will list all the items in the page
        this.inventoryItems = page.locator('[data-test="inventory-item"]');

        //to locate the shopping cart
        this.cartBadge = page.locator('.shopping_cart_link');

        //to locate th edrop down for sorting products
        this.sortDropDown = page.getByRole('combobox', { name: 'Sort products' });

        //locate all prices of products
        this.prices = page.locator('[data-test="inventory-item-price"]');
    }

    getInventoryItem(itemName){
        //this will filter the exact item
       return this.inventoryItems.filter({hasText: itemName});
    }

    async addItemToCart(itemName){
        //this will click on the Add to Cart button
        const item = this.getInventoryItem(itemName);
        await item.getByRole('button', {name:'Add to cart'}).click();
    }

    async getCartBadgeCount(){
        const cartBadgeCount = this.cartBadge.count();
        if(cartBadgeCount === 0) return 0;
        return Number(await this.cartBadge.textContent())
    }

    async sortByPrice(optionValue){
        //this will select priceHigh
       await this.sortDropDown.selectOption(optionValue);
   }

    async getAllProductPrices(){
       const pricesText = await this.prices.allTextContents()
       return pricesText.map((p) => parseFloat(p.replace('$', '')));
    }
}


module.exports = { InventoryPage };