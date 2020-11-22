var { Given, Then, setDefaultTimeout} = require('cucumber');
const data = require("../properties/data.json");
const policy = require("../modules/APILevelSpecifications/policies");
const globalPolicy = require("../modules/globalLevelSpecifications/globalPolicies");
const manageAPI = require("../modules/createAPIs/manageAPI");
const policies = require('../modules/APILevelSpecifications/policies');
const headerLink = require("../modules/baseModule/headerLinks");

var sceanrioData = data.data_07;

var name = sceanrioData.globalPolicyName;
var description = sceanrioData.globalPolicyDescription;
var globalPolicyFilters = sceanrioData.globalPolicyFilters;
var policyList = sceanrioData.PolicyDetails;
var apiDetails = sceanrioData.apiDetailsToVerifyPolicies;



Then("Create Global Policy as required", async function(){
    await globalPolicy.createGlobalPolicy(name, description);
    await globalPolicy.applyGlobalPolicyFilters(globalPolicyFilters);
    await globalPolicy.clickPolicyConfButton();
    for(i in policyList){
        await policy.clickOnPolicyCategoryName(policyList[i].PolicyCategoryName);
        await policy.AddPolicyProperty(policyList[i].policyPropertyName);
        await policy.configurePolicyProperty(policyList[i].policyPropertyName, policyList[i].propertyDetails)
    }
    await policy.clickSaveButton();
});


Then("Verify Applied Global Policy under API Level", async function(){
    for(i in apiDetails){
        await headerLink.clickAPIHeader(); 
        await manageAPI.openCreatedAPI(apiDetails[i].apiName, apiDetails[i].version);
        await policies.clickPoliciesLink();
        await globalPolicy.verifyGlobalPolicyAppliedInAPILevel(policyList);
    }
});


Then("Activate created Global Policy", async function(){
    await globalPolicy.activateGlobalPolicy(name);
});