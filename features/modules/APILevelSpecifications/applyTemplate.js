var obj = require("../../properties/objects.json");
const { element, browser } = require("protractor");
var chai = require('chai');
var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
var expect = chai.expect;

var EC = protractor.ExpectedConditions;

var objTemplate = obj.APILevelSpecfications.Policies.applyTemplate;


module.exports = {
    clickApplyTemplateButton: async function () {
        await browser.wait(EC.elementToBeClickable(await element(by.xpath(objTemplate.clickApplyTemplateButton)), 180000, "API POLICIES NOT FOUND"));
        await element(by.xpath(objTemplate.clickApplyTemplateButton)).click();
    },

    chooseTemplate: async function (templateName) {
        await browser.wait(EC.not(EC.visibilityOf(await element(by.xpath(obj.baseModule.login.loadingImage)), 180000, "API POLICIES NOT FOUND")));
        await browser.sleep(2000);
        await element(by.xpath(objTemplate.chooseTemplate_1 + templateName + objTemplate.chooseTemplate_2)).click();
        await browser.sleep(4000);
        await element(by.xpath(objTemplate.nextbutton)).click();
    },

    deleteConflictPolicies: async function () {

    },

    applyTemplate: async function () {
        await browser.wait(EC.not(EC.visibilityOf(await element(by.xpath(obj.baseModule.login.loadingImage)), 180000, "API POLICIES NOT FOUND")));
        await browser.sleep(6000);
        await element(by.xpath(objTemplate.importWithConflicts)).isPresent().then(async function (conflict) {
            if (conflict) {
                await element(by.xpath(objTemplate.importWithConflicts)).click();
            } else {
                await element(by.xpath(objTemplate.importbutton)).click();
            }
        });
    }
}