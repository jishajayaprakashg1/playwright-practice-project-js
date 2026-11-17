class CheckOutPage {
    constructor (page) {
        this.page = page;
        this.checkoutPageTitle = page.locator('.title');
        this.firstNameInut = page.getByPlaceholder('First Name');
        this.lastNameInput = page.getByPlaceholder('Last Name');
        this.zipCodeInput = page.getByPlaceholder('Zip/Postal Code');
        this.continueButton = page.getByRole('button', {name: 'Continue'});
    
    }

    async validateCheckoutPageTitle(title){
        const actualTitle = await this.checkoutPageTitle.textContent();
        return actualTitle === title;
    }

    async fillFormDetails(firstName, lastName, zipCode){
        await this.firstNameInut.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.zipCodeInput.fill(zipCode);  
        await this.continueButton.click();
    }

}

module.exports = {CheckOutPage};