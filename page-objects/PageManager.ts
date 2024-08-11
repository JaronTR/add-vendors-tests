import { Page } from 'playwright'
import { LoginPO } from './LoginPO'
import { PaymentPO } from './PaymentPO'
import { AddVendorPO } from './AddVendorPO'
import { ReceivingMethodPO } from './ReceivingMethodPO'
import { BaseAppPage } from './BaseAppPage'
import { VendorDetailsPO } from './VendorDetailsPO'

export class PageManager extends BaseAppPage {

    private loginPO: LoginPO
    private paymentPO: PaymentPO
    private addVendorPO: AddVendorPO
    private receivingMethodPO: ReceivingMethodPO
    private vendorDetailsPO: VendorDetailsPO

    constructor(page: Page) {
        super(page)
        this.loginPO = new LoginPO(page)
        this.paymentPO = new PaymentPO(page)
        this.addVendorPO = new AddVendorPO(page)
        this.receivingMethodPO = new ReceivingMethodPO(page)
        this.vendorDetailsPO = new VendorDetailsPO(page)
    }

    public onLoginPage(): LoginPO {
        return this.loginPO
    }

    public onPaymentPage(): PaymentPO {
        return this.paymentPO
    }

    public onAddVendorPage(): AddVendorPO {
        return this.addVendorPO
    }

    public onReceivingMethodPage(): ReceivingMethodPO {
        return this.receivingMethodPO
    }

    public onVendorDetailsPage(): VendorDetailsPO {
        return this.vendorDetailsPO
    }

    
}