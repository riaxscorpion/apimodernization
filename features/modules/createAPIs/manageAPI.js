var obj = require("../../properties/objects.json");

var EC = protractor.ExpectedConditions;

module.exports = {

    openCreatedAPI: async function (APIName, version) {
        await browser.wait(EC.visibilityOf(element(by.xpath(obj.createAPIs.manageAPI.waitToDisplayAllAPIs)), 180000, "APIs Not Found"));
        await browser.sleep(3000);
        await element(by.xpath(obj.createAPIs.manageAPI.openAPILink_1 + version + obj.createAPIs.manageAPI.openAPILink_2 + APIName + obj.createAPIs.manageAPI.openAPILink_3)).click();
        await browser.sleep(3000);
    },

    verifyCreatedAPIwithType: async function (apiName, apiType) {
        if (apiType == "OData")
            await browser.wait(EC.visibilityOf(element(by.xpath(obj.createAPIs.manageAPI.verifyODataAPI + apiName + obj.createAPIs.manageAPI.verifyAPILink)), 10000, "OData API Creation Failed"));
    },

    activateAPI: async function (apiName, version) {
        await browser.wait(EC.not(EC.visibilityOf(await element(by.xpath(obj.baseModule.login.loadingImage)), 180000, "API POLICIES NOT FOUND")));
        await browser.sleep(2000);
        await browser.actions().mouseMove(element(by.xpath(obj.createAPIs.manageAPI.activateIcon1 + apiName + obj.createAPIs.manageAPI.activateIcon2 + version + obj.createAPIs.manageAPI.activateIcon3))).perform();
        await element(by.xpath(obj.createAPIs.manageAPI.activateIcon1 + apiName + obj.createAPIs.manageAPI.activateIcon2 + version + obj.createAPIs.manageAPI.activateIcon3)).click();
        await browser.wait(EC.visibilityOf(element(by.xpath(obj.createAPIs.manageAPI.activateAPIWindow)), 10000, "Activation Window does not appear"));
        await element(by.xpath(obj.createAPIs.manageAPI.activateAPIYesButton)).click();
    },

    // publishAPI: async function(apiName){
    //     await element(by.xpath(obj.createAPIs.manageAPI.activateIcon1 + apiName + obj.createAPIs.manageAPI.publishIcon1)).click();
    //     await browser.wait(EC.visibilityOf(element(by.xpath(obj.createAPIs.manageAPI.publishButton)), 80000, "Publish Window does not appear"));
    //     await browser.sleep(5000);
    //     await element(by.xpath(obj.createAPIs.manageAPI.publishButton)).click();
    //     await browser.sleep(5000);
    //     await browser.wait(EC.visibilityOf(element(by.xpath(obj.createAPIs.manageAPI.publishMessage)), 180000, "Publish Failed"));
    //     await browser.sleep(3000);
    // },

    publishVersionedAPI: async function (apiName, version) {
        await browser.wait(EC.visibilityOf(element(by.linkText(obj.baseModule.headerLinks.APIlink)), 180000, "API LINK TEXT NOT FOUND"));
        await browser.sleep(3000);
        var publish = obj.createAPIs.manageAPI.versionPublishIcon1 + apiName + obj.createAPIs.manageAPI.versionPublishIcon2 + version + obj.createAPIs.manageAPI.versionPublishIcon3;
        await element(by.xpath(publish)).isPresent().then(async function (pubstatus) {
            if (pubstatus == true) {
                await element(by.xpath(publish)).click();
            } else {
                await element(by.xpath(obj.createAPIs.manageAPI.versionPublishIcon1 + apiName + obj.createAPIs.manageAPI.versionPublishIcon2 + version + obj.createAPIs.manageAPI.versionRepublishIcon3)).click();
            }
        });

        await browser.wait(EC.visibilityOf(element(by.xpath(obj.createAPIs.manageAPI.publishButton)), 60000, "Publish Window does not appear"));
        await browser.sleep(5000);
        await element(by.xpath(obj.createAPIs.manageAPI.publishButton)).click();
        await browser.sleep(5000);
        await browser.wait(EC.visibilityOf(element(by.xpath(obj.createAPIs.manageAPI.publishMessage)), 180000, "Publish Failed"));
    },


    publishAPIWithEndPoints: async function (apiName, http, https) {
        await element(by.xpath(obj.createAPIs.manageAPI.activateIcon1 + apiName + obj.createAPIs.manageAPI.publishIcon1)).click();
        await browser.wait(EC.visibilityOf(element(by.xpath(obj.createAPIs.manageAPI.publishButton)), 180000, "Publish Window does not appear"));
        await browser.sleep(5000);

        if (http == "http")
            await element(by.xpath(obj.createAPIs.manageAPI.httpEndPoint)).click();
        await browser.sleep(1000);
        if (https == "https")
            await element(by.xpath(obj.createAPIs.manageAPI.httpsEndPoint)).click();
        await browser.sleep(1000);

        await element(by.xpath(obj.createAPIs.manageAPI.publishButton)).click();
        await browser.sleep(5000);

        await browser.wait(EC.visibilityOf(element(by.xpath(obj.createAPIs.manageAPI.publishMessage)), 180000, "Publish Failed"));
    },

    publishAPINew: async function (apiName, version, protocols) {
        await browser.wait(EC.not(EC.visibilityOf(await element(by.xpath(obj.baseModule.login.loadingImage)), 180000, "API POLICIES NOT FOUND")));

        await browser.sleep(5000);
        var publish = obj.createAPIs.manageAPI.versionPublishIcon1 + apiName + obj.createAPIs.manageAPI.versionPublishIcon2 + version + obj.createAPIs.manageAPI.versionPublishIcon3;
        var republish = obj.createAPIs.manageAPI.versionPublishIcon1 + apiName + obj.createAPIs.manageAPI.versionPublishIcon2 + version + obj.createAPIs.manageAPI.versionRepublishIcon3;
        await element(by.xpath(publish)).isPresent().then(async function (pubstatus) {
            if (pubstatus == true) {
                await browser.actions().mouseMove(element(by.xpath(publish))).perform();
                await element(by.xpath(publish)).click();
            } else {
                await browser.actions().mouseMove(element(by.xpath(republish))).perform();
                await element(by.xpath(republish)).click();
            }
        });

        await browser.wait(EC.visibilityOf(element(by.xpath(obj.createAPIs.manageAPI.publishButton)), 160000, "Publish Window does not appear"));
        await browser.sleep(5000);

        var http = obj.createAPIs.manageAPI.httpEndPoint;
        var https = obj.createAPIs.manageAPI.httpsEndPoint;

        await element(by.xpath(obj.createAPIs.manageAPI.endPointLabel1)).getText().then(function (actualText) {
            if (actualText.indexOf('https://') !== -1) {
                https = [http, http = https][0];
            }
        });
        for (var i in protocols) {

            if (protocols[i].protocol == "http") {
                if (protocols[i].status != null) {
                    if (protocols[i].status == true) {
                        if (!(await element(by.xpath(http)).isSelected())) {
                            await element(by.xpath(http)).click();
                            await browser.sleep(1000);
                        }
                    }
                    else if (protocols[i].status == false) {
                        if ((await element(by.xpath(http)).isSelected())) {
                            await element(by.xpath(http)).click();
                            await browser.sleep(1000);
                        }
                    }
                }
            }

            if (protocols[i].protocol == "https") {
                if (protocols[i].status != null) {
                    if (protocols[i].status == true) {
                        if (!(await element(by.xpath(https)).isSelected())) {
                            await element(by.xpath(https)).click();
                            await browser.sleep(1000);
                        }
                    }
                    else if (protocols[i].status == false) {
                        if ((await element(by.xpath(https)).isSelected())) {
                            await element(by.xpath(https)).click();
                            await browser.sleep(1000);
                        }
                    }
                }
            }
        }

        await element(by.xpath(obj.createAPIs.manageAPI.publishButton)).click();
        await browser.sleep(5000);
        await browser.wait(EC.visibilityOf(element(by.xpath(obj.createAPIs.manageAPI.publishMessage)), 180000, "Publish Failed"));
    },


    unPublishAPI: async function (apiName, version) {
        await browser.sleep(2000);
        await browser.actions().mouseMove(element(by.xpath(obj.createAPIs.manageAPI.activateIcon1 + apiName + obj.createAPIs.manageAPI.activateIcon2 + version + obj.createAPIs.manageAPI.unPublishIcon1))).perform();
        await element(by.xpath(obj.createAPIs.manageAPI.activateIcon1 + apiName + obj.createAPIs.manageAPI.activateIcon2 + version + obj.createAPIs.manageAPI.unPublishIcon1)).click();
        await browser.wait(EC.visibilityOf(element(by.xpath(obj.createAPIs.manageAPI.unPublishButton)), 60000, "UnPublish Window does not appear"));
        await browser.sleep(2000);
        await element(by.xpath("//span[text()='Force unpublish']")).click();
        await browser.sleep(2000);
        await element(by.xpath(obj.createAPIs.manageAPI.unPublishButton)).click();
        await browser.sleep(2000);
        await browser.wait(EC.visibilityOf(element(by.xpath(obj.createAPIs.manageAPI.publishMessage)), 180000, "UnPublish Failed"));
    },

    deleteAPI: async function (apiName, version) {
        await browser.actions().mouseMove(element(by.xpath(obj.createAPIs.manageAPI.activateIcon1 + apiName + obj.createAPIs.manageAPI.activateIcon2 + version + obj.createAPIs.manageAPI.deleteIcon))).perform();
        await element(by.xpath(obj.createAPIs.manageAPI.activateIcon1 + apiName + obj.createAPIs.manageAPI.activateIcon2 + version + obj.createAPIs.manageAPI.deleteIcon)).click();
        await browser.wait(EC.visibilityOf(element(by.xpath(obj.createAPIs.manageAPI.deleteYesButton)), 10000, "Deletion Window does not appear"));
        await browser.sleep(1000);
        await element(by.xpath(obj.createAPIs.manageAPI.deleteYesButton)).click();
        await browser.wait(EC.not(EC.visibilityOf(await element(by.xpath(obj.baseModule.login.loadingImage)), 180000, "API POLICIES NOT FOUND")));
        await browser.sleep(2000);
    },

    selectAPI: async function (apiName, version) {
        await browser.sleep(2000);
        await element(by.css('#manage-chk null')).click();
        // await element(by.xpath(obj.createAPIs.manageAPI.activateIcon1 + apiName + obj.createAPIs.manageAPI.activateIcon2 + version + obj.createAPIs.manageAPI.selectCheckBox3)).click();
    },

    settingsButton: async function () {
        await element(by.xpath("//div[@id='docketAction']/button")).click();
        await browser.sleep(1000);
    },

    globalUnpublish: async function () {
        await element(by.xpath("//a[@title='Unpublish']")).click();
        await browser.wait(EC.visibilityOf(element(by.xpath(obj.createAPIs.manageAPI.unPublishButton)), 60000, "UnPublish Window does not appear"));
        await browser.sleep(2000);
        await element(by.xpath(obj.createAPIs.manageAPI.unPublishButton)).click();
        await browser.sleep(2000);
        await browser.wait(EC.visibilityOf(element(by.xpath("//div[contains(text(),'unpublished successfully')]")), 180000, "UnPublish Failed"));
        await element(by.xpath("//div[span[a[text()='Download the detailed report here>']]]/following-sibling::div//button[text()='Close']")).click();
        await browser.wait(EC.not(EC.visibilityOf(await element(by.xpath(obj.baseModule.login.loadingImage)), 180000, "API POLICIES NOT FOUND")));
        await browser.sleep(2000);
    },

    globalDelete: async function () {
        await element(by.xpath("//a[@title='Delete']")).click();
        await browser.wait(EC.visibilityOf(element(by.xpath("//button[text()='Delete']")), 10000, "Deletion Window does not appear"));
        await element(by.xpath("//button[text()='Delete']")).click();
        await browser.wait(EC.visibilityOf(element(by.xpath("//div[contains(text(),'deleted successfully')]")), 180000, "Delete Failed"));
        await element(by.xpath("//div[span[a[text()='Download the detailed report here>']]]/following-sibling::div//button[text()='Close']")).click();
        await browser.wait(EC.not(EC.visibilityOf(await element(by.xpath(obj.baseModule.login.loadingImage)), 180000, "API POLICIES NOT FOUND")));
        await browser.sleep(2000);
    }
}