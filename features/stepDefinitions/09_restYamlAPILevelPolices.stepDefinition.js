var { Given, Then, setDefaultTimeout } = require('cucumber');
const data = require("../properties/data.json");
const manageAPI = require("../modules/createAPIs/manageAPI");
const policies = require('../modules/APILevelSpecifications/policies');
const createAPI = require("../modules/createAPIs/createAPI");
const headerLink = require("../modules/baseModule/headerLinks");
const apidetails = require("../modules/APILevelSpecifications/apidetails");

var reqData = data.data_09;
var json = reqData.REST_JSON_WP;
var yaml = reqData.REST_YAML_WP;
var oData = reqData.REST_OData_WP;
var soap = reqData.SOAP_WP;
var scratch = reqData.REST_Scratch_WP;


Then(/^Deactivate required API "([^"]*)"$/, async function (testdata) {
    await manageAPI.activateAPI(reqData[testdata].apiName, reqData[testdata].version);
});


Then(/^Open created API "([^"]*)"$/, async function (testdata) {
    await manageAPI.openCreatedAPI(reqData[testdata].apiName, reqData[testdata].version);
});


Then("Click On Edit Button", async function () {
    await policies.clickEditButton();
});


Then(/^Create API Level Policy as required "([^"]*)"$/, async function (testdata) {
    for (i in reqData[testdata].PolicyDetails) {
        await policies.clickOnPolicyCategoryName(reqData[testdata].PolicyDetails[i].PolicyCategoryName);
        await policies.AddPolicyProperty(reqData[testdata].PolicyDetails[i].policyPropertyName);
        await policies.configurePolicyProperty(reqData[testdata].PolicyDetails[i].policyPropertyName, reqData[testdata].PolicyDetails[i].propertyDetails);
    }
});


Then("Click on Save Button to save API Level Policies", async function () {
    await policies.clickSaveButton();
});


Then(/^Activate required API "([^"]*)"$/, async function (testdata) {
    await manageAPI.activateAPI(reqData[testdata].apiName, reqData[testdata].version);
});


Then("Click Create API for REST_JSON_WP", async function () {
    await createAPI.clickCreateAPIButton();
    await createAPI.createAPIFromFile(json.filePath, json.apiName, json.apiType, json.version);
    await createAPI.clickCreateButtonFile();
});


Then("Click Create API for REST_YAML_WP", async function () {
    await createAPI.clickCreateAPIButton();
    await createAPI.createAPIFromFile(yaml.filePath, yaml.apiName, yaml.apiType, yaml.version);
    await createAPI.clickCreateButtonFile();
});


Then("Click Create API for SOAP_WP", async function () {
    await createAPI.clickCreateAPIButton();
    await createAPI.clickImportURL();
    await createAPI.createAPIFromURL(soap.urlValue, soap.apiName, soap.apiType, soap.version);
    await createAPI.clickCreateButtonURL();
});


Then("Click Create API for REST_OData_WP", async function () {
    await createAPI.clickCreateAPIButton();
    await createAPI.clickImportURL();
    await createAPI.createAPIFromURL(oData.urlValue,oData.apiName,oData.apiType,oData.version);
    await createAPI.clickCreateButtonURL();
});


Then("Click Create API for REST_Scratch_WP", async function () {
    await createAPI.clickCreateAPIButton();
    await createAPI.clickCreateAPIFromScratch();
    await createAPI.clickCreateButtonScratch();
    await createAPI.setAPIBasicInformation(scratch.apiName, scratch.version);
    await createAPI.clickTechnicalInformation();
    await createAPI.addServerDetails(scratch.serverURL);
    await createAPI.clickAddButton();
    await createAPI.clickSaveButton();
});


Then("Add Resources and verify the REST API REST_Scratch_WP", async function() {
    await apidetails.clickEditButton();
    await apidetails.clickResourcesAndMethods();
    await apidetails.clickAddResourcesButton();
    await apidetails.setResourceName(scratch.resourceName);
    await apidetails.setResourcePath(scratch.resourcePath);
    await apidetails.setSupportedMethods(scratch.supportedMethods);
    await apidetails.clickAddButton();
    await createAPI.clickSaveButton();
});


Then(/^Publish "([^"]*)"$/, async function(testdata){
    await headerLink.clickAPIHeader();
    await manageAPI.publishAPINew(reqData[testdata].apiName, reqData[testdata].version, reqData[testdata].protocols);
});