var obj = require("../../properties/objects.json");
var path = require("path");
const { protractor, Ptor } = require("protractor/built/ptor");
const { browser } = require("protractor");

var EC = protractor.ExpectedConditions;

module.exports = {
    clickCreateAPIButton: async function(){
        await browser.wait(EC.visibilityOf(element(by.buttonText(obj.createAPIs.createAPI.createAPIButton)), 180000, "API LINK TEXT NOT FOUND"));
        await browser.sleep(3000);
        await element(by.buttonText(obj.createAPIs.createAPI.createAPIButton)).click();
    },

    clickImportURL: async function(){
        await browser.wait(EC.visibilityOf(element(by.xpath(obj.createAPIs.createAPI.importFromURLRadioButton)), 180000, "Import URL NOT FOUND"));
        await browser.sleep(2000);
        await element(by.xpath(obj.createAPIs.createAPI.importFromURLRadioButton)).click();
        await browser.sleep(2000);
    },

    createAPIFromURL: async function(urlValue, apiName, apiType, version){
        await element(by.id(obj.createAPIs.createAPI.url)).sendKeys(urlValue);
        await element(by.xpath(obj.createAPIs.createAPI.apiNameURL)).sendKeys(apiName);
        await element(by.xpath(obj.createAPIs.createAPI.fileTypeURL + apiType + obj.createAPIs.createAPI.commonEndingXpath)).click();
        await element(by.xpath(obj.createAPIs.createAPI.versionURL)).sendKeys(version); 
    },

    clickCreateButtonURL: async function(){
        await element(by.xpath(obj.createAPIs.createAPI.createButtonURL)).click();
        await browser.wait(EC.visibilityOf(element(by.xpath(obj.createAPIs.createAPI.activateButton)), 180000, "Activate Button NOT FOUND"));
        await browser.sleep(2000);
    },

    createAPIFromFile: async function(filePath, apiName, apiType, version){
        
        await browser.sleep(5000);
        await this.uploadFile(filePath);

        await element(by.xpath(obj.createAPIs.createAPI.apiNameFile)).sendKeys(apiName);
        await element(by.xpath(obj.createAPIs.createAPI.fileTypeFile + apiType + obj.createAPIs.createAPI.commonEndingXpath)).click();
        await element(by.xpath(obj.createAPIs.createAPI.versionFile)).sendKeys(version); 
    },

    uploadFile: async function (filePath) {

        var absolutePath = path.resolve(filePath);
        var fileElem = protractor.element.all(protractor.By.css('input[type="file"]'));
        fileElem.sendKeys(absolutePath);
        await browser.sleep(5000);
    },

    

    clickCreateButtonFile: async function(){
        await element(by.xpath(obj.createAPIs.createAPI.createButtonFile)).click();
        await browser.wait(EC.visibilityOf(element(by.xpath(obj.createAPIs.createAPI.activateButton)), 180000, "Activate Button NOT FOUND"));
        await browser.sleep(2000);
    },

    clickCreateAPIFromScratch: async function(){
        await browser.wait(EC.visibilityOf(element(by.xpath(obj.createAPIs.createAPI.createAPIfromScratchRadioButton)), 180000, "Import URL NOT FOUND"));
        await browser.sleep(2000);
        await element(by.xpath(obj.createAPIs.createAPI.createAPIfromScratchRadioButton)).click();
        await browser.sleep(2000);
    },

    clickCreateButtonScratch: async function(){
        await element(by.xpath(obj.createAPIs.createAPI.createButtonScratch)).click();
        await browser.wait(EC.visibilityOf(element(by.xpath(obj.createAPIs.createAPI.saveButton)), 180000, "Save Button NOT FOUND"));
        await browser.sleep(2000);
    },

    setAPIBasicInformation: async function(apiName, version){
        await element(by.id(obj.createAPIs.createAPI.apiName)).sendKeys(apiName);
        // await element(by.id(obj.createAPIs.createAPI.version)).sendKeys(version);
    },

    clickTechnicalInformation: async function(){
        await element(by.xpath(obj.createAPIs.createAPI.technicalInformation)).click();
        await browser.sleep(2000);
    },

    addServerDetails: async function(serverURL) {
        await element(by.xpath(obj.createAPIs.createAPI.serverURL)).sendKeys(serverURL);
    },

    clickAddButton: async function(){
        await element(by.xpath(obj.createAPIs.createAPI.addButton)).click();
        await browser.sleep(2000);
    },

    clickSaveButton: async function(){
        await element(by.xpath(obj.createAPIs.createAPI.saveButton)).click();
        await browser.sleep(10000);
    }
    
}