var obj = require("../../properties/objects.json");
const { element, browser, ActionSequence } = require("protractor");
var chai = require('chai');
var chaiAsPromised = require("chai-as-promised");
const { enableHttpHttps } = require("../APILevelSpecifications/policies");
chai.use(chaiAsPromised);
var expect = chai.expect;

var EC = protractor.ExpectedConditions;


module.exports = {
    clickOnOauthOpenIDScopes: async function(){
        await element(by.linkText("OAuth/OpenID scopes")).click();
        await browser.wait(EC.visibilityOf(await element(by.xpath("//button[text()='Map scope']")), 180000, "**** NOT FOUND ****"));
        await browser.sleep(2000);
    },

    CreateMapScope: async function(scopeName, apiLevelScopeName, apiName, apiVersion){
        await browser.wait(EC.visibilityOf(await element(by.xpath("//button[text()='Map scope']")), 180000, "**** NOT FOUND ****"));
        await browser.sleep(2000);
        await element(by.xpath("//button[text()='Map scope']")).click();
        await browser.wait(EC.not(EC.visibilityOf(await element(by.xpath(obj.baseModule.login.loadingImage)), 180000, "API POLICIES NOT FOUND")));
        await browser.sleep(2000);
        await element(by.linkText("Authorization server scope")).click();
        await browser.sleep(2000);
        await element(by.xpath("//div[@id='searchScopeButton']//i")).click();
        await browser.sleep(5000);
        await element(by.xpath("//div[@id='searchScopeResult']//label[text()='"+scopeName+"']")).click();
        await browser.sleep(3000);
        await element(by.linkText("API scopes")).click();
        await browser.sleep(3000);
        await element(by.xpath("//div[@id='searchButton']//i")).click();
        await browser.sleep(5000);
        await element(by.xpath("//div[@id='searchBox']/input")).sendKeys(apiName);
        await browser.sleep(3000);
        await element(by.xpath("//tr[td[label[text()='"+apiLevelScopeName+"']] and td[label[text()='"+apiName+"']] and td[label[text()='"+apiVersion+"']]]//i")).click();
        await browser.sleep(2000);
        await element(by.buttonText("Save")).click();
        await browser.wait(EC.not(EC.visibilityOf(await element(by.xpath(obj.baseModule.login.loadingImage)), 180000, "API POLICIES NOT FOUND")));
        await browser.sleep(2000);
        expect(await element(by.xpath("//span[contains(text(),'Scope mapping created successfully')]")).isPresent()).to.equal(true);
    },


    deleteOauthMapScopes: async function(scopeName){
        await browser.wait(EC.visibilityOf(await element(by.xpath("//button[text()='Map scope']")), 180000, "**** NOT FOUND ****"));
        await browser.sleep(2000);
        await element(by.xpath("//td[a[text()='local:"+scopeName+"']]/following-sibling::td//i[@title='Delete']")).click();
        await browser.sleep(10000);
        await element(by.xpath("//div[contains(@class,'modal-content')]//button[text()='Yes']")).click();
        await browser.wait(EC.not(EC.visibilityOf(await element(by.xpath(obj.baseModule.login.loadingImage)), 180000, "API POLICIES NOT FOUND")));
        await browser.sleep(5000);
    }

}