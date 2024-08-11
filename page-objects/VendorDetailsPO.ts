import { Page ,Locator} from 'playwright';
import { BaseAppPage } from './BaseAppPage';

export class VendorDetailsPO extends BaseAppPage{
    
    readonly buisnessNameInput: Locator 
    readonly contactNameInput: Locator
    readonly emailInput: Locator
    readonly phoneNumberInput: Locator
    readonly closeIcon: Locator
    

    constructor(page: Page) {
        super(page)
        this.buisnessNameInput = page.getByTestId('form-input-companyName')
        this.contactNameInput = page.getByTestId('form-input-fullName')
        this.emailInput = page.getByTestId('form-input-email')
        this.phoneNumberInput = page.getByTestId('form-input-phone')
        this.closeIcon = page.getByTestId('close-icon')
    }

    async validateBuisnessName() {
        await this.buisnessNameInput.isVisible()
    }

    async validateContactName() {
        await this.contactNameInput.isVisible()
    }

    async validateEmail() {
        await this.emailInput.isVisible()
    }

    async validatePhoneNumber() {
        await this.phoneNumberInput.isVisible()
    }

    async validateVendorDetails() {
        await this.validateBuisnessName()
        await this.validateContactName()
        await this.validateEmail()
        await this.validatePhoneNumber()
    }

    async getBuisnessName() {
        return await this.buisnessNameInput.textContent()
    }

    async getContactName() {
        return await this.contactNameInput.textContent()
    }

    async getEmail() {
        return await this.emailInput.textContent()
    }

    async getPhoneNumber() {
        const phoneNumberString = await this.phoneNumberInput.textContent();
        const formattedPhoneNumberString = phoneNumberString?.replace(" ","")
        return formattedPhoneNumberString
    }


    async closeVendorDetails() {
        await this.closeIcon.click()
    }
}