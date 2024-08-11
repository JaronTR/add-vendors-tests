import { Page ,Locator} from 'playwright';
import { BaseAppPage } from './BaseAppPage';

export class LoginPO extends BaseAppPage {
    
    readonly usernameInput: Locator 
    readonly passwordInput: Locator 
    readonly loginButton: Locator

    constructor(page: Page) {
     super(page)   
     this.usernameInput = page.getByTestId('input-email')
     this.passwordInput = page.getByTestId('input-password')
     this.loginButton = page.getByTestId('button-auth.signIn.buttonLabel')
    }

    async enterUsername(username: string): Promise<void> {
        await this.usernameInput.fill(username);
    }

    async enterPassword(password: string): Promise<void> {
        await this.passwordInput.fill(password);
    }

    async clickLoginButton(): Promise<void> {
        await this.loginButton.click();
    }

    async login(username: string, password: string): Promise<void> {
        await this.enterUsername(username);
        await this.enterPassword(password);
        await this.clickLoginButton();
    }
}