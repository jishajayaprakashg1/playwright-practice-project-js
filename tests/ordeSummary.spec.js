import { test, expect} from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { InventoryPage } from '../pages/inventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckOutPage } from '../pages/checkoutPage'
import { OrderSummaryPage } from '../pages/OrderSummaryPage';

import constants from '../data/constants';
import users from '../data/users';

/** @type {LoginPage} */
let loginPage;
/** @type {InventoryPage} */
let inventoryPage;
/** @type {CartPage} */
let cartPage;
/** @type {CheckOutPage} */
let checkOutPage;
/** @type {OrderSummaryPage} */
let orderSummaryPage;

test.beforeEach( async ({page}) => {
    loginPage = new LoginPage(page);
    await loginPage.open();

    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);
    checkOutPage = new CheckOutPage(page);
    orderSummaryPage = new OrderSummaryPage(page);
});

test('TC1 Validate the order summary page title', async ({page}) => {
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

            //validation of title on the checkout page
            await checkOutPage.validateCheckoutPageTitle(constants.text.checkoutPageTitle);

            //fill form details and click on continue button
            await checkOutPage.fillFormDetails(constants.userDetails.firstName, constants.userDetails.lastName, constants.userDetails.zipCode);

            const actualTitle = await orderSummaryPage.validateOrderSummaryPageTitle(constants.orderSummaryPageDetails.orderSummaryPageTitle);
            expect(actualTitle).toBe(constants.orderSummaryPageDetails.orderSummaryPageTitle);

            await orderSummaryPage.clickFinishButton();

            await expect(page).toHaveURL(constants.urls.finishPageUrl);
            await expect(orderSummaryPage.summaryMessage).toHaveText(constants.orderSummaryPageDetails.summaryMessage);


});
