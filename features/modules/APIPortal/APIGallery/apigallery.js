var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = chai.expect;

var obj = require("../../../properties/objects.json");
const { element } = require('protractor');
const { WebdriverBy } = require('protractor/built/locators');
var EC = protractor.ExpectedConditions;

module.exports = {

    clickViewDetailsOfAPI: async function (apiName) {
        await browser.wait(EC.not(EC.visibilityOf(await element(by.id(obj.apiPortal.baseModule.login.loadingPage)), 180000, "API POLICIES NOT FOUND")));
        await browser.sleep(2000);
        await element(by.xpath(obj.apiPortal.apiGallery.viewDetails1 + apiName + obj.apiPortal.apiGallery.viewDetails2)).click();
        await browser.sleep(6000);
    },

    selectAPIVerision: async function (version) {
        await browser.wait(EC.not(EC.visibilityOf(await element(by.id(obj.apiPortal.baseModule.login.loadingPage)), 180000, "API POLICIES NOT FOUND")));
        await browser.sleep(2000);
        await element(by.xpath(obj.apiPortal.apiDetails.general.versionDropDown)).click();
        await browser.sleep(2000);

        await element(by.xpath(obj.apiPortal.apiDetails.general.selectVersion1 + version + obj.apiPortal.apiDetails.general.selectVersion2)).click();
        await browser.sleep(2000);
    },

    verifyAPIVerision: async function (version) {

        await element(by.xpath(obj.apiPortal.apiDetails.general.versionDropDown)).click();
        await browser.sleep(2000);

        expect(await element(by.xpath(obj.apiPortal.apiDetails.general.selectedVersionValue)).getText()).to.contains(version);
    },

    clickOnTryAPI: async function () {
        await browser.wait(EC.not(EC.visibilityOf(await element(by.id(obj.apiPortal.baseModule.login.loadingPage)), 180000, "API POLICIES NOT FOUND")));
        await browser.sleep(2000);
        await element(by.xpath(obj.apiPortal.apiDetails.general.tryAPIButton)).click();
        await browser.sleep(5000);
    },

    clickMethod: async function (methodHeadingName, methodName) {
        await browser.wait(EC.not(EC.visibilityOf(await element(by.id(obj.apiPortal.baseModule.login.loadingPage)), 180000, "API POLICIES NOT FOUND")));
        await browser.sleep(4000);

        if (methodHeadingName != "") {
            await element(by.xpath(obj.apiPortal.apiDetails.general.methodHeading3 + methodHeadingName + obj.apiPortal.apiDetails.general.methodHeading4 + obj.apiPortal.apiDetails.general.methodButton1 + methodName + obj.apiPortal.apiDetails.general.methodButton2)).click();
        }
        else {
            await element(by.xpath(obj.apiPortal.apiDetails.general.methodButton1 + methodName + obj.apiPortal.apiDetails.general.methodButton2)).click();
        }
        await browser.sleep(4000);

    },

    clickClearButton: async function () {
        await element(by.xpath(obj.apiPortal.apiDetails.general.headerClearButton)).click();
        await browser.sleep(2000);
    },

    clickMethodHeading: async function (methodHeadingName) {
        await browser.wait(EC.not(EC.visibilityOf(await element(by.id(obj.apiPortal.baseModule.login.loadingPage)), 180000, "API POLICIES NOT FOUND")));
        await browser.sleep(2000);

        await element(by.xpath(obj.apiPortal.apiDetails.general.methodHeading1 + methodHeadingName + obj.apiPortal.apiDetails.general.methodHeading2)).click();
        await browser.sleep(4000);

    },

    clickSendButton: async function () {

        await element(by.xpath(obj.apiPortal.apiDetails.general.sendButton)).click();
        await browser.sleep(8000);
        await browser.wait(EC.not(EC.visibilityOf(await element(by.id(obj.apiPortal.baseModule.login.loadingPage)), 180000, "API POLICIES NOT FOUND")));
        await browser.sleep(6000);

    },

    verifyResponse: async function (statusCode) {

        expect(await element(by.xpath(obj.apiPortal.apiDetails.general.statusCode)).getText()).to.contains(statusCode);

    },

    verifyThrotllingResponse: async function (value, message, statusCode, throtllingStatusCode) {

        var x = parseInt(value);

        for (i = 0; i < x; i++) {

            await this.clickSendButton();
            expect(await element(by.xpath(obj.apiPortal.apiDetails.general.statusCode)).getText()).to.contains(statusCode);

        }

        await this.clickSendButton();
        expect(await element(by.xpath(obj.apiPortal.apiDetails.general.statusCode)).getText()).to.contains(throtllingStatusCode);

        target = await element(by.xpath(obj.apiPortal.apiDetails.general.responseText1 + message + obj.apiPortal.apiDetails.general.responseText2)).getText();
        expect(target).to.contains(message);
    },


    clickAuthorizationTab: async function () {

        await element(by.xpath(obj.apiPortal.apiDetails.general.authorizationTab)).click();
        await browser.sleep(2000);

    },

    clickAuthorizationDropDown: async function () {

        await element(by.xpath(obj.apiPortal.apiDetails.general.authorizationDropDown)).click();
        await browser.sleep(1000);

    },

    selectAuthorizationType: async function (authType) {

        await element(by.xpath(obj.apiPortal.apiDetails.general.authorizationType1 + authType + obj.apiPortal.apiDetails.general.authorizationType2)).click();
        await browser.sleep(1000);

    },


    addBasicAuthorization: async function (authType, userName, password) {

        await this.clickAuthorizationTab();
        await this.clickAuthorizationDropDown();
        await this.selectAuthorizationType(authType);
        await element(by.xpath(obj.apiPortal.apiDetails.general.basicAuthUN)).clear();
        await element(by.xpath(obj.apiPortal.apiDetails.general.basicAuthUN)).sendKeys(userName);
        await browser.sleep(1000);
        await element(by.xpath(obj.apiPortal.apiDetails.general.basicAuthPW)).clear();
        await element(by.xpath(obj.apiPortal.apiDetails.general.basicAuthPW)).sendKeys(password);
        await browser.sleep(1000);
        await element(by.xpath(obj.apiPortal.apiDetails.general.basicAuthUpdateButton)).click();
        await browser.sleep(1000);

    },

    addHeaders: async function (keys, values) {
        await element(by.xpath(obj.apiPortal.apiDetails.general.headersTab)).click();
        await browser.sleep(2000);
        var str = await element(by.xpath(obj.apiPortal.apiDetails.general.headersTab)).getText();
        var temp = "";
        var x = 0;

        if (str.includes("(")) {

            temp = str.split("(");
            x = parseInt(temp[1], 10);

        }

        var key = keys.split(",");
        var val = values.split(",");
        x = 2 + x;


        for (var i in key) {
            temp = obj.apiPortal.apiDetails.general.headersKey + x.toString();

            await element(by.xpath(temp + obj.apiPortal.apiDetails.general.headersKey1)).click();
            await element(by.xpath(temp + obj.apiPortal.apiDetails.general.headersKey1)).sendKeys(key[i]);
            await element(by.xpath(temp + obj.apiPortal.apiDetails.general.headersValue1)).click();
            await element(by.xpath(temp + obj.apiPortal.apiDetails.general.headersValue1)).sendKeys(val[i]);

            await element(by.xpath(temp + obj.apiPortal.apiDetails.general.headersPlusButton1)).click();
            await browser.sleep(3000);
            x++;
        }
    },

    clickBodyTab: async function () {

        await element(by.xpath(obj.apiPortal.apiDetails.general.bodyTab)).click();
        await browser.sleep(5000);

    },

    addBody: async function (bodyInfo) {

        var target = await element(by.xpath(obj.apiPortal.apiDetails.general.bodyText));

        await browser.actions()
            .mouseMove(target)
            .click(target)
            .sendKeys(bodyInfo)
            .perform();

        await browser.sleep(2000);
    },

    clickSOAPMethodName: async function (methodName) {

        await element(by.xpath(obj.apiPortal.apiDetails.SOAP.methodName + methodName + obj.apiPortal.apiDetails.SOAP.methodNameEnd)).click();
        await browser.sleep(2000);

    },

    clickSOAPHeading: async function (methodheading) {

        await element(by.xpath(obj.apiPortal.apiDetails.SOAP.methodHeading + methodheading + obj.apiPortal.apiDetails.SOAP.methodHeadingEnd)).click();
        await browser.sleep(2000);

    },

    clickGetAccessToken: async function () {

        await browser.wait(EC.not(EC.visibilityOf(await element(by.id(obj.apiPortal.baseModule.login.loadingPage)), 180000, "API POLICIES NOT FOUND")));
        await browser.sleep(4000);
        await element(by.xpath(obj.apiPortal.apiDetails.general.getAccessToken)).click();
        await browser.wait(EC.not(EC.visibilityOf(await element(by.id(obj.apiPortal.baseModule.login.loadingPage)), 180000, "TOKEN WINDOW NOT FOUND")));
        await browser.wait(EC.visibilityOf(await element(by.xpath(obj.apiPortal.apiDetails.general.applicationName)), 180000, "TOKEN WINDOW NOT FOUND"));
        await browser.sleep(10000);

    },

    setApplicationName: async function (applicationName) {

        await element(by.xpath(obj.apiPortal.apiDetails.general.applicationName)).sendKeys(applicationName);
        await browser.sleep(2000);

    },

    clickRequestToken: async function () {

        await element(by.xpath(obj.apiPortal.apiDetails.general.requestToken)).click();
        await browser.wait(EC.not(EC.visibilityOf(await element(by.xpath(obj.apiPortal.apiDetails.general.messageWindow)), 180000, "MESSAGE WINDOW NOT FOUND")));
        await browser.sleep(2000);

    },

    clickCloseButton: async function () {

        await element(by.xpath(obj.apiPortal.apiDetails.general.closeButton)).click();
        await browser.sleep(2000);

    },

    clickApplicationDropDown: async function (applicationName) {
        await browser.wait(EC.not(EC.visibilityOf(await element(by.id(obj.apiPortal.baseModule.login.loadingPage)), 180000, "TOKEN WINDOW NOT FOUND")));
        await browser.sleep(2000);
        await element(by.xpath(obj.apiPortal.apiDetails.general.tryoutAppDropdown)).click();
        await browser.sleep(2000);
        await element(by.xpath(obj.apiPortal.apiDetails.general.listApp1 + applicationName + obj.apiPortal.apiDetails.general.listApp2)).click();
        await browser.sleep(2000);

    },

    setTokenName: async function (tokenName) {

        await element(by.xpath(obj.apiPortal.apiDetails.general.tokenName)).sendKeys(tokenName);
        await browser.sleep(2000);

    },

    selectScope: async function (scopeName) {

        await element(by.xpath(obj.apiPortal.apiDetails.general.scopeName1 + scopeName + obj.apiPortal.apiDetails.general.scopeName2)).click();
        await browser.sleep(2000);
    },

    clickGetTokenButton: async function () {

        await element(by.xpath(obj.apiPortal.apiDetails.general.getTokenButton)).click();
        await browser.sleep(15000);
    },

    checkInputBox: async function (scopeName) {

        browser.getAllWindowHandles().then(handles => {
            browser.switchTo().window(handles[1]); // 0 or 1 to switch between the 2 open windows
        });

        if (!(await element(by.xpath(obj.apiPortal.apiDetails.general.inputCheckBox1 + scopeName + obj.apiPortal.apiDetails.general.inputCheckBox2)).isSelected())) {
            await element(by.xpath(obj.apiPortal.apiDetails.general.inputCheckBox1 + scopeName + obj.apiPortal.apiDetails.general.inputCheckBox2)).click();
            await browser.sleep(1000);
        }

    },

    clickApproveButton: async function () {

        await element(by.xpath(obj.apiPortal.apiDetails.general.approveButton)).click();
        await browser.sleep(5000);
        await browser.switchTo().alert().sendKeys("chth@softwareag.com" + Keys.TAB + "Test@123");
        await browser.switchTo().alert().accept();
        await browser.sleep(10000);

        browser.getAllWindowHandles().then(handles => {
            browser.switchTo().window(handles[0]); // 0 or 1 to switch between the 2 open windows
        });
    },

    addOAuthAuthorization: async function (authType, tokenName, scopeName) {

        await this.clickAuthorizationTab();
        await this.clickAuthorizationDropDown();
        await this.selectAuthorizationType(authType);
        await this.setTokenName(tokenName);
        await this.selectScope(scopeName);
        await this.clickGetTokenButton();
        await this.checkInputBox(scopeName);
        await this.clickApproveButton();
    },

    addJWTAuthorization: async function (authType, userName, password) {

        await this.clickAuthorizationTab();
        await this.clickAuthorizationDropDown();
        await this.selectAuthorizationType(authType);
        await element(by.xpath(obj.apiPortal.apiDetails.general.jwtAuthUN)).clear();
        await element(by.xpath(obj.apiPortal.apiDetails.general.jwtAuthUN)).sendKeys(userName);
        await browser.sleep(1000);
        await element(by.xpath(obj.apiPortal.apiDetails.general.jwtAuthPW)).clear();
        await element(by.xpath(obj.apiPortal.apiDetails.general.jwtAuthPW)).sendKeys(password);
        await browser.sleep(1000);
        await element(by.xpath(obj.apiPortal.apiDetails.general.jwtAuthUpdateButton)).click();
        await browser.wait(EC.not(EC.visibilityOf(await element(by.id(obj.apiPortal.baseModule.login.loadingPage)), 180000, "JWT TOKEN NOT FOUND")));
        await browser.wait(EC.not(EC.visibilityOf(await element(by.xpath(obj.apiPortal.apiDetails.general.jwtTokenMessage)), 180000, "JWT Token NOT FOUND")));
        await browser.sleep(25000);

    },

    clickResponseRawButton: async function() {

        await element(by.xpath(obj.apiPortal.apiDetails.general.responseRawButton)).click();
        await browser.sleep(2000);

    },

    verifyResponseBody: async function (responseText) {

        expect(await element(by.xpath(obj.apiPortal.apiDetails.general.responseBodyText1 + responseText + obj.apiPortal.apiDetails.general.responseBodyText2)).isPresent());     

    }


}