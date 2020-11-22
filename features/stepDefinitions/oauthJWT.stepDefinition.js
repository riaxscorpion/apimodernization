var { Before, After, Given, Then, setDefaultTimeout} = require('cucumber');
const jenkinsProperties = require("../properties/readProperties");
const loginModule = require("../modules/baseModule/login.module");
const headerLink = require("../modules/baseModule/headerLinks");
const createAPI = require("../modules/createAPIs/createAPI");
const policies = require('../modules/APILevelSpecifications/policies');
const globalPolicy = require("../modules/globalLevelSpecifications/globalPolicies");
const createTemplate = require("../modules/globalLevelSpecifications/createTemplate");
const adminSettings = require("../modules/MenuOptions/administrationSettings");
const oauthScopes = require("../modules/MenuOptions/oAuthOpenIDScopes");
const pendingReq = require("../modules/MenuOptions/pendingRequests");
const manageAPI = require("../modules/createAPIs/manageAPI");
var data = require("../properties/data.json");

setDefaultTimeout(60 * 10000);
browser.ignoreSynchronization = true;

var oAuthData = data.data_12.oAuthDetails;
var JWTData = data.data_12.JWTDetails;


Then("Click Create API for oauth policy verification", async function(){
    await createAPI.clickCreateAPIButton();
    await createAPI.createAPIFromFile(oAuthData.oAuthFilePath, oAuthData.oAuthapiName, oAuthData.oAuthapiType, oAuthData.oAuthversion);
    await createAPI.clickCreateButtonFile();

});


Then("Click Create API for JWT policy verification", async function(){
    await createAPI.clickCreateAPIButton();
    await createAPI.createAPIFromFile(JWTData.JWTFilePath, JWTData.JWTapiName, JWTData.JWTapiType, JWTData.JWTversion);
    await createAPI.clickCreateButtonFile();
});


Then("Open created API to apply oauth policy", async function(){
    await manageAPI.openCreatedAPI(oAuthData.oAuthapiName, oAuthData.oAuthversion);
});

Then("Create API Level Policy as required for oAuth API", async function(){
    for(i in oAuthData.oAuthPolicyDetails){
        await policies.clickOnPolicyCategoryName(oAuthData.oAuthPolicyDetails[i].PolicyCategoryName);
        await policies.AddPolicyProperty(oAuthData.oAuthPolicyDetails[i].policyPropertyName);
        await policies.configurePolicyProperty(oAuthData.oAuthPolicyDetails[i].policyPropertyName, oAuthData.oAuthPolicyDetails[i].propertyDetails);
    }
});

Then("Activate required API for oauth verification", async function(){
    await manageAPI.activateAPI(oAuthData.oAuthapiName, oAuthData.oAuthversion);
});

Then("Publish created API for oauth verification", async function(){
    await manageAPI.publishVersionedAPI(oAuthData.oAuthapiName, oAuthData.oAuthversion);
});

Then("Add the oAuth scope", async function(){
    await adminSettings.clickjwtOauthOpenIDLink();
    await adminSettings.addOAuthScopes(oAuthData.scopeName, oAuthData.scopeDescription);

});

Then("Map scope to API and created scope", async function(){
    await oauthScopes.CreateMapScope(oAuthData.scopeName, oAuthData.apiLevelScopeName, oAuthData.oAuthapiName, oAuthData.oAuthversion);
});

Then("Open created API to apply JWT policy", async function(){
    await manageAPI.openCreatedAPI(JWTData.JWTapiName, JWTData.JWTversion);
});

Then("Create API Level Policy as required for JWT API", async function(){
    for(i in JWTData.JWTPolicyDetails){
        await policies.clickOnPolicyCategoryName(JWTData.JWTPolicyDetails[i].PolicyCategoryName);
        await policies.AddPolicyProperty(JWTData.JWTPolicyDetails[i].policyPropertyName);
        await policies.configurePolicyProperty(JWTData.JWTPolicyDetails[i].policyPropertyName, JWTData.JWTPolicyDetails[i].propertyDetails);
    }
});


Then("Activate required API for JWT verification", async function(){
    await manageAPI.activateAPI(JWTData.JWTapiName, JWTData.JWTversion);
});

Then("Publish created API for JWT verification", async function(){
    await manageAPI.publishVersionedAPI(JWTData.JWTapiName, JWTData.JWTversion);
});

Then("Add the JWT configuration", async function(){
    await adminSettings.clickjwtOauthOpenIDLink();
    await adminSettings.jwtConfigurations(JWTData.jwtConfigurations);
});


Then("Approve all the pending requests", async function(){
    await pendingReq.approveAllRequests();
});



