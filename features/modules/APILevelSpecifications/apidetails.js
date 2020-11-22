var obj = require("../../properties/objects.json");

var EC = protractor.ExpectedConditions;

module.exports = {

    verifyREST_OData_04API: async function(){

        await browser.wait(EC.visibilityOf(element(by.id("apidetails")), 180000, "API LINK TEXT NOT FOUND"));
        await element(by.xpath(obj.APILevelSpecfications.APIdetails.restOdata04_1)).click();
        expect(by.xpath(obj.APILevelSpecfications.APIdetails.restOdata04_2));
        expect(by.xpath(obj.APILevelSpecfications.APIdetails.restOdata04_2));

    },

    clickActivateButton: async function(){
        await element(by.xpath(obj.APILevelSpecfications.APIdetails.activateButton)).click();
        await browser.wait(EC.not(EC.visibilityOf(await element(by.xpath(obj.baseModule.login.loadingImage)), 180000, "API POLICIES NOT FOUND")));
        await browser.sleep(2000);
    },


    clickCreateNewVersionButton: async function(){
        await browser.wait(EC.not(EC.visibilityOf(await element(by.xpath(obj.baseModule.login.loadingImage)), 180000, "API POLICIES NOT FOUND")));
        await browser.sleep(2000);
        await element(by.xpath(obj.APILevelSpecfications.APIdetails.createNewVersionButton)).click();
        await browser.wait(EC.not(EC.visibilityOf(await element(by.xpath(obj.baseModule.login.loadingImage)), 180000, "API POLICIES NOT FOUND")));
        await browser.sleep(2000);
    },

    setVerionName: async function(version){

        await element(by.xpath(obj.APILevelSpecfications.APIdetails.versionTextBox)).sendKeys(version);
        await browser.sleep(3000);

    },

    clickCreateButton: async function(){

        await element(by.xpath(obj.APILevelSpecfications.APIdetails.createButton)).click();
        await browser.sleep(3000);
        await browser.wait(EC.visibilityOf(element(by.xpath(obj.APILevelSpecfications.APIdetails.activateButton)), 180000, "API ACTIVATE BUTTON NOT FOUND"));

    },

    clickResourcesAndMethods: async function(){

        await element(by.xpath(obj.APILevelSpecfications.APIdetails.resourcesAndMethods)).click();
        await browser.sleep(3000);

    },

    clickAddResourcesButton: async function(){

        await element(by.xpath(obj.APILevelSpecfications.APIdetails.addResourcesButton)).click();
        await browser.sleep(3000);

    },

    setResourceName: async function(resourceName){

        await element(by.id(obj.APILevelSpecfications.APIdetails.resourceName)).sendKeys(resourceName);
        await browser.sleep(1000);

    },

    setResourcePath: async function(resourcePath){

        await element(by.id(obj.APILevelSpecfications.APIdetails.resourcePath)).sendKeys(resourcePath);
        await browser.sleep(1000);

    },

    setSupportedMethods: async function(supportedMethods){

        var sm = supportedMethods.split(",");
        
        for (var i in sm)
        {
            await element(by.xpath(obj.APILevelSpecfications.APIdetails.resourceMethod1 + sm[i].trim() + obj.APILevelSpecfications.APIdetails.resourceMethod2)).click();
            await browser.sleep(1000);
        }
    
    },

    clickAddButton: async function() {

        await element(by.xpath(obj.APILevelSpecfications.APIdetails.addButton)).click();
        await browser.sleep(3000);

    },

    clickEditButton: async function() {
        await browser.wait(EC.not(EC.visibilityOf(await element(by.xpath(obj.baseModule.login.loadingImage)), 180000, "API POLICIES NOT FOUND")));
        await browser.sleep(2000);
        await element(by.xpath(obj.APILevelSpecfications.APIdetails.editButton)).click();
        await browser.sleep(3000);

    }

}