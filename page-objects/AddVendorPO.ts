import { Page ,Locator} from 'playwright';
import { BaseAppPage } from './BaseAppPage';

export class AddVendorPO extends BaseAppPage {

    readonly buisnessNameInput: Locator 
    readonly contactNameInput: Locator
    readonly emailInput: Locator
    readonly phoneNumberInput: Locator    
    readonly continueButton: Locator
    readonly companyErrorMessage: Locator
    readonly emailErrorMessage: Locator

    constructor(page: Page) {
     super(page)   
     this.buisnessNameInput = page.getByTestId('form-input-companyName')
     this.contactNameInput = page.getByTestId('form-input-fullName')
     this.emailInput = page.getByTestId('form-input-email')
     this.phoneNumberInput = page.getByTestId('form-input-phone')
     this.continueButton = page.getByTestId('continue-button')
        this.companyErrorMessage = page.getByTestId('form-error-message-companyName')
        this.emailErrorMessage = page.getByTestId('form-error-message-email')
    }

    async enterBuisnessName(username: string): Promise<void> {
        await this.buisnessNameInput.fill(username);
    }

    async enterPassword(password: string): Promise<void> {
        await this.contactNameInput.fill(password);
    }

    async enterEmail(email: string): Promise<void> {
        await this.emailInput.fill(email);
    }
    
    async enterPhoneNumber(phone: string): Promise<void> {
        await this.phoneNumberInput.fill(phone);
    }

    async clickContinueButton(): Promise<void> {
        await this.continueButton.click();
    }

    async addVendor(buisnessName: string, contactName: string, email: string, phone: string): Promise<void> {
        await this.enterBuisnessName(buisnessName);
        await this.enterPassword(contactName);
        await this.enterEmail(email);
        await this.enterPhoneNumber(phone);
        await this.page.waitForTimeout(2000);
        //the timeout could be swapped for more efficient solution
        //didn't have time to implement it properly
        await this.clickContinueButton();
        
    }

    async isCompanyNameErrorVisible(): Promise<boolean> {
        return await this.companyErrorMessage.isVisible()
    }

    async isEmailErrorVisible(): Promise<boolean> {
        return await this.emailErrorMessage.isVisible()
    }
}