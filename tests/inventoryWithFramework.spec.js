import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import InventoryPage from '../pages/inventoryPage';
import constants from '../data/constants';
import users from '../data/users';

/** @type {LoginPage} */
let loginPage;
/** @type {InventoryPage} */
let inventoryPage;


test.beforeEach(  async ({page}) => {
    loginPage = new LoginPage(page);
    //launch the app yusing base url
    await loginPage.open();
    inventoryPage = new InventoryPage(page);
})

test('TC1 Add items to cart and verify the cart count', async ({ page }) => {
    //enter username and password and click on login button
    await loginPage.login(users.standardUser.username, users.standardUser.password);
    await loginPage.loginButton.click();

    //add two items to cart
    await inventoryPage.addItemToCart(constants.text.sauceLabsBackpackText);
    await inventoryPage.addItemToCart(constants.text.sauceLabsBikeLightText);

    //count the number of items in the cart
    const cartCount = await inventoryPage.getCartBadgeCount();
    expect(cartCount).toBe(2);
});

test('TC2 Sort the products', async () => {
    await loginPage.login(users.standardUser.username, users.standardUser.password);
    await loginPage.loginButton.click();

    await inventoryPage.sortByPrice('lohi'); // SauceDemo: low to high
    const prices = await inventoryPage.getAllProductPrices();

    expect(prices).toEqual([...prices].sort((a, b) => a - b));
});