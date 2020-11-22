var { Given, Then, setDefaultTimeout} = require('cucumber');
const data = require("../properties/data.json");
const policies = require('../modules/APILevelSpecifications/policies');
const createTemplate = require("../modules/globalLevelSpecifications/createTemplate");
const headerLink = require("../modules/baseModule/headerLinks");
const createAPI = require("../modules/createAPIs/createAPI");
const apidetails = require("../modules/APILevelSpecifications/apidetails");
const manageAPI = require("../modules/createAPIs/manageAPI");
const common = require("../modules/baseModule/common");

var reqData = data.data_10;

var name = reqData.templateName;
var description = reqData.templateDesciption;
var policyDetails = reqData.PolicyDetails;


Then("Enter policy template details", async function(){
    await createTemplate.createTemplatePolicy(name, description);
});


Then("Add Policies for template as required", async function(){
    await createTemplate.clickPolicyConfButton();
    for(i in policyDetails){
        await policies.clickOnPolicyCategoryName(policyDetails[i].PolicyCategoryName);
        await policies.AddPolicyProperty(policyDetails[i].policyPropertyName);
        await policies.configurePolicyProperty(policyDetails[i].policyPropertyName, policyDetails[i].propertyDetails);
    }
});


Then("Click on Save Button to save Policy Template", async function(){
    await createTemplate.clickSaveButton();
});


Then("Verify template created", async function(){
    await headerLink.clickPoliciesHeader();
    await createTemplate.clickPolicyTemplateLink();
    await createTemplate.verifyTemplateCreated(name);
});


Then("Click Create API for REST_Scratch_Template", async function(){
    await createAPI.clickCreateAPIButton();
    await createAPI.clickCreateAPIFromScratch();
    await createAPI.clickCreateButtonScratch();
    await createAPI.setAPIBasicInformation(reqData.apiName, reqData.version);
    await createAPI.clickTechnicalInformation();
    await createAPI.addServerDetails(reqData.serverURL);
    await createAPI.clickAddButton();
    await createAPI.clickSaveButton();
});


Then("Add Resources and verify the REST API REST_Scratch_Template", async function(){
    await apidetails.clickEditButton();
    await apidetails.clickResourcesAndMethods();
    await apidetails.clickAddResourcesButton();
    await apidetails.setResourceName(reqData.resourceName);
    await apidetails.setResourcePath(reqData.resourcePath);
    await apidetails.setSupportedMethods(reqData.methodName);
    await apidetails.clickAddButton();
    await createAPI.clickSaveButton();
});


Then("Publish REST_Scratch_Template", async function(){
    await headerLink.clickAPIHeader();
    await manageAPI.publishAPINew(reqData.apiName, reqData.version, reqData.protocols);
});


Then("Activate and Verify REST_Scratch_Template", async function(){
    await apidetails.clickActivateButton();
    await common.verifyActivateWindow();
});