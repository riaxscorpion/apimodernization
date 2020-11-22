var { Given, Then, setDefaultTimeout} = require('cucumber');
var headerLink = require("../modules/baseModule/headerLinks");
var createAPI = require("../modules/createAPIs/createAPI");
const manageAPI = require('../modules/createAPIs/manageAPI');
var data = require("../properties/data.json");
var apidetails = require("../modules/APILevelSpecifications/apidetails");
var common = require("../modules/baseModule/common");

setDefaultTimeout(60 * 10000);
browser.ignoreSynchronization = true;

var urlValue = data.data_04.urlValue;
var apiName = data.data_04.apiName;
var apiType = data.data_04.apiType;
var version = data.data_04.version;


Then("Click Create API for REST_OData04", async function(){
    await createAPI.clickCreateAPIButton();
    await createAPI.clickImportURL();
    await createAPI.createAPIFromURL(urlValue,apiName,apiType,version);
    await createAPI.clickCreateButtonURL();
});

Then("Activate and Verify REST_OData04", async function(){
    await apidetails.clickActivateButton();
    await common.verifyActivateWindow();
    //await apidetails.verifyREST_OData_04API(); check with Chethan
});

Then("Publish REST_OData04", async function(){
    await headerLink.clickAPIHeader();
    await manageAPI.publishVersionedAPI(apiName, version);
});


