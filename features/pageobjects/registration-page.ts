import { Page } from "@playwright/test";
import { BasePage } from "./base-page";
import allLocators from '../../locators/locators.json';

export class RegistrationPage extends BasePage {
    private locators = allLocators.RegistrationPage;
    constructor(page: Page) {
        super(page)
    }

    async navigateToHomePage() {
        await this.navigateTo('/')

    }

    async set_name(name: string) {
        await this.type(this.locators.name, name)
    }

    async set_phone(phone: string) {
        await this.type(this.locators.phone, phone)
    }

    async set_city(city: string) {
        await this.type(this.locators.city, city)
    }

    async set_username(username: string) {
        await this.type(this.locators.username, username)
    }

    async set_email(email: string) {
        await this.type(this.locators.email, email)
    }

    async set_password(password: string) {
        await this.type(this.locators.password, password)
    }

    async set_country(country:string){
        await this.type(this.locators.country, country)
    }

    async submit_form() {
        await this.click(this.locators.submitBtn)
    }

}