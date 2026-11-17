class OrderSummaryPage{
    constructor(page){
        this.page = page;
        this.title = page.locator('.title');
        this.finishButton = page.getByRole('button', {name: 'Finish'});
        this.summaryMessage = page.locator('text=Thank you for your order!')
    }

    async validateOrderSummaryPageTitle(expectedTitle) {
       return await this.title.textContent();
    }

    async clickFinishButton(){
        await this.finishButton.click();
    }
}
module.exports = { OrderSummaryPage};