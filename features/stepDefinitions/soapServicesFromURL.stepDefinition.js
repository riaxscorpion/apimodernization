var { Given, Then, setDefaultTimeout} = require('cucumber');
var headerLink = require("../modules/baseModule/headerLinks");
var createAPI = require("../modules/createAPIs/createAPI");
const manageAPI = require('../modules/createAPIs/manageAPI');
var data = require("../properties/data.json");
var apidetails = require("../modules/APILevelSpecifications/apidetails");
var common = require("../modules/baseModule/common");

setDefaultTimeout(60 * 10000);
browser.ignoreSynchronization = true;

var urlValue = data.data_03.urlValue;
var apiName = data.data_03.apiName;
var apiType = data.data_03.apiType;
var version = data.data_03.version;


Then("Click Create API for SOAP03", async function(){
    await createAPI.clickCreateAPIButton();
    await createAPI.clickImportURL();
    await createAPI.createAPIFromURL(urlValue,apiName,apiType,version);
    await createAPI.clickCreateButtonURL();
});

Then("Activate SOAP03", async function(){
    await apidetails.clickActivateButton();
    await common.verifyActivateWindow();
});

Then("Verify SOAP03", async function(){
    // await apidetails.clickActivateButton();
    // await common.verifyActivateWindow();
    //await apidetails.verifyREST_OData_04API(); check with Chethan
});

Then("Publish SOAP03", async function(){
    await headerLink.clickAPIHeader();
    await manageAPI.publishVersionedAPI(apiName, version);
});


