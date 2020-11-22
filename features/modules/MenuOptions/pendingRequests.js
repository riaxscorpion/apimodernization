var obj = require("../../properties/objects.json");
const { element, browser } = require("protractor");
var chai = require('chai');
var chaiAsPromised = require("chai-as-promised");
const { enableHttpHttps } = require("../APILevelSpecifications/policies");
chai.use(chaiAsPromised);
var expect = chai.expect;

var EC = protractor.ExpectedConditions;


module.exports = {

    clickpendingRequest: async function(){
        await element(by.linkText("Pending Requests")).click();
        await browser.wait(EC.visibilityOf(await element(by.id("security")), 180000, "**** NOT FOUND ****"));
        await browser.sleep(2000);
    },

    clickOnpendingRequestionTab: async function(){
        await element(by.id("security")).click();
        await browser.wait(EC.not(EC.visibilityOf(await element(by.xpath(obj.baseModule.login.loadingImage)), 180000, "API POLICIES NOT FOUND")));
        await browser.sleep(2000);
    },

    approveAllRequests: async function(){

        var target = await element(by.xpath("//label[@for='all-selected']/preceding-sibling::input"));

        await browser.actions()
            .mouseMove(target)
            .click(target)
            .perform();

        await browser.sleep(4000);
        await element(by.buttonText("Approve")).click();
        await browser.wait(EC.not(EC.visibilityOf(await element(by.xpath(obj.baseModule.login.loadingImage)), 180000, "API POLICIES NOT FOUND")));
        await browser.sleep(2000);
        expect(await element(by.xpath("//span[contains(text(),'approved successfully')]")).isPresent()).to.equal(true);
    }
}