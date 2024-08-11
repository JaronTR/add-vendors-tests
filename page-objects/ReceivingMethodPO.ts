import { Page ,Locator} from 'playwright';
import { BaseAppPage } from './BaseAppPage';

export class ReceivingMethodPO extends BaseAppPage {
    
    readonly skipButton: Locator
    readonly confirmationToast: Locator

    constructor(page: Page) {
        super(page)
        this.confirmationToast = page.getByTestId('toast-title')
        this.skipButton = page.getByTestId('layout-next-button')
    }

    async isConfirmationToastVisible(): Promise<boolean> {
        return await this.confirmationToast.isVisible();
    }

   async clickSkipButton(): Promise<void> {
        await this.skipButton.click();
    }
}