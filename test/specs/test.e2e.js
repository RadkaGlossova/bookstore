import { expect } from '@wdio/globals'
import LoginPage from '../pageobjects/login.page.js'
import SecurePage from '../pageobjects/secure.page.js'


describe('Demoqa Login Page', async () => {

    beforeEach (async() =>
    { 
        await browser.url('/');
    });

    it('should open login page', async () => {
        await browser.url('/login')
        await browser.saveScreenshot('login_page.png');

        const title = await $('h2');
        await expect (await title.getText()).toContain('Welcome,');

        const customerUserNameField =  await $('input[id="userName"]');
        await expect(customerUserNameField).toBeDisplayed();
        await expect(customerUserNameField).toBeEnabled();

        const customerPasswordField = await $('input[id="password"]');
        await expect(customerPasswordField).toBeDisplayed();
        await expect(customerPasswordField).toBeEnabled();

        const loginButton = await $('#login');
        await expect(loginButton).toBeClickable();

        const newUserButton = await $('#newUser');
        await expect(newUserButton).toBeClickable();
        
    });
})

