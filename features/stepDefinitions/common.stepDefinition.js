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

setDefaultTimeout(60 * 10000);
browser.ignoreSynchronization = true;

var url       = jenkinsProperties.gateway_url;
var username  = jenkinsProperties.username;
var password  = jenkinsProperties.password;


//Printing the scenario name for reference.
Before(async function(scenario){
    console.log("\n"+"Executing Now ---- "+scenario.pickle.name);
});


// Taking Screenshot //
After(async function(){
    let self = this;

    return browser.takeScreenshot().then(async function(screenshot){
        const img = new Buffer(screenshot.replace(/^data:image\/png;base64,/, ''), 'base64');
        self.attach(img, 'image/png');
    })
});


Given("Login to API gateway as Administrator", async function(){
    await loginModule.loginToAPIGateway(url, username, password);
});

Given("Login to API Portal as Administrator", async function(){
    await loginModule.loginToAPIPortal(url, username, password);
});

Then("Click on APIs link", async function(){
    await headerLink.clickAPIHeader();
});


Then("Click on Policies link", async function(){
    await headerLink.clickPoliciesHeader();
});


Then("Click Create API button", async function(){
    await createAPI.clickCreateAPIButton();
});


Then("Click on Applications link", async function(){
    await headerLink.clickApplicationsHeader();
});


Then("Click on Policies link under API Level", async function(){
    await policies.clickPoliciesLink();
});



Then("Click on global policies", async function(){
    await globalPolicy.clickGlobalPolicyLink();
});


Then("Click on Create Global policies", async function(){
    await globalPolicy.clickCreateGlobalPolicyButton();
});


Then("Click on Policy Templates link", async function(){
    await createTemplate.clickPolicyTemplateLink();
});


Then("Click on Create policy template button", async function(){
    await createTemplate.clickCreatePolicyTemplateButton();
});


Then("Navigate to Administration page", async function(){
    await adminSettings.clickMenuOptions();
    await adminSettings.clickAdministrationLink();
});


Then("Navigate to Security tab", async function(){
    await adminSettings.clickOnSecutiryTab();
});


Then("Navigate to oAuth openID scopes page", async function(){
    await adminSettings.clickMenuOptions();
    await oauthScopes.clickOnOauthOpenIDScopes();
});


Then("Navigate to Pending Request link", async function(){
    await adminSettings.clickMenuOptions();
    await pendingReq.clickpendingRequest();
});

Then("Go to Pending Request tab", async function(){
    await pendingReq.clickOnpendingRequestionTab();
});



