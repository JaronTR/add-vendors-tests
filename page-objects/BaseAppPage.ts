import { Page } from 'playwright';

export class BaseAppPage {
    
    readonly page: Page

    constructor(page: Page) {
     this.page = page
    }
}    