import { expect } from '@wdio/globals'
import LoginPage from '../pageobjects/login.page.js'
import SecurePage from '../pageobjects/secure.page.js'
import {customerFirstName, customerLastName, customerUserName, customerPassword, loggedUser} from '../../test/specs/fixtures.js'


describe('Demoqa Login Page', async () => {

    beforeEach (async() =>
    { 
        await browser.url('/');
    });

    it('should open login page', async () => {
        await browser.url('/login')

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

    it('should register new customer', async () => {
        await browser.url('/register')
        const headline = $('h1')
        await expect (await headline.getText()).toEqual('Register');
        const customerFirstNameField =  await $('input[id="firstname"]');
        await customerFirstNameField.setValue(customerFirstName);
        const customerLastNameField =  await $('input[id="lastname"]');
        await customerLastNameField.setValue(customerLastName);
        const customerUserNameField =  await $('input[id="userName"]');
        await customerUserNameField.setValue(customerUserName);
        const customerPasswordField = await $('input[id="password"]');
        await customerPasswordField.setValue(customerPassword);
        await browser.pause(1000);
        
        // reCaptcha picture - don´t know how to proceed :-/
        // const registerButton =  await $('#register');
        // await registerButton.click();
        // await browser.pause(1000);
        // const currentLoggedCustomer = await $('').getText();
        // await expect (currentLoggedCustomer).toEqual(loggedCustomer);
    });

    it('should redirect to login', async () => {
        await browser.url('/register');
         const headline = $('h1');
        await expect (await headline.getText()).toEqual('Register');
        const redirButton = $('#gotologin');
        await expect(redirButton).toBeClickable();
        await redirButton.click();
        await expect(await headline.getText()).toEqual('Login');
    });

    it('should redirect to register', async () => {
        await browser.url('/login');
        const headline = $('h1');
        await expect (await headline.getText()).toEqual('Login');
        const newUserButton = $('#newUser');
        await expect(newUserButton).toBeClickable();
        await newUserButton.click();
        
        await expect(await headline.getText()).toEqual('Register');
    });


    it('should login user with valid Credentials', async () =>{
        await browser.url('/login')
        await browser.saveScreenshot('login_page.png');

        const title = await $('h1');
        await expect (await title.getText()).toContain('Login');
        const customerUserNameField =  await $('input[id="userName"]');

        await customerUserNameField.setValue(customerUserName);

        const customerPasswordField = await $('input[id="password"]');
        await customerPasswordField.setValue(customerPassword);

        const loginButton = await $('#login');
        await expect (loginButton).toBeClickable();
        await loginButton.click()     

        await browser.pause(1000) //poor internet connection
        
        // succesfully logged user check
        
        // await expect (await headline.getText()).toEqual('Profile');

        const currentLoggedUser = $('#userName-value')  ;
        await expect (await currentLoggedUser.getText()).toEqual(loggedUser)

        // logout    
        const logoutButton = await $('#submit');
        await expect (logoutButton).toBeClickable();
        await logoutButton.click();

            const headline = await $('h1');
        await expect (await headline.getText()).toEqual('Login');


    });

})

