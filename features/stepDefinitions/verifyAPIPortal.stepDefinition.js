var { Given, Then, setDefaultTimeout } = require('cucumber');
var data = require("../properties/data.json");
var apigallery = require("../modules/APIPortal/APIGallery/apigallery");
var headerlink = require("../modules/APIPortal/baseModule/headerLinks");
const { version } = require('chai');
var jenkinsProperties = require("../properties/readProperties");

setDefaultTimeout(60 * 10000);
browser.ignoreSynchronization = true;
var readProp = require("../properties/readProperties");

var username = jenkinsProperties.username;
var password = jenkinsProperties.password;

var API_01 = data.data_01;
var API_02 = data.data_02;
var API_03 = data.data_03;
var API_04 = data.data_04;
var API_05 = data.data_05;
var API_06_Vrsn = data.data_06;
var API_07_WP = data.data_09.REST_JSON_WP;
var API_08_WP = data.data_09.REST_YAML_WP;
var API_09_WP = data.data_09.SOAP_WP;
var API_10_WP = data.data_09.REST_OData_WP;
var API_11_WP = data.data_09.REST_Scratch_WP;
var oAuthData = data.data_12.oAuthDetails;
var JWTData = data.data_12.JWTDetails;
var API_12_Template = data.data_10;



Then("Test REST_JSON01", async function () {

    await headerlink.clickAPIGallery();
    await apigallery.clickViewDetailsOfAPI(API_01.apiName);
    await apigallery.clickOnTryAPI();
    await apigallery.clickMethodHeading(API_01.methodHeading);
    await apigallery.clickMethod(API_01.methodHeading, API_01.methodName);
    await apigallery.clickSendButton();
    await apigallery.verifyResponse(API_01.statusCode);
});

Then("Test REST_YAML02", async function () {

    await headerlink.clickAPIGallery();
    await apigallery.clickViewDetailsOfAPI(API_02.apiName);
    await apigallery.clickOnTryAPI();

    await apigallery.clickMethodHeading(API_02.methodHeading);
    await apigallery.clickMethod(API_02.methodHeading, API_02.methodName);
    await apigallery.clickSendButton();
    await apigallery.verifyResponse(API_02.statusCode);
});

Then("Test SOAP03", async function () {

    await headerlink.clickAPIGallery();
    await apigallery.clickViewDetailsOfAPI(API_03.apiName);
    await apigallery.clickOnTryAPI();

    await apigallery.clickSOAPMethodName(API_03.methodName1);
    await apigallery.clickBodyTab();
    await apigallery.clickSendButton();
    await apigallery.verifyResponse(API_03.statusCode);

    await apigallery.clickSOAPHeading(API_03.methodHeading2);
    await apigallery.clickSOAPMethodName(API_03.methodName2);
    await apigallery.clickBodyTab();
    await apigallery.clickSendButton();
    await apigallery.verifyResponse(API_03.statusCode);


});

Then("Test REST_OData04", async function () {

    await headerlink.clickAPIGallery();
    await apigallery.clickViewDetailsOfAPI(API_04.apiName);
    await apigallery.clickOnTryAPI();
    await apigallery.clickMethod(API_04.methodHeading, API_04.methodName);
    await apigallery.clickBodyTab();
    await apigallery.clickSendButton();
    await apigallery.verifyResponse(API_04.statusCode);
});

Then("Test REST_Scratch05", async function () {

    await headerlink.clickAPIGallery();
    await apigallery.clickViewDetailsOfAPI(API_05.apiName);
    await apigallery.selectAPIVerision(API_05.version);
    await apigallery.clickOnTryAPI();
    await apigallery.clickMethod(API_05.methodHeading, API_05.methodName);
    await apigallery.addHeaders(API_05.keys, API_05.values);
    await apigallery.addBasicAuthorization(API_05.authType, API_05.username, API_05.password);
    await apigallery.clickBodyTab();
    await apigallery.addBody(API_05.bodyInfo);
    await apigallery.clickSendButton();
    await apigallery.verifyResponse(API_05.statusCode);
    // await apigallery.verifyThrotllingResponse(API_05.throttlevalue, API_05.message, API_05.statusCode, API_05.throtllingStatusCode);
});



