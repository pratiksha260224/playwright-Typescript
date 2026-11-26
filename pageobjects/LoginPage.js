export class LoginPage {

    constructor(page) {

        this.page = page;
        this.loginButton = page.locator("[value = 'Login']");
        this.userEmail = page.locator("#userEmail");
        this.password = page.locator("#userPassword");
       
    }

    async goTo(){

        await this.page.goto("https://rahulshettyacademy.com/client");

    }

    async validLogin(userEmail, password) {

        await this.userEmail.fill(userEmail);
        await this.password.fill(password);
        await this.loginButton.click();
        await this.page.waitForLoadState('networkidle');

    }
}