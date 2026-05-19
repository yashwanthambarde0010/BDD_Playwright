import { Page } from 'playwright';
import { RegistrationPage } from '../features/pageobjects/registration-page';
import { HomePage } from '../pages/home-page';
import { LoginPage } from '../pages/login-page';

export class PageFixture {


    readonly registrationPage: RegistrationPage;
    readonly homePage: HomePage;
    readonly loginPage: LoginPage;
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
        this.registrationPage = new RegistrationPage(page);
        this.homePage = new HomePage(page);
        this.loginPage = new LoginPage(page);
    }




}