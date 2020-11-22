var obj = require("../../properties/objects.json");

var EC = protractor.ExpectedConditions;

module.exports = {
    loginToAPIGateway: async function(url, username, password){
        await browser.driver.manage().window().maximize();
        await browser.get(url);
        await browser.wait(EC.not(EC.visibilityOf(await element(by.xpath(obj.baseModule.login.loadingImage)), 180000, "API POLICIES NOT FOUND")));
        await browser.sleep(2000);
        await element(by.id(obj.baseModule.login.password)).isPresent().then(async function (res) {
            if (res == true) {
                await element(by.id(obj.baseModule.login.username)).sendKeys(username);
                await element(by.id(obj.baseModule.login.password)).sendKeys(password);
                await element(by.id(obj.baseModule.login.loginButton)).click();
            }
        });
        await browser.sleep(3000);
    },

    loginToAPIPortal: async function(url, username, password){
        await browser.driver.manage().window().maximize();
        await browser.get(url);
        await browser.wait(EC.not(EC.visibilityOf(await element(by.xpath(obj.baseModule.login.loadingImage)), 180000, "API POLICIES NOT FOUND")));
        await browser.sleep(2000);
        await element(by.id(obj.baseModule.login.password)).isPresent().then(async function (res) {
            if (res == true) {
                await element(by.id(obj.baseModule.login.username)).sendKeys(username);
                await element(by.id(obj.baseModule.login.password)).sendKeys(password);
                await element(by.id(obj.baseModule.login.loginButton)).click();
            }
        });
        await browser.sleep(3000);
        await browser.wait(EC.visibilityOf(element(by.xpath(obj.apiPortal.baseModule.login.appSwitcher)), 180000, "API LINK TEXT NOT FOUND"));
        await browser.sleep(3000);
        await element(by.xpath(obj.apiPortal.baseModule.login.appSwitcher)).click();
        await browser.sleep(2000);
        await element(by.xpath(obj.apiPortal.baseModule.login.apiPortalLink)).click();
        await browser.sleep(5000);
        await browser.wait(EC.visibilityOf(element(by.xpath(obj.apiPortal.baseModule.headerLinks.apiGalleryLink)), 180000, "API PORTAL NOT FOUND"));
    }
}