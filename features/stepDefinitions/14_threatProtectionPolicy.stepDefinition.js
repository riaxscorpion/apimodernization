var { Before, After, Given, Then, setDefaultTimeout} = require('cucumber');
var createAPI = require("../modules/createAPIs/createAPI");
var apidetails = require("../modules/APILevelSpecifications/apidetails");
var headerLink = require("../modules/baseModule/headerLinks");
const manageAPI = require('../modules/createAPIs/manageAPI');
var data = require("../properties/data.json");
var apigallery = require("../modules/APIPortal/APIGallery/apigallery");
var portalHeaderlink = require("../modules/APIPortal/baseModule/headerLinks");

var readProp = require("../properties/readProperties");

var policies = require("../modules/Policies/policies");
var common = require("../modules/baseModule/common");
const { browser } = require('protractor');

var reqData = data.data_14.commonDetails;
var sce_3 = data.data_14.scenario_3;

var serverURL = reqData.serverURL;
var apiName = reqData.apiName;
var version = reqData.version;
var resourceName = reqData.resourceName;
var resourcePath = reqData.resourcePath;
var supportedMethods = reqData.methodName1;
var statusCode = reqData.statusCode;
var statusMoreThanOneMB = reqData.statusCode2;
var keys = reqData.keys;
var values = reqData.values;
var authType = reqData.authType;
var username = reqData.username;
var password = reqData.password;
var bodyInfo = reqData.bodyInfo;

var tp = data.data_14.scenario_3;
var statusCode2 = sce_3.statusCode;

var rule1 = data.data_14.scenario_1.ruleType1;
var rule2 = data.data_14.scenario_2.ruleType2;

var filePath = reqData.filePath;

Then("Click Create API for threat Protection Policy", async function(){
    await createAPI.clickCreateAPIButton();
    await createAPI.clickCreateAPIFromScratch();
    await createAPI.clickCreateButtonScratch();
    await createAPI.setAPIBasicInformation(apiName, version);
    await createAPI.clickTechnicalInformation();
    await createAPI.addServerDetails(serverURL);
    await createAPI.clickAddButton();
    await createAPI.clickSaveButton();
});

Then("Add Resources and verify the REST API for threat Protection Policy", async function() {
    await apidetails.clickEditButton();
    await apidetails.clickResourcesAndMethods();
    await apidetails.clickAddResourcesButton();
    await apidetails.setResourceName(resourceName);
    await apidetails.setResourcePath(resourcePath);
    await apidetails.setSupportedMethods(supportedMethods);
    await apidetails.clickAddButton();
    await createAPI.clickSaveButton();
});

Then("Activate and Verify API for threat Protection Policy", async function(){
    await apidetails.clickActivateButton();
    await common.verifyActivateWindow();
});

Then("Publish REST API for threat Protection Policy", async function(){
    await headerLink.clickAPIHeader();
    await manageAPI.publishVersionedAPI(apiName, version);
});

Then("Click on Policies", async function(){
    await headerLink.clickPoliciesHeader();
});

Then("Add Type1 Rule under Threat Protection", async function(){
    await policies.addRules(rule1);
});

Then("Add Type2 Rule under Threat Protection", async function(){
    await policies.addRules(rule2);
});

Then("Delete Type1 Rule under Threat Protection", async function(){
    await policies.deleteRules(rule1);
});

Then("Delete Type2 Rule under Threat Protection", async function(){
    await policies.deleteRules(rule2);
});

Then("Enable Global denial of service", async function(){
    await policies.enableGlobalDenial(tp);
});

Then("Disable Global denial of service", async function(){
    await policies.disableGlobalDenial();
});

Then("Test REST_API with input less than 1 MB", async function () {
    var runtimeData = readProp.runtimeData();

    await portalHeaderlink.clickAPIGallery();
    await apigallery.clickViewDetailsOfAPI(apiName);
    await apigallery.clickOnTryAPI();

    await apigallery.clickMethod(resourceName, supportedMethods);
    await apigallery.addHeaders(keys, values);
    await apigallery.addHeaders(runtimeData[0], runtimeData[1]);
    await apigallery.addBasicAuthorization(authType, username, password);
    await apigallery.clickBodyTab();
    await apigallery.addBody(bodyInfo);

    await apigallery.clickSendButton();
    await apigallery.verifyResponse(statusCode);
});

Then("Test REST_API with input more than 1 MB", async function () {
    var runtimeData = readProp.runtimeData();

    await portalHeaderlink.clickAPIGallery();
    await apigallery.clickViewDetailsOfAPI(apiName);
    await apigallery.clickOnTryAPI();

    await apigallery.clickMethod(resourceName, supportedMethods);
    await apigallery.addHeaders(keys, values);
    await apigallery.addHeaders(runtimeData[0], runtimeData[1]);
    await apigallery.addBasicAuthorization(authType, username, password);
    await apigallery.clickBodyTab();
    await policies.uploadRequestBody(filePath);
    await apigallery.clickSendButton();
    await apigallery.verifyResponse(statusMoreThanOneMB);
});

Then("Test REST_API after enabling Global DOS", async function () {
    var runtimeData = readProp.runtimeData();

    await portalHeaderlink.clickAPIGallery();
    await apigallery.clickViewDetailsOfAPI(apiName);
    await apigallery.clickOnTryAPI();

    await apigallery.clickMethod(resourceName, supportedMethods);
    await apigallery.addHeaders(keys, values);
    await apigallery.addHeaders(runtimeData[0], runtimeData[1]);
    await apigallery.addBasicAuthorization(authType, username, password);
    await apigallery.clickBodyTab();
    await apigallery.addBody(bodyInfo);

    for (i=0; i< sce_3.maxReq;i++){
        await apigallery.clickSendButton();
        await apigallery.verifyResponse(statusCode);
    }
    await apigallery.clickSendButton();
    await apigallery.verifyResponse(statusCode2);
});

Then("Test REST_API Again after One Minute", async function () {
    browser.sleep(60000);
    for (i=0; i< sce_3.maxReq;i++){
        await apigallery.clickSendButton();
        await apigallery.verifyResponse(statusCode);
    }
    await apigallery.clickSendButton();
    await apigallery.verifyResponse(statusCode2);
});

Then("Navigate to Menu Option", async function(){
    await policies.clickMenuOptions();
});

Then("Click on Analytics", async function(){
    await policies.clickAnalyticsLink();
});

Then("Click on Threat Protection", async function(){
    await policies.clickThreatProtection();
});

