var obj = require("../../properties/objects.json");
const { element, browser } = require("protractor");
var chai = require('chai');
var chaiAsPromised = require("chai-as-promised");
const { enableHttpHttps } = require("../APILevelSpecifications/policies");
chai.use(chaiAsPromised);
var expect = chai.expect;

var EC = protractor.ExpectedConditions;

module.exports = {

    clickMenuOptions: async function(){
        await browser.wait(EC.visibilityOf(await element(by.xpath("//a[@title='Menu options']")), 180000, "**** NOT FOUND ****"));
        await browser.sleep(2000);
        await element(by.xpath("//a[@title='Menu options']")).click();
        await browser.sleep(3000);
    },

    clickAdministrationLink: async function(){
        await element(by.linkText("Administration")).click();
        await browser.wait(EC.visibilityOf(await element(by.id("general")), 180000, "**** NOT FOUND ****"));
        await browser.sleep(2000);
    },


    clickOnGeneralTab: async function(){
        await browser.wait(EC.visibilityOf(await element(by.id("general")), 180000, "**** NOT FOUND ****"));
        await browser.sleep(2000);
        await element(by.id("general")).click();
    },


    clickOnSecutiryTab: async function(){
        await browser.wait(EC.visibilityOf(await element(by.id("general")), 180000, "**** NOT FOUND ****"));
        await browser.sleep(2000);
        await element(by.id("security")).click();
    },


    clickOnDestinationTab: async function(){
        await browser.wait(EC.visibilityOf(await element(by.id("general")), 180000, "**** NOT FOUND ****"));
        await browser.sleep(2000);
        await element(by.id("eventsAndMetrics")).click();
    },


    clickOnExternalAccountsTab: async function(){
        await browser.wait(EC.visibilityOf(await element(by.id("general")), 180000, "**** NOT FOUND ****"));
        await browser.sleep(2000);
        await element(by.id("accountSettings")).click();
    },


    approvalForCreateApplication: async function(){
        await browser.wait(EC.visibilityOf(await element(by.linkText("Create application")), 180000, "**** NOT FOUND ****"));
        await browser.sleep(2000);
        await element(by.linkText("Create application")).click();
        await browser.wait(EC.visibilityOf(await element(by.xpath("//h5[text()='Create application']")), 180000, "**** NOT FOUND ****"));
        await browser.sleep(1000);
        await element(by.xpath("//span[@class='toggle-knob']")).isPresent().then(async function(enablebutton){
            if(enablebutton == true){
                await element(by.xpath("//span[@class='toggle-knob']")).click();
            }
        });
        await element(by.buttonText("Save")).click();
        await browser.wait(EC.not(EC.visibilityOf(await element(by.xpath(obj.baseModule.login.loadingImage)), 180000, "API POLICIES NOT FOUND")));
        await browser.sleep(2000);
    },


    clickjwtOauthOpenIDLink: async function(){
        await browser.wait(EC.visibilityOf(await element(by.linkText("JWT/OAuth/OpenID")), 180000, "**** NOT FOUND ****"));
        await browser.sleep(2000);
        await element(by.linkText("JWT/OAuth/OpenID")).click();
    },


    addOAuthScopes: async function(scopeName, scopeDescription){
        await browser.wait(EC.visibilityOf(await element(by.xpath("//h5[text()='Internal authorization servers']")), 180000, "**** NOT FOUND ****"));
        await browser.sleep(2000);
        await element(by.linkText("local")).click();
        await browser.wait(EC.not(EC.visibilityOf(await element(by.xpath(obj.baseModule.login.loadingImage)), 180000, "API POLICIES NOT FOUND")));
        await browser.sleep(2000);
        await element(by.xpath("//label[text()='OAuth scopes']")).click();
        await browser.sleep(2000);
        await element(by.id("scopeName")).sendKeys(scopeName);
        await element(by.id("scopeDescription")).sendKeys(scopeDescription);
        await element(by.xpath("//button[text()='Add']")).click();
        await browser.sleep(2000);
        await element(by.buttonText("Update")).click();
        await browser.wait(EC.not(EC.visibilityOf(await element(by.xpath(obj.baseModule.login.loadingImage)), 180000, "API POLICIES NOT FOUND")));
        await browser.sleep(2000);
    },


    jwtConfigurations: async function(jwtConfigurations){
        await browser.wait(EC.visibilityOf(await element(by.xpath("//h5[text()='Internal authorization servers']")), 180000, "**** NOT FOUND ****"));
        await browser.sleep(2000);
        await element(by.linkText("local")).click();
        await browser.wait(EC.not(EC.visibilityOf(await element(by.xpath(obj.baseModule.login.loadingImage)), 180000, "API POLICIES NOT FOUND")));
        await browser.sleep(2000);
        await element(by.xpath("//label[text()='JWT configuration']")).click();
        await browser.sleep(2000);
        await element(by.id('issuer')).clear();
        await element(by.id("issuer")).sendKeys(jwtConfigurations.tokenIssuer);
        await element(by.xpath("//option[text()='"+jwtConfigurations.algorithm+"']")).click();
        await element(by.id("expiry")).clear();
        await element(by.id("expiry")).sendKeys(jwtConfigurations.expiry);
        await element(by.id('audience')).clear();
        await element(by.id("audience")).sendKeys(jwtConfigurations.audience);
        await element(by.xpath("//option[text()='"+jwtConfigurations.keystore+"']")).click();
        await browser.sleep(2000);
        await element(by.buttonText("Update")).click();
        await browser.wait(EC.not(EC.visibilityOf(await element(by.xpath(obj.baseModule.login.loadingImage)), 180000, "API POLICIES NOT FOUND")));
        await browser.sleep(2000);
    },

    deleteOauthScopes: async function(scopeName){
        await browser.wait(EC.visibilityOf(await element(by.xpath("//h5[text()='Internal authorization servers']")), 180000, "**** NOT FOUND ****"));
        await browser.sleep(2000);
        await element(by.linkText("local")).click();
        await browser.wait(EC.not(EC.visibilityOf(await element(by.xpath(obj.baseModule.login.loadingImage)), 180000, "API POLICIES NOT FOUND")));
        await browser.sleep(2000);
        await element(by.xpath("//label[text()='OAuth scopes']")).click();
        await browser.sleep(2000);
        await element(by.xpath("//td[widget-factory[span[text()='"+scopeName+"']]]/following-sibling::td//i[contains(@class,'fa-trash')]")).isPresent().then(async function(trash){
            if(trash){
                element(by.xpath("//td[widget-factory[span[text()='"+scopeName+"']]]/following-sibling::td//i[contains(@class,'fa-trash')]")).click();
                await browser.sleep(4000);
            }
        })
        await element(by.buttonText("Update")).click();
        await browser.wait(EC.not(EC.visibilityOf(await element(by.xpath(obj.baseModule.login.loadingImage)), 180000, "API POLICIES NOT FOUND")));
        await browser.sleep(2000);
    }
}