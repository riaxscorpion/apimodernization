var obj = require("../../properties/objects.json");

var EC = protractor.ExpectedConditions;

module.exports = {
    clickAPIHeader: async function(){
        await browser.wait(EC.visibilityOf(element(by.linkText(obj.baseModule.headerLinks.APIlink)), 180000, "API LINK TEXT NOT FOUND"));
        await browser.sleep(3000);
        await element(by.linkText(obj.baseModule.headerLinks.APIlink)).click();
        await browser.sleep(3000);
    },

    clickApplicationsHeader: async function(){
        await browser.wait(EC.visibilityOf(element(by.xpath(obj.baseModule.headerLinks.applicationsLink)), 180000, "API LINK TEXT NOT FOUND"));
        await browser.sleep(3000);
        await element(by.xpath(obj.baseModule.headerLinks.applicationsLink)).click();
        await browser.sleep(3000);
    },

    clickPoliciesHeader: async function(){
        await browser.wait(EC.visibilityOf(element(by.linkText(obj.baseModule.headerLinks.PoliciesLink)), 180000, "API LINK TEXT NOT FOUND"));
        await element(by.linkText(obj.baseModule.headerLinks.PoliciesLink)).click();
    }
}