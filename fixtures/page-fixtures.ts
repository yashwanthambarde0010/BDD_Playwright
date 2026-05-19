import { Page } from 'playwright';
import { RegistrationPage } from '../features/pageobjects/registration-page';


export class PageFixture {


    readonly registrationPage: RegistrationPage;
    readonly page: Page;


    constructor(page: Page) {
        this.page = page;

        this.registrationPage = new RegistrationPage(page);

    }




}