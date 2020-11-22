var { Before, After, Given, Then, setDefaultTimeout} = require('cucumber');
const manageAPI = require("../modules/createAPIs/manageAPI");
const data = require("../properties/data.json");
const createTemplate = require("../modules/globalLevelSpecifications/createTemplate");
const manageApplications = require('../modules/Applications/manageApplications');
const globalPolicies = require('../modules/globalLevelSpecifications/globalPolicies');
const adminSettings = require("../modules/MenuOptions/administrationSettings");
const oauthscope = require("../modules/MenuOptions/oAuthOpenIDScopes");


setDefaultTimeout(60 * 10000);
browser.ignoreSynchronization = true;

var reqData = data.clearData;

var apiNames = reqData.apiNames;
var version = reqData.apiVersions;
var applicationName = reqData.applicationName;
var globalPolicesName = reqData.globalPolicyName;
var templateName = reqData.templateName;
var scopeName = reqData.scopeName;

Then("Deactivate all APIs", async function(){
    for(i in apiNames){
        await manageAPI.activateAPI(apiNames[i], version[i]);
    }
});


Then("Unpublish all APIs", async function(){
    for(i in apiNames){
        await manageAPI.unPublishAPI(apiNames[i], version[i]);
    }
});


Then("Delete all APIs", async function(){
    for(i in apiNames){
        await manageAPI.deleteAPI(apiNames[i], version[i]);
        await browser.sleep(2000);
    }
});


Then("Delete Applications", async function(){
    for(i in applicationName){
        await manageApplications.deleteApplication(applicationName[i]);
    }
});


Then("Delete Global Policies", async function(){
    for(i in globalPolicesName){
        await globalPolicies.activateGlobalPolicy(globalPolicesName[i]);
        await globalPolicies.deleteGlobalPolicies(globalPolicesName[i]);
    }
});


Then("Delete Policy Template", async function(){
    for(i in templateName){
        await createTemplate.deleteTemplate(templateName[i]);
    }
});


Then("Delete Oauth Scopes", async function(){
    await adminSettings.clickjwtOauthOpenIDLink();
    await adminSettings.deleteOauthScopes(scopeName);
});


Then("Delete Oauth Map Scopes", async function(){
    await oauthscope.deleteOauthMapScopes(scopeName);
});


