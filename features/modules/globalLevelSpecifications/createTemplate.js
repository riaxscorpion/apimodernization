var obj = require("../../properties/objects.json");
const { element } = require("protractor");
var chai = require('chai');
var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
var expect = chai.expect;

var EC = protractor.ExpectedConditions;

var objTemplate = obj.globalLevelSpecifications.createTemplate;

module.exports = {

    clickPolicyTemplateLink: async function () {
        await browser.wait(EC.not(EC.visibilityOf(await element(by.xpath(obj.baseModule.login.loadingImage)), 180000, "API POLICIES NOT FOUND")));
        await browser.sleep(2000);
        await element(by.id(objTemplate.policyTemplateLink)).click();
    },

    clickCreatePolicyTemplateButton: async function () {
        await browser.wait(EC.not(EC.visibilityOf(await element(by.xpath(obj.baseModule.login.loadingImage)), 180000, "API POLICIES NOT FOUND")));
        await browser.sleep(2000);
        await element(by.xpath(objTemplate.createPolicyTemplateButton)).click();
    },

    clickPolicyConfButton: async function () {
        await browser.wait(EC.not(EC.visibilityOf(await element(by.xpath(obj.baseModule.login.loadingImage)), 180000, "API POLICIES NOT FOUND")));
        await browser.sleep(2000);
        await element(by.id(objTemplate.policiesConfButton)).click();
    },

    createTemplatePolicy: async function (name, description) {
        await browser.wait(EC.not(EC.visibilityOf(await element(by.xpath(obj.baseModule.login.loadingImage)), 180000, "API POLICIES NOT FOUND")));
        await browser.sleep(2000);
        await element(by.id(objTemplate.templateName)).sendKeys(name);
        await element(by.id(objTemplate.templateDescription)).sendKeys(description);
    },

    clickSaveButton: async function () {
        await element(by.xpath(objTemplate.saveButton)).click();
        await browser.wait(EC.not(EC.visibilityOf(await element(by.xpath(obj.baseModule.login.loadingImage)), 180000, "API POLICIES NOT FOUND")));
        await browser.sleep(2000);
    },

    verifyTemplateCreated: async function (templateName) {
        await browser.wait(EC.not(EC.visibilityOf(await element(by.xpath(obj.baseModule.login.loadingImage)), 180000, "API POLICIES NOT FOUND")));
        await browser.sleep(2000);
        expect(await element(by.xpath(objTemplate.verifyTemplate_1 + templateName + objTemplate.verifyTemplate_2)).isPresent()).to.equal(true);
    },

    deleteTemplate: async function(templateName){
        await browser.wait(EC.not(EC.visibilityOf(await element(by.xpath(obj.baseModule.login.loadingImage)), 180000, "API POLICIES NOT FOUND")));
        await browser.sleep(2000);
        await element(by.xpath("//td[label[@title='"+templateName+"']]/following-sibling::td//span[@title='Delete']")).click();
        await browser.wait(EC.visibilityOf(await element(by.xpath("//div[div[text()='Delete policy template']]/following-sibling::div[@class='modal-body']//button[text()='Yes']")), 180000, "API POLICIES NOT FOUND"));
        await element(by.xpath("//div[div[text()='Delete policy template']]/following-sibling::div[@class='modal-body']//button[text()='Yes']")).click();
        await browser.wait(EC.not(EC.visibilityOf(await element(by.xpath(obj.baseModule.login.loadingImage)), 180000, "API POLICIES NOT FOUND")));
        await browser.sleep(2000);
    }
}