var obj = require("../../properties/objects.json");

var EC = protractor.ExpectedConditions;

module.exports = {

    verifyActivateWindow: async function(){
        await browser.wait(EC.visibilityOf(element(by.xpath(obj.createAPIs.manageAPI.activateAPIWindow)), 10000, "Activation Window does not appear"));
        await element(by.xpath(obj.createAPIs.manageAPI.activateAPIYesButton)).click();
        await browser.wait(EC.visibilityOf(element(by.linkText(obj.baseModule.headerLinks.APIlink)), 180000, "API LINK TEXT NOT FOUND"));
    }

}