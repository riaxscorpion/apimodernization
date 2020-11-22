var { Given, Then, setDefaultTimeout} = require('cucumber');
var data = require("../properties/data.json");
var manage = require("../modules/createAPIs/manageAPI");
var headerLink = require("../modules/baseModule/headerLinks");
const manageAPI = require('../modules/createAPIs/manageAPI');
var apidetails = require("../modules/APILevelSpecifications/apidetails");


setDefaultTimeout(60 * 10000);
browser.ignoreSynchronization = true;

var apiName = data.data_06.apiName;
var currentVersion = data.data_06.currentVersion;
var version = data.data_06.version;


Then ("Open Created API for Versioning", async function(){
    await manage.openCreatedAPI(apiName, currentVersion);
});

Then ("Create Version", async function(){
    await apidetails.clickCreateNewVersionButton();
    await apidetails.setVerionName(version);
    await apidetails.clickCreateButton();
});

Then("Publish Versioned REST_Scratch08", async function(){
    await headerLink.clickAPIHeader();
    await manageAPI.publishVersionedAPI(apiName, version);
});