Then("Test REST_JSON_WP", async function () {
    var runtimeData = readProp.runtimeData();

    await headerlink.clickAPIGallery();
    await apigallery.clickViewDetailsOfAPI(API_07_WP.apiName);
    await apigallery.clickOnTryAPI();
    await apigallery.clickMethodHeading(API_07_WP.methodHeading);
    await apigallery.clickMethod(API_07_WP.methodHeading, API_07_WP.methodName);
    await apigallery.addHeaders(runtimeData[0], runtimeData[1]);
    await apigallery.clickSendButton();
    await apigallery.verifyResponse(API_07_WP.statusCode);
});


Then("Test REST_YAML_WP", async function () {
    var runtimeData = readProp.runtimeData();

    await headerlink.clickAPIGallery();
    await apigallery.clickViewDetailsOfAPI(API_08_WP.apiName);
    await apigallery.clickOnTryAPI();

    await apigallery.clickMethodHeading(API_08_WP.methodHeading);
    await apigallery.clickMethod(API_08_WP.methodHeading, API_07_WP.methodName);
    await apigallery.addHeaders(runtimeData[0], runtimeData[1]);
    await apigallery.clickSendButton();
    await apigallery.verifyResponse(API_08_WP.statusCode);
});


Then("Test SOAP_WP", async function () {
    var runtimeData = readProp.runtimeData();

    await headerlink.clickAPIGallery();
    await apigallery.clickViewDetailsOfAPI(API_09_WP.apiName);
    await apigallery.clickOnTryAPI();

    await apigallery.clickSOAPMethodName(API_09_WP.methodName1);
    await apigallery.addHeaders(runtimeData[0], runtimeData[1]);
    await apigallery.clickBodyTab();
    await apigallery.clickSendButton();
    await apigallery.verifyResponse(API_09_WP.statusCode);

    await apigallery.clickSOAPHeading(API_09_WP.methodHeading2);
    await apigallery.clickSOAPMethodName(API_09_WP.methodName2);
    await apigallery.clickBodyTab();
    await apigallery.clickSendButton();
    await apigallery.verifyResponse(API_09_WP.statusCode);


});

Then("Test REST_OData_WP", async function () {
    var runtimeData = readProp.runtimeData();

    await headerlink.clickAPIGallery();
    await apigallery.clickViewDetailsOfAPI(API_10_WP.apiName);
    await apigallery.clickOnTryAPI();

    await apigallery.clickMethod(API_10_WP.methodHeading, API_10_WP.methodName);
    await apigallery.addHeaders(runtimeData[0], runtimeData[1]);
    await apigallery.clickBodyTab();

    await apigallery.clickSendButton();
    await apigallery.verifyResponse(API_10_WP.statusCode);
});

Then("Test REST_Scratch_WP", async function () {
    var runtimeData = readProp.runtimeData();

    await headerlink.clickAPIGallery();
    await apigallery.clickViewDetailsOfAPI(API_11_WP.apiName);
    await apigallery.clickOnTryAPI();

    await apigallery.clickMethod(API_11_WP.methodHeading, API_11_WP.supportedMethods);
    await apigallery.addHeaders(API_11_WP.keys, API_11_WP.values);
    await apigallery.addHeaders(runtimeData[0], runtimeData[1]);
    await apigallery.addBasicAuthorization(API_11_WP.authType, username, password);
    await apigallery.clickBodyTab();
    await apigallery.addBody(API_11_WP.bodyInfo);

    await apigallery.clickSendButton();
    await apigallery.verifyResponse(API_11_WP.statusCode);
    // await apigallery.verifyThrotllingResponse(API_11_WP.throttlevalue, API_11_WP.message, API_11_WP.statusCode, API_11_WP.throtllingStatusCode);
});


