var { Given, Then, setDefaultTimeout} = require('cucumber');
var data = require("../properties/data.json");
var appln = require("../modules/Applications/createApplications");
var manage = require("../modules/Applications/manageApplications");
var jenkinsProperties = require("../properties/readProperties");

setDefaultTimeout(60 * 10000);
browser.ignoreSynchronization = true;

var reqData = data.data_08;

var apiName = reqData.apiName;
var apiversion = reqData.apiVersion;
var applicationName = reqData.applicationName;
var version = reqData.version;
var description = reqData.description;
var identifiers = reqData.identifiers;
var username = jenkinsProperties.username;

Then ("Create Application", async function(){
    await appln.clickCreateApplicationButton();
    await appln.createApplication(applicationName, version, description);
    await appln.clickSaveButtion();
});

Then ("Add API to Application", async function(){
    await manage.clickApplication(applicationName);
    await appln.clickEditButtion();
    await appln.clickAPIs();
    await appln.selectAPI(apiName, apiversion);
    await appln.clickSaveButtion();
});


Then("Add Identifiers to Application", async function(){
    await manage.clickApplication(applicationName);
    await appln.clickEditButtion();
    await appln.clickIdentifiers();
    await appln.addIdentifiers(identifiers, username);
    await appln.clickSaveButtion();
});


Then("Get API Key from Application and store it", async function(){
    await manage.clickApplication(applicationName);
    await appln.getAPIKey();
    
});
