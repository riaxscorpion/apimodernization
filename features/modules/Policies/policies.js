var obj = require("../../properties/objects.json");
const { element, browser, ActionSequence, WebElement } = require("protractor");
const { protractor, Ptor } = require("protractor/built/ptor");
var path = require("path");
var chai = require('chai');
var chaiAsPromised = require("chai-as-promised");
const { enableHttpHttps } = require("../APILevelSpecifications/policies");
chai.use(chaiAsPromised);
var expect = chai.expect;
var EC = protractor.ExpectedConditions;


module.exports = {

    clickThreatProtection: async function (tp) {
        await browser.wait(EC.visibilityOf(element(by.linkText(obj.policies.threatProtection.threatProtectionLink)), 180000, "NOT FOUND"));
        await element(by.linkText(obj.policies.threatProtection.threatProtectionLink)).click();
        await browser.sleep(2000);
    },

    enableGlobalDenial: async function (tp) {
        await browser.wait(EC.visibilityOf(element(by.xpath(obj.policies.threatProtection.GlobalDOS)), 180000, "NOT FOUND"));
        await element(by.xpath(obj.policies.threatProtection.GlobalDOS)).click();
        await browser.sleep(2000);
        await element(by.xpath(obj.policies.threatProtection.enable)).click();
        await element(by.xpath(obj.policies.threatProtection.maxReq)).clear().sendKeys(tp.maxReq);
        await element(by.xpath(obj.policies.threatProtection.reqPerSec)).clear().sendKeys(tp.reqPerSec);
        await element(by.xpath(obj.policies.threatProtection.inProgressReq)).clear().sendKeys(tp.inProgressReq);
        await element(by.xpath(obj.policies.threatProtection.blockIntervals)).clear().sendKeys(tp.blockIntervals);
        await element(by.xpath(obj.policies.threatProtection.customErrorMessage)).clear().sendKeys(tp.customErrorMessage);
        for (i in tp.ipAddrs) {
            await element(by.xpath(obj.policies.threatProtection.ipAddrs)).clear().sendKeys(tp.ipAddrs[i]);
            await element(by.xpath(obj.policies.threatProtection.addButton)).click();
        }
        await browser.sleep(2000);
        browser.executeScript('window.scrollTo(0,document.body.scrollHeight)').then(function () {
            element(by.xpath(obj.policies.threatProtection.saveButton)).click();
            browser.sleep(2000);
        });

        await browser.wait(EC.visibilityOf(element(by.xpath(obj.policies.threatProtection.alertMessage)), 5000, "Alert message not found"));
        var status = await element(by.xpath(obj.policies.threatProtection.alertMessage)).getText();
        expect(status).to.contains("Denial of service for global IPs is saved successfully.");
    },

    addRules: async function (rule) {
        await browser.wait(EC.visibilityOf(element(by.xpath(obj.policies.threatProtection.rule)), 180000, "NOT FOUND"));
        await element(by.xpath(obj.policies.threatProtection.rule)).click();
        await browser.sleep(3000);
        await element(by.xpath(obj.policies.threatProtection.addRule)).click();
        await browser.sleep(2000);
        await element(by.xpath(obj.policies.threatProtection.ruleName)).sendKeys(rule.ruleName);
        await element(by.xpath(obj.policies.threatProtection.ruleDesc)).sendKeys(rule.ruleDesc);
        await element(by.xpath(obj.policies.threatProtection.actionType1 + rule.actionName + obj.policies.threatProtection.commonEndingXpath)).click();
        await browser.sleep(2000);
        await element(by.xpath(obj.policies.threatProtection.errorMessage)).sendKeys(rule.errorMessage);
        await element(by.xpath(obj.policies.threatProtection.requestType + rule.requestType + obj.policies.threatProtection.commonEndingXpath)).click();
        if (rule.requestType != 'All') {
            if (rule.requestType == 'CUSTOM') {
                await element(by.xpath(obj.policies.threatProtection.inputResourcePath)).sendKeys(rule.resourcePath);
                await element(by.xpath(obj.policies.threatProtection.addResourcePath)).click();
                await browser.sleep(2000);
                
                browser.executeScript('window.scrollTo(0,document.body.scrollHeight)').then(function () {
                    browser.sleep(2000);
                });
                await element(by.xpath(obj.policies.threatProtection.inputCustomDirectives)).sendKeys(rule.customDirectives);
                await element(by.xpath(obj.policies.threatProtection.addCustomDirectives)).click();
                await browser.sleep(2000);
            }
            else {
                await element(by.xpath(obj.policies.threatProtection.inputResourcePath)).sendKeys(rule.resourcePath);
                await element(by.xpath(obj.policies.threatProtection.addResourcePath)).click();
                await browser.sleep(2000);
                browser.executeScript('window.scrollTo(0,document.body.scrollHeight)').then(function () {
                    browser.sleep(2000);
                });
            }
        }
        browser.executeScript('window.scrollTo(0,document.body.scrollHeight)').then(function () {
            browser.sleep(2000);
        });
        await element(by.xpath(obj.policies.threatProtection.alertSettings)).click();
        await browser.sleep(1000);
        await element(by.xpath(obj.policies.threatProtection.selectCustom)).click();
        await browser.sleep(1000);
        await element(by.xpath(obj.policies.threatProtection.alertDestination)).click();
        await browser.sleep(1000);
        await element(by.xpath(obj.policies.threatProtection.alertOnRuleViolation)).click();
        await browser.sleep(3000);

        for (i in rule.emailIDs) {
            await browser.wait(EC.visibilityOf(element(by.xpath(obj.policies.threatProtection.inputEmailIds)), 180000, "NOT FOUND"));
            await element(by.xpath("//div[@class='container-fluid no-padding']//input[@id='TempData']")).sendKeys(rule.emailIDs[i]);
            await element(by.xpath(obj.policies.threatProtection.addEmailIds)).click();
        }
        browser.executeScript('window.scrollTo(0,10000)').then(function () {
            browser.sleep(2000);
        });
        await element(by.xpath(obj.policies.threatProtection.clickSizeFilter)).click();
        await browser.sleep(2000);
        await element(by.xpath(obj.policies.threatProtection.enableSizeFilter)).click();
        await browser.sleep(2000);
        await element(by.xpath(obj.policies.threatProtection.maxSize)).sendKeys(rule.maxSize);
        browser.executeScript('window.scrollTo(0,10000)').then(function () {
            browser.sleep(2000);
            element(by.xpath(obj.policies.threatProtection.saveButton)).click();
            browser.sleep(2000);
        });
        await browser.wait(EC.visibilityOf(element(by.xpath(obj.policies.threatProtection.alertMessage)), 5000, "Alert message not found"));
        var status = await element(by.xpath(obj.policies.threatProtection.alertMessage)).getText();
        expect(status).to.contains("The threat protection rule was created successfully.");
    },

    disableGlobalDenial: async function () {
        await browser.wait(EC.visibilityOf(element(by.xpath(obj.policies.threatProtection.GlobalDOS)), 180000, "NOT FOUND"));
        await element(by.xpath(obj.policies.threatProtection.GlobalDOS)).click();
        await browser.sleep(2000);
        await element(by.xpath(obj.policies.threatProtection.disable)).click();
        await browser.sleep(2000);
        browser.executeScript('window.scrollTo(0,document.body.scrollHeight)').then(function () {
            element(by.xpath(obj.policies.threatProtection.saveButton)).click();
            browser.sleep(2000);
        });
    },

    deleteRules: async function (rule) {
        await browser.wait(EC.visibilityOf(element(by.xpath(obj.policies.threatProtection.rule)), 180000, "NOT FOUND"));
        await element(by.xpath(obj.policies.threatProtection.rule)).click();
        await browser.sleep(3000);
        await element(by.xpath(obj.policies.threatProtection.deleteRules1 + rule.ruleName + obj.policies.threatProtection.deleteRules2)).click();
        await element(by.xpath(obj.policies.threatProtection.confirmDeleteRule)).click();
        await browser.sleep(2000);
    },

    clickMenuOptions: async function () {
        await browser.wait(EC.visibilityOf(await element(by.xpath(obj.policies.threatProtection.menuOptions)), 180000, "**** NOT FOUND ****"));
        await browser.sleep(2000);
        await element(by.xpath(obj.policies.threatProtection.menuOptions)).click();
        await browser.sleep(2000);
    },

    clickAnalyticsLink: async function () {
        await element(by.linkText(obj.policies.threatProtection.analyticsLink)).click();
        await browser.wait(EC.visibilityOf(await element(by.linkText(obj.policies.threatProtection.threatProtectionLink)), 180000, "**** NOT FOUND ****"));
        await browser.sleep(2000);
    },

    uploadFile: async function (filePath) {

        var absolutePath = path.resolve(filePath);
        var fileElem = protractor.element.all(protractor.By.css('input[type="file"]'));
        fileElem.sendKeys(absolutePath);
        await browser.sleep(5000);
    },

    uploadRequestBody: async function(filePath){
        
        await browser.sleep(5000);
        await this.uploadFile(filePath);

    }
    
}
