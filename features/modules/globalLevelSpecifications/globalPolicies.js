var obj = require("../../properties/objects.json");
var pol = require("../APILevelSpecifications/policies");
var globalPolicy = require("../baseModule/headerLinks");
const { element, browser } = require("protractor");
var chai = require('chai');
var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
var expect = chai.expect;

var EC = protractor.ExpectedConditions;

var objGlobal = obj.globalLevelSpecifications.globalPolicies;

module.exports = {

    clickGlobalPolicyLink: async function () {
        await browser.wait(EC.not(EC.visibilityOf(await element(by.xpath(obj.baseModule.login.loadingImage)), 180000, "API POLICIES NOT FOUND")));
        await browser.sleep(5000);
        await element(by.id(objGlobal.globalPolicyLink)).click();
    },

    clickCreateGlobalPolicyButton: async function () {
        await browser.wait(EC.not(EC.visibilityOf(await element(by.xpath(obj.baseModule.login.loadingImage)), 180000, "API POLICIES NOT FOUND")));
        await browser.sleep(2000);
        await element(by.xpath(objGlobal.createGlobalPolicyButton)).click();
    },

    clickPolicyConfButton: async function () {
        await browser.wait(EC.not(EC.visibilityOf(await element(by.xpath(obj.baseModule.login.loadingImage)), 180000, "API POLICIES NOT FOUND")));
        await browser.sleep(2000);
        await element(by.id(objGlobal.policiesconfButton)).click();
    },

    createGlobalPolicy: async function (name, description) {
        await browser.wait(EC.not(EC.visibilityOf(await element(by.xpath(obj.baseModule.login.loadingImage)), 180000, "API POLICIES NOT FOUND")));
        await browser.sleep(2000);
        await element(by.id(objGlobal.globalName)).sendKeys(name);
        await element(by.id(objGlobal.globalDescription)).sendKeys(description);
    },

    applyGlobalPolicyFilters: async function (globalPolicyFilters) {
        await element(by.linkText(objGlobal.applyGlobalFiltersLink)).click();
        await browser.wait(EC.not(EC.visibilityOf(await element(by.xpath(obj.baseModule.login.loadingImage)), 180000, "API POLICIES NOT FOUND")));
        await browser.sleep(2000);
        for (i in globalPolicyFilters.apiType) {
            await element(by.xpath(objGlobal.globalAPIType_1 + globalPolicyFilters.apiType[i] + objGlobal.globalAPIType_2)).isSelected().then(async function(apitypestatus){
                if(apitypestatus == false){
                    await element(by.xpath(objGlobal.globalAPIType_1 + globalPolicyFilters.apiType[i] + objGlobal.globalAPIType_3)).click();
                }
            });
        }
        await browser.sleep(1000);
        for (j in globalPolicyFilters.httpMethods) {
            await element(by.xpath(objGlobal.globalHttpMethod + globalPolicyFilters.httpMethods[j] + objGlobal.globeCommon)).click();
        }
        await browser.sleep(1000);
        await element(by.xpath(objGlobal.globalLogOperator + globalPolicyFilters.logicalOperator + objGlobal.globeCommon)).click();
        for (k in globalPolicyFilters.apiAttributes) {
            await element(by.xpath(objGlobal.globalApiAttribute + globalPolicyFilters.apiAttributes[k].attribute + objGlobal.globeCommon)).click();
            await element(by.xpath(objGlobal.globalApiAttribute + globalPolicyFilters.apiAttributes[k].operator + objGlobal.globeCommon)).click();
            await element(by.id(objGlobal.globalApiAttributeValue)).sendKeys(globalPolicyFilters.apiAttributes[k].value);
            await element(by.xpath(objGlobal.globalAddButton)).click();
            await browser.sleep(1000);
        }
        await browser.sleep(4000);
    },

    clickSaveButton: async function () {
        await element(by.xpath(objGlobal.globeSaveButton)).click();
        await browser.wait(EC.not(EC.visibilityOf(await element(by.xpath(obj.baseModule.login.loadingImage)), 180000, "API POLICIES NOT FOUND")));
        await browser.sleep(5000);
    },

    verifyGlobalPolicyAppliedInAPILevel: async function (verifyGlobalPolicyApplied) {
        for (i in verifyGlobalPolicyApplied) {
            await pol.clickOnPolicyCategoryName(verifyGlobalPolicyApplied[i].PolicyCategoryName);
            await pol.verifyPolicyCategoryOpens(verifyGlobalPolicyApplied[i].PolicyCategoryName);
            expect(await element(by.xpath(objGlobal.globePolicyAPILevel_1 + verifyGlobalPolicyApplied[i].policyPropertyName + objGlobal.globePolicyAPILevel_2)).isPresent()).to.equal(true);
            expect(await element(by.xpath(objGlobal.globePolicyAPILevel_1 + verifyGlobalPolicyApplied[i].policyPropertyName + objGlobal.globePolicyAPILevel_3)).isPresent()).to.equal(true);
        }
    },

    activateGlobalPolicy: async function(globalPolicyName){
        await browser.wait(EC.not(EC.visibilityOf(await element(by.xpath(obj.baseModule.login.loadingImage)), 180000, "API POLICIES NOT FOUND")));
        await browser.sleep(2000);
        await globalPolicy.clickPoliciesHeader();
        await this.clickGlobalPolicyLink();
        await browser.wait(EC.not(EC.visibilityOf(await element(by.xpath(obj.baseModule.login.loadingImage)), 180000, "API POLICIES NOT FOUND")));
        await browser.sleep(2000);
        await element(by.xpath(objGlobal.globeActivate_1+globalPolicyName+objGlobal.globeActivate_2)).click();
        await browser.wait(EC.visibilityOf(await element(by.xpath(objGlobal.globeYes)), 180000, "**** NOT FOUND"));
        await browser.sleep(2000);
        await element(by.xpath(objGlobal.globeYes)).click().then(async function(){
            await browser.sleep(8000);
            await element(by.xpath(objGlobal.globeError)).isPresent().then(async function(error){
                if(error){
                    var polerror = await element(by.xpath(objGlobal.globeGetError)).getText();
                    await element(by.xpath(objGlobal.globeCloseError)).click();
                    throw new Error(polerror);
                }
            });
        }); 
    },

    deleteGlobalPolicies: async function(globalPolicyName){
        await browser.wait(EC.not(EC.visibilityOf(await element(by.xpath(obj.baseModule.login.loadingImage)), 180000, "API POLICIES NOT FOUND")));
        await browser.sleep(2000);
        await element(by.xpath("//td[label[@title='"+globalPolicyName+"']]/following-sibling::td//span[@title='Delete']")).click();
        await browser.wait(EC.visibilityOf(await element(by.xpath("//div[div[text()='Delete global policy']]/following-sibling::div[@class='modal-body']//button[text()='Yes']")), 180000, "API POLICIES NOT FOUND"));
        await element(by.xpath("//div[div[text()='Delete global policy']]/following-sibling::div[@class='modal-body']//button[text()='Yes']")).click();
        await browser.wait(EC.not(EC.visibilityOf(await element(by.xpath(obj.baseModule.login.loadingImage)), 180000, "API POLICIES NOT FOUND")));
        await browser.sleep(2000);
    }
}