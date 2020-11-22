var obj = require("../../properties/objects.json");
const { element, browser } = require("protractor");
const fs = require('fs');


var EC = protractor.ExpectedConditions;

module.exports = {

    clickCreateApplicationButton: async function () {
        await browser.wait(EC.visibilityOf(element(by.xpath(obj.Applications.createApplications.createApplicationButton)), 180000, "CREATE APPLICATION NOT FOUND"));
        await browser.sleep(3000);
        await element(by.xpath(obj.Applications.createApplications.createApplicationButton)).click();
    },

    createApplication: async function (applicationName, version, description) {
        await browser.wait(EC.visibilityOf(element(by.xpath(obj.Applications.createApplications.saveButton)), 180000, "CREATE APPLICATION PAGE NOT FOUND"));
        await browser.sleep(3000);
        await element(by.id(obj.Applications.createApplications.name)).sendKeys(applicationName);
        await element(by.id(obj.Applications.createApplications.version)).sendKeys(version);
        await element(by.id(obj.Applications.createApplications.description)).sendKeys(description);
    },

    clickSaveButtion: async function () {
        await element(by.xpath(obj.Applications.createApplications.saveButton)).click();
        await browser.wait(EC.visibilityOf(element(by.xpath(obj.Applications.createApplications.saveButton)), 180000, "CREATE APPLICATION FAILED"));
        await browser.sleep(3000);
    },

    clickAPIs: async function () {
        await element(by.xpath(obj.Applications.createApplications.APIs)).click();
        await browser.sleep(3000);
    },


    clickIdentifiers: async function(){
        await element(by.xpath(obj.Applications.createApplications.IndenfierLink)).click();
        await browser.sleep(3000);                
    },

    selectAPI: async function (apiName, apiversion) {
        for (i in apiName) {
            await element(by.xpath(obj.Applications.createApplications.findAPI)).clear()
            await element(by.xpath(obj.Applications.createApplications.findAPI)).sendKeys(apiName[i]);
            await browser.sleep(4000);
            await element(by.xpath(obj.Applications.createApplications.selectAPI1 + apiName[i] + obj.Applications.createApplications.selectAPI2 + apiversion[i] + obj.Applications.createApplications.selectAPI3)).click();
            await browser.sleep(3000);
        }
    },

    clickEditButtion: async function () {

        await element(by.xpath(obj.Applications.createApplications.editButton)).click();
        await browser.wait(EC.visibilityOf(element(by.xpath(obj.Applications.createApplications.saveButton)), 180000, "EDIT APPLICATION FAILED"));
    },


    addIdentifiers: async function(identifiers, username){
        await browser.wait(EC.visibilityOf(element(by.xpath("//span[text()='Other identifiers']")), 180000, "CREATE APPLICATION NOT FOUND"));
        await browser.sleep(3000);
        for (i in identifiers.IPaddressrange){
            await element(by.xpath("//input[@id='From']")).sendKeys(identifiers.IPaddressrange[i].from);
            await element(by.xpath("//input[@id='To']")).sendKeys(identifiers.IPaddressrange[i].to);
        }
        for(j in identifiers.otherIdentifiers){
            await element(by.xpath("//option[text()='"+identifiers.otherIdentifiers[j].key+"']")).click();
            await element(by.xpath("//input[@id='IdentifierValue']")).sendKeys(username);
            await element(by.xpath("//span[input-field[div[span[input[@id='IdentifierValue']]]]]/following-sibling::span//button")).click();
            await browser.sleep(1000);
        }
    },


    getAPIKey: async function () {
        var apiKey = await element(by.xpath("//td[contains(text(),'API access key')]/following-sibling::td")).getText();
        let fulltext = {
            keys: "x-Gateway-APIKey",
            values: apiKey
        };
        let data = JSON.stringify(fulltext, null, 2);

        fs.writeFile('./features/properties/runtimeData.json', data, (err) => {
            if (err) throw err;
        });
    }
}