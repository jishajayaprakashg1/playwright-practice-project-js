import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import users from '../data/users';
import constants from '../data/constants';

let loginPage: any;

test.beforeEach(  async ({page}) => {
    loginPage = new LoginPage(page);
    await loginPage.open();
})

test('TC1 Log into the application with valid credentials', async ({ page }) => {
    await loginPage.login(users.standardUser.username, users.standardUser.password);
    await loginPage.loginButton.click();

    await expect(page).toHaveURL(constants.urls.inventory);
    await expect(page.getByText(constants.text.productTitle)).toBeVisible();

})