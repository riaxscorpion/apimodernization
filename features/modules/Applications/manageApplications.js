var obj = require("../../properties/objects.json");
var obj = require("../../properties/objects.json");

var EC = protractor.ExpectedConditions;

module.exports = {

    clickApplication: async function(applicationName){
        await element(by.xpath(obj.Applications.manageApplications.selectApplication1 + applicationName + obj.Applications.manageApplications.selectApplication2)).click();
        await browser.wait(EC.not(EC.visibilityOf(await element(by.xpath(obj.baseModule.login.loadingImage)), 180000, "API POLICIES NOT FOUND")));
        await browser.sleep(2000);
    },


    selectApplication: async function(applicationName){
        await element(by.xpath("//td[label[@title='"+applicationName+"']]/preceding-sibling::td//label")).click();
    },


    deleteApplication: async function(applicationName){
        await browser.wait(EC.not(EC.visibilityOf(await element(by.xpath(obj.baseModule.login.loadingImage)), 180000, "API POLICIES NOT FOUND")));
        await browser.sleep(2000);
        await element(by.xpath("//td[label[@title='"+applicationName+"']]/following-sibling::td//span[@title='Delete']")).click();
        await browser.wait(EC.visibilityOf(await element(by.xpath("//div[div[text()='Delete Application']]/following-sibling::div[@class='modal-body']//button[text()='Yes']")), 180000, "API POLICIES NOT FOUND"));
        await element(by.xpath("//div[div[text()='Delete Application']]/following-sibling::div[@class='modal-body']//button[text()='Yes']")).click();
        await browser.wait(EC.not(EC.visibilityOf(await element(by.xpath(obj.baseModule.login.loadingImage)), 180000, "API POLICIES NOT FOUND")));
        await browser.sleep(2000);
    },

    addHeader: async function (key, value) {
        for (i in key) {
            await element(by.xpath(obj.Applications.manageApplications.headerIdentifiersKey)).sendKeys(key[i]);
            await browser.sleep(2000);
            await element(by.xpath(obj.Applications.manageApplications.headerIdentifiersValue)).sendKeys(value[i]);
            await browser.sleep(2000);
            await element(by.xpath(obj.Applications.manageApplications.headerIdentifiersAddButton)).click();
            await browser.sleep(2000);
        }
        await browser.wait(EC.not(EC.visibilityOf(await element(by.xpath(obj.baseModule.login.loadingImage)), 180000, "API APPLICATION HEADER NOT FOUND")));
        await browser.sleep(2000);
    },

    clickSaveButton: async function () {
        await element(by.xpath(obj.Applications.manageApplications.saveButton)).click();
        await browser.sleep(2000);
    }
    
}