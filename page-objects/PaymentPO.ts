import { Page ,Locator} from 'playwright';
import { BaseAppPage } from './BaseAppPage';

export class PaymentPO extends BaseAppPage {
    readonly addVendorButton: Locator
    readonly searchBar: Locator
    readonly vendorRow: Locator

    constructor(page: Page) {
        super(page)
        this.addVendorButton = page.getByTestId('vendors-tab-add-vendor-button')
        this.searchBar = page.getByTestId('search-input')
        this.vendorRow = page.getByTestId(`table-row-`)
    }

    async clickAddNewVendorButton(): Promise<void> {
        await this.addVendorButton.click();
    }
    
    async searchVendor(vendorName: string): Promise<void> {
        await this.searchBar.fill(vendorName);
        await this.page.keyboard.press('Enter');
    }

    async selectVendor(vendorId: string): Promise<void> {
        await this.page.getByTestId(`table-row-${vendorId}`).click();
    }

    async isVendorExists(vendorId: string): Promise<boolean> {
        return await this.page.getByTestId(`table-row-${vendorId}`).isVisible();
    } 
}
