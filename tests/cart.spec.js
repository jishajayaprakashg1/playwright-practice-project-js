import { test, expect } from '@playwright/test'
import { LoginPage } from '../pages/loginPage';
import { InventoryPage } from '../pages/inventoryPage';
import { CartPage } from '../pages/CartPage';

import constants from '../data/constants';
import users from '../data/users';

/** @type {LoginPage} */
let loginPage;
/** @type {InventoryPage} */
let inventoryPage;
/** @type {CartPage} */
let cartPage;


test.beforeEach(  async ({page}) => {
    loginPage = new LoginPage(page);
    //launch the app yusing base url
    await loginPage.open();
    inventoryPage = new InventoryPage(page);

    cartPage = new CartPage(page);

})

test('TC1 Check if items are added to cart', async ({page}) => {
        //enter username and password and click on login button
        await loginPage.login(users.standardUser.username, users.standardUser.password);
        await loginPage.loginButton.click();
    
        //add two items to cart
        await inventoryPage.addItemToCart(constants.text.sauceLabsBackpackText);
        await inventoryPage.addItemToCart(constants.text.sauceLabsBikeLightText);

        //go to cart
        await cartPage.goToCart();
        await cartPage.removeItem(constants.text.sauceLabsBikeLightText);

        //click on continue button
        await cartPage.clickContinueButton();

});