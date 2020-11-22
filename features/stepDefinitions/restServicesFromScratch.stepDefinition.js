var { Given, Then, setDefaultTimeout} = require('cucumber');
var headerLink = require("../modules/baseModule/headerLinks");
var createAPI = require("../modules/createAPIs/createAPI");
const manageAPI = require('../modules/createAPIs/manageAPI');
var data = require("../properties/data.json");
var apidetails = require("../modules/APILevelSpecifications/apidetails");
var common = require("../modules/baseModule/common");
const { setResourceName } = require('../modules/APILevelSpecifications/apidetails');

setDefaultTimeout(60 * 10000);
browser.ignoreSynchronization = true;

var reqData = data.data_05;

var serverURL = reqData.serverURL;
var apiName = reqData.apiName;
var version = reqData.version;
var resourceName = reqData.resourceName;
var resourcePath = reqData.resourcePath;
var supportedMethods = reqData.methodName;


Then("Click Create API for REST_Scratch08", async function(){
    await createAPI.clickCreateAPIButton();
    await createAPI.clickCreateAPIFromScratch();
    await createAPI.clickCreateButtonScratch();
    await createAPI.setAPIBasicInformation(apiName, version);
    await createAPI.clickTechnicalInformation();
    await createAPI.addServerDetails(serverURL);
    await createAPI.clickAddButton();
    await createAPI.clickSaveButton();
});

Then("Add Resources and verify the REST API REST_Scratch08", async function() {
    await apidetails.clickEditButton();
    await apidetails.clickResourcesAndMethods();
    await apidetails.clickAddResourcesButton();
    await apidetails.setResourceName(resourceName);
    await apidetails.setResourcePath(resourcePath);
    await apidetails.setSupportedMethods(supportedMethods);
    await apidetails.clickAddButton();
    await createAPI.clickSaveButton();
});

Then("Activate and Verify REST_Scratch08", async function(){
    await apidetails.clickActivateButton();
    await common.verifyActivateWindow();
    //await apidetails.verifyREST_OData_04API(); check with Chethan
});

Then("Publish REST_Scratch08", async function(){
    await headerLink.clickAPIHeader();
    await manageAPI.publishVersionedAPI(apiName, version);
});


Then("Select Import From URL option and click on create button", async function(){
    await createAPI.clickImportURL();
    await createAPI.createAPIFromURL(urlValue,apiName,apiType,version);
    //await createAPI.clickCreateButton();
});


Then("Upload file", async function(){
    await createAPI.uploadFile();
});


Then("Activate required API", async function(apiName){
    await manageAPI.activateAPI(apiName, version);
});