Then("Test Versioned REST_Scratch05", async function () {
    await headerlink.clickAPIGallery();
    await apigallery.clickViewDetailsOfAPI(API_06_Vrsn.apiName);
    await apigallery.verifyAPIVerision(API_06_Vrsn.version);
    await apigallery.clickOnTryAPI();

    await apigallery.clickMethod(API_06_Vrsn.methodHeading, API_06_Vrsn.methodName);
    await apigallery.addHeaders(API_06_Vrsn.keys, API_06_Vrsn.values);
    await apigallery.addBasicAuthorization(API_06_Vrsn.authType, API_06_Vrsn.username, API_06_Vrsn.password);
    await apigallery.clickBodyTab();
    await apigallery.addBody(API_06_Vrsn.bodyInfo);

    await apigallery.clickSendButton();
    await apigallery.verifyResponse(API_06_Vrsn.statusCode);
});


// Then("Test Policy", async function () {
//     await headerlink.clickAPIGallery();
//     await apigallery.clickViewDetailsOfAPI(apiName02);
//     await apigallery.clickOnTryAPI();

//     await apigallery.clickMethod(methodHeading02, methodName02);
//     await apigallery.addHeaders(keys05, values05);
//     await apigallery.clickBodyTab();

//     await apigallery.verifyThrotllingResponse(value, message, statusCode, throtllingStatusCode);
// });



Then("Request oAuth Access Token Application for API through API Portal", async function () {

    await headerlink.clickAPIGallery();
    await apigallery.clickViewDetailsOfAPI(oAuthData.oAuthapiName);
    await apigallery.clickGetAccessToken();
    await apigallery.setApplicationName(oAuthData.applicationName);
    await apigallery.clickRequestToken();
    await apigallery.clickCloseButton();

});



Then("Test API Portal of oAuth API with approved oauth Token Application", async function () {

    await headerlink.clickAPIGallery();
    await apigallery.clickViewDetailsOfAPI(oAuthData.oAuthapiName);
    await apigallery.clickOnTryAPI();
    await apigallery.clickApplicationDropDown(oAuthData.applicationName);

    await apigallery.addOAuthAuthorization(oAuthData.authType, oAuthData.tokenName, oAuthData.scopeName);


    await apigallery.clickMethodHeading(oAuthData.methodHeading);
    await apigallery.clickMethod(oAuthData.methodHeading, oAuthData.methodName);

    await apigallery.clickBodyTab();
    await apigallery.clickSendButton();
    await apigallery.verifyResponse(oAuthData.statusCode);

});


Then("Request JWT Access Token Application for API through API Portal", async function () {

    await headerlink.clickAPIGallery();
    await apigallery.clickViewDetailsOfAPI(JWTData.JWTapiName);
    await apigallery.clickGetAccessToken();
    await apigallery.setApplicationName(JWTData.applicationName);
    await apigallery.clickRequestToken();
    await apigallery.clickCloseButton();
});


Then("Test API Portal of JWT API with approved JWT Token Application", async function () {

    await headerlink.clickAPIGallery();
    await apigallery.clickViewDetailsOfAPI(JWTData.JWTapiName);
    await apigallery.clickOnTryAPI();
    await apigallery.clickApplicationDropDown(JWTData.applicationName);

    await apigallery.addJWTAuthorization(JWTData.authType, JWTData.username, JWTData.password);

    await apigallery.clickMethodHeading(JWTData.methodHeading);
    await apigallery.clickMethod(JWTData.methodHeading, JWTData.methodName);

    // await apigallery.clickBodyTab();
    await apigallery.clickSendButton();
    await apigallery.verifyResponse(JWTData.statusCode);
});



Then("Test REST_Scratch_Template", async function(){
    await headerlink.clickAPIGallery();
    await apigallery.clickViewDetailsOfAPI(API_12_Template.apiName);
    await apigallery.clickOnTryAPI();
    await apigallery.clickMethod(API_12_Template.methodHeading, API_12_Template.methodName);
    await apigallery.addHeaders(API_12_Template.keys, API_12_Template.values);
    await apigallery.addBasicAuthorization(API_12_Template.authType, username, password);
    await apigallery.clickBodyTab();
    await apigallery.addBody(API_12_Template.bodyInfo);
    await apigallery.clickSendButton();
    await apigallery.verifyResponse(API_12_Template.statusCode);
});



