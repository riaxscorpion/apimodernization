var { Given, Then, setDefaultTimeout} = require('cucumber');
var headerLink = require("../modules/baseModule/headerLinks");
var createAPI = require("../modules/createAPIs/createAPI");
const manageAPI = require('../modules/createAPIs/manageAPI');
var data = require("../properties/data.json");
var apidetails = require("../modules/APILevelSpecifications/apidetails");
var common = require("../modules/baseModule/common");

setDefaultTimeout(60 * 10000);
browser.ignoreSynchronization = true;

var filePath1 = data.data_01.filePath;
var apiName1 = data.data_01.apiName;
var apiType1 = data.data_01.apiType;
var version1 = data.data_01.version;

var filePath2 = data.data_02.filePath;
var apiName2 = data.data_02.apiName;
var apiType2 = data.data_02.apiType;
var version2 = data.data_02.version;


Then("Click Create API for REST_JSON01", async function(){
    await createAPI.clickCreateAPIButton();
    // await createAPI.clickImportURL();
    await createAPI.createAPIFromFile(filePath1,apiName1,apiType1,version1);
    await createAPI.clickCreateButtonFile();
});

Then("Activate and Verify REST_JSON01", async function(){
    await apidetails.clickActivateButton();
    await common.verifyActivateWindow();
    //await apidetails.verifyREST_OData_04API(); check with Chethan
});

Then("Publish REST_JSON01", async function(){
    await headerLink.clickAPIHeader();
    await manageAPI.publishVersionedAPI(apiName1, version1);
});


Then("Click Create API for REST_YAML01", async function(){
    await createAPI.clickCreateAPIButton();
    // await createAPI.clickImportURL();
    await createAPI.createAPIFromFile(filePath2,apiName2,apiType2,version2);
    await createAPI.clickCreateButtonFile();
});

Then("Activate and Verify REST_YAML01", async function(){
    await apidetails.clickActivateButton();
    await common.verifyActivateWindow();
});

Then("Publish REST_YAML01", async function(){
    await headerLink.clickAPIHeader();
    await manageAPI.publishVersionedAPI(apiName2, version2);
});