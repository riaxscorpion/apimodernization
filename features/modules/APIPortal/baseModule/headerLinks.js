var obj = require("../../../properties/objects.json");

var EC = protractor.ExpectedConditions;

module.exports = {
    clickAPIGallery: async function(){
        await element(by.xpath(obj.apiPortal.baseModule.headerLinks.apiGalleryLink)).click();
        await browser.wait(EC.not(EC.visibilityOf(await element(by.id(obj.apiPortal.baseModule.login.loadingPage)), 180000, "API POLICIES NOT FOUND")));
        await browser.sleep(10000);      
    }
}