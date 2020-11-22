var { Given, Then, setDefaultTimeout} = require('cucumber');
const data = require("../properties/data.json");
const manageAPI = require("../modules/createAPIs/manageAPI");
const policies = require('../modules/APILevelSpecifications/policies');
const applytemplate = require("../modules/APILevelSpecifications/applyTemplate");

var sceanrioData = data.data_11;

var apiName = sceanrioData.apiName;
var version = sceanrioData.version;
var templateName = sceanrioData.templateName;


Then("Deactivate required API to apply policy template", async function(){
    await manageAPI.activateAPI(apiName, version);
});


Then("Open created API to apply policy template", async function(){
    await manageAPI.openCreatedAPI(apiName, version);
});


Then("Click On Edit Button to apply template", async function(){
    await policies.clickEditButton();
});


Then("Apply required Template to API", async function(){
    await applytemplate.clickApplyTemplateButton();
    await applytemplate.chooseTemplate(templateName);
    await applytemplate.applyTemplate();
});


Then("Click on Save Button to apply template", async function(){
    await policies.clickSaveButton();
});


Then("Activate required API after applying template", async function(){
    await manageAPI.activateAPI(apiName, version);
});

Then("Wait for sometime", async function(){
    await browser.sleep(180000);
});