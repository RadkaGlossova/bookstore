import { $ } from '@wdio/globals'
import Page from './page.js';
import {customerFirstName, customerLastName, customerUserName, customerPassword, loggedUser, wrongMessage} from '../../test/specs/fixtures.js'

/**
 * sub page containing specific selectors and methods for a specific page
 */
class LoginPage extends Page {
    /**
     * define selectors using getter methods
     */
    get inputUsername () {
        return $('#userName');
    }

    get inputPassword () {
        return $('#password');
    }

    get btnSubmit () {
        return $('button[type="submit"]');
    }
    get loginButton () {
        return $('#login');
    }

    get headline () { 
        return $('h1')};

    
    get logoutButton () {
        return $('#submit')};

 
    /**
     * a method to encapsule automation code to interact with the page
     * e.g. to login using username and password
     */
    async login () {
        await browser.url('/login')
        await this.inputUsername.setValue(customerUserName);
        await this.inputPassword.setValue(customerPassword);

        await (await this.loginButton).waitForClickable();
        await this.loginButton.click();
    }

    async logout () {
        await ((await this.logoutButton).waitForClickable());
        await this.logoutButton.click();
    }

    /**
     * overwrite specific options to adapt it to page object
     */
    open () {
        return super.open('login');
    }
}

export default new LoginPage();
