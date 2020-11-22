var obj = require("../../properties/objects.json");
const { element, browser } = require("protractor");
var chai = require('chai');
var chaiAsPromised = require("chai-as-promised");
const { stringify } = require("dot-properties");
chai.use(chaiAsPromised);
var expect = chai.expect;

var EC = protractor.ExpectedConditions;

var objPolicies = obj.APILevelSpecfications.Policies;

module.exports = {
    clickPoliciesLink: async function () {
        await browser.wait(EC.elementToBeClickable(await element(by.id(objPolicies.clickPoliciesButton)), 180000, "API POLICIES NOT FOUND"));
        await browser.sleep(4000);
        await element(by.id(objPolicies.clickPoliciesButton)).click();
    },


    clickEditButton: async function () {
        await browser.wait(EC.visibilityOf(await element(by.buttonText(objPolicies.clickEditButton)), 180000, "API POLICIES NOT FOUND"));
        await browser.sleep(3000);
        await element(by.buttonText(objPolicies.clickEditButton)).click();
        // await browser.wait(EC.visibilityOf(await element(by.xpath(objPolicies.clickYesForEdit)), 180000, "API POLICIES NOT FOUND"));
        // await element(by.xpath(objPolicies.clickYesForEdit)).click();
        await browser.wait(EC.not(EC.visibilityOf(await element(by.xpath(obj.baseModule.login.loadingImage)), 180000, "API POLICIES NOT FOUND")));
        await browser.sleep(2000);
    },


    clickSaveButton: async function () {
        await browser.wait(EC.visibilityOf(element(by.buttonText(objPolicies.clickSaveButton)), 180000, "API POLICIES NOT FOUND"));
        await element(by.buttonText(objPolicies.clickSaveButton)).click();
        await browser.wait(EC.not(EC.visibilityOf(await element(by.xpath(obj.baseModule.login.loadingImage)), 180000, "API POLICIES NOT FOUND")));
        await browser.sleep(2000);
    },


    clickOnPolicyCategoryName: async function (PolicyCategoryName) {
        await browser.wait(EC.elementToBeClickable(element(by.xpath(objPolicies.clickOnSpecificPolicy_1 + PolicyCategoryName + objPolicies.clickOnSpecificPolicy_2)), 180000, "API POLICIES NOT FOUND"));
        await browser.sleep(4000);
        await element(by.id(objPolicies.currentViewinActionContainer)).getText().then(async function (currentView) {
            if (currentView == PolicyCategoryName) {
                console.log("Already in the same Policy");
            } else {
                await element(by.xpath(objPolicies.clickOnSpecificPolicy_1 + PolicyCategoryName + objPolicies.clickOnSpecificPolicy_2)).click();
                await browser.sleep(4000);
            }
        });
    },


    verifyPolicyCategoryOpens: async function (PolicyCategoryName) {
        await element(by.id(objPolicies.currentViewinActionContainer)).getText().then(async function (currentView) {
            if (currentView == PolicyCategoryName) {
                console.log("Required Policy details selected");
            } else {
                throw new Error("Required Policy is NOT getting selected - FAILED");
            }
        });
    },


    defaultPolicyChecking: async function (PolicyCategoryName) {
        await this.clickOnPolicyCategoryName(PolicyCategoryName);
        await this.verifyPolicyCategoryOpens(PolicyCategoryName);
        if (PolicyCategoryName == "Transport") {
            await element.all(by.css(objPolicies.checkAlreadyAddedPolicies)).count().then(async function (polcount) {
                expect(polcount).to.equal(1);
            });
        } else if (PolicyCategoryName == "Routing") {
            await element.all(by.css(objPolicies.checkAlreadyAddedPolicies)).count().then(async function (polcount1) {
                expect(polcount1).to.equal(1);
            });
        } else {
            await element.all(by.css(objPolicies.checkAlreadyAddedPolicies)).count().then(async function (polcount1) {
                expect(polcount1).to.equal(0);
            });
        }
    },


    AddPolicyProperty: async function (policyPropertyName) {
        await element(by.xpath(objPolicies.modifyPolicyPropertyButton_1 + policyPropertyName + objPolicies.modifyPolicyPropertyButton_2)).isPresent().then(async function (alreadyadded) {
            if (alreadyadded) {
                await element(by.xpath(objPolicies.modifyPolicyPropertyButton_1 + policyPropertyName + objPolicies.modifyPolicyPropertyButton_2)).click();
            } else {
                await element(by.xpath(objPolicies.addPolicyPropertiesButton_1 + policyPropertyName + objPolicies.addPolicyPropertiesButton_2)).click();
            }
        })
        await browser.sleep(4000);
        // expect(await element(by.id(objPolicies.checkAfteraddingProperty)).getText()).to.equal(policyPropertyName);
    },


    ModifyPolicyProperty: async function (policyPropertyName) {
        await element(by.xpath(objPolicies.modifyPolicyPropertyButton_1 + policyPropertyName + objPolicies.modifyPolicyPropertyButton_2)).click();
        await browser.sleep(4000);
        expect(await element(by.id(objPolicies.checkAfteraddingProperty)).getText()).to.equal(policyPropertyName);
    },


    //*********************************** Calling All the Policy in single function ********************************/

    configurePolicyProperty: async function (policyPropertyName, policyDetails) {
        if (policyPropertyName == "Log Invocation") {
            await this.logInvocation(policyDetails);
        } else if (policyPropertyName == "Enable HTTP / HTTPS") {
            await this.enableHttpHttps(policyDetails);
        } else if (policyPropertyName == "Identify & Authorize Application") {
            await this.IdentifyAuthorizeApplication(policyDetails);
        } else if (policyPropertyName == "Straight Through Routing") {
            await this.straightThroughRouting(policyDetails);
        } else if (policyPropertyName == "Throttling Traffic Optimization") {
            await this.throttlingTrafficOptimization(policyDetails);
        } else if (policyPropertyName == "Outbound Authentication - Transport") {
            await this.outboundAuthTrasport(policyDetails);
        }
    },



    // ************************************************ Policy Category - Transport Policy ***********************************

    enableHttpHttps: async function (enableHTTPHTTPS) {

        for (var i in enableHTTPHTTPS) {
            await element(by.xpath(objPolicies.Transport.checkforHTTPHTTPSSelection_1 + enableHTTPHTTPS[i].protocol + objPolicies.Transport.checkforHTTPHTTPSSelection_2)).isSelected().then(async function (selstatus) {
                if (selstatus == enableHTTPHTTPS[i].status) {
                    console.log("No Change");
                } else {
                    await element(by.xpath(objPolicies.Transport.checkforHTTPHTTPSSelection_1 + enableHTTPHTTPS[i].protocol + objPolicies.commonXpathEnding)).click();
                }
            });
        }
    },

    setMediaType: async function () {

    },


    // ************************************************ Policy Category - Identify and Access Policy ***********************************

    IdentifyAuthorizeApplication: async function (IdAuthAppData) {
        await element(by.xpath(objPolicies.Identify_Access.checkforAuthorizeCheckBox + IdAuthAppData.condition + objPolicies.commonXpathEnding)).click();
        if (IdAuthAppData.allowAnonymus == true) {
            await element(by.xpath(objPolicies.Identify_Access.verifyAllowAnonymusCheckBox)).isSelected().then(async function (allowstatus) {
                if (allowstatus == false) {
                    await element(by.xpath(objPolicies.Identify_Access.clickAllowAnonymusCheckBox)).click();
                }
            })
        } else if (IdAuthAppData.allowAnonymus == false) {
            await element(by.xpath(objPolicies.Identify_Access.verifyAllowAnonymusCheckBox)).isSelected().then(async function (allowstatus) {
                if (allowstatus == true) {
                    await element(by.xpath(objPolicies.Identify_Access.clickAllowAnonymusCheckBox)).click();
                }
            })
        }

        for (var i in IdAuthAppData.IdentificationTypes) {
            await element(by.xpath(objPolicies.Identify_Access.verifyidAccessTypes_1 + IdAuthAppData.IdentificationTypes[i].IDType + objPolicies.Identify_Access.verifyidAccessTypes_2)).isSelected().then(async function (idselstate) {
                if (idselstate == false) {
                    await element(by.xpath(objPolicies.Identify_Access.identificationType + IdAuthAppData.IdentificationTypes[i].IDType + "']")).click();
                    await browser.sleep(2000);
                }
            });
            if (IdAuthAppData.IdentificationTypes[i].AppLookupCondition != null) {
                await element(by.xpath(objPolicies.Identify_Access.selectApplookupCondition_1 + IdAuthAppData.IdentificationTypes[i].IDType + objPolicies.Identify_Access.selectApplookupCondition_2 + IdAuthAppData.IdentificationTypes[i].AppLookupCondition + objPolicies.commonXpathEnding)).click();
                await browser.sleep(2000);
            }
        }
    },


    customExtension: async function () {

    },


    // ************************************************ Policy Category - Traffic Monitoring *******************************************

    logInvocation: async function (logInvocationData) {
        for (var j in logInvocationData.logInvocationTypes) {
            await element(by.xpath(objPolicies.TrafficMonitoring.verifyLogInvocationTypes_1 + logInvocationData.logInvocationTypes[j] + objPolicies.TrafficMonitoring.verifyLogInvocationTypes_2)).isSelected().then(async function (loginvostatus) {
                if (loginvostatus == false) {
                    await element(by.xpath(objPolicies.TrafficMonitoring.clickLogInvocationTypes + logInvocationData.logInvocationTypes[j] + objPolicies.commonXpathEnding)).click();
                }
            })
        }
        await element(by.xpath(objPolicies.TrafficMonitoring.clickLogGenFrequency + logInvocationData.logGenFrequency + objPolicies.commonXpathEnding)).click();
        for (var k in logInvocationData.destination) {
            await element(by.xpath(objPolicies.TrafficMonitoring.verifyDestination_1 + logInvocationData.destination[k] + objPolicies.TrafficMonitoring.verifyDestination_2)).isSelected().then(async function (deststatus) {
                if (deststatus == false) {
                    await element(by.xpath(objPolicies.TrafficMonitoring.clickDestination + logInvocationData.destination[k] + objPolicies.commonXpathEnding)).click();
                }
            })
        }
        await browser.sleep(2000);
    },


    throttlingTrafficOptimization: async function (throttleData) {
        // await element(by.xpath("//div[div[text()='Add dependent policy']]")).isPresent().then(async function(popup){
        //     if(popup == true){
        //         await element(by.xpath("//div[div[text()='Add dependent policy']]/following-sibling::div//button[text()='No']")).click();
        //         await browser.sleep(4000);
        //     }
        // });
        await element(by.xpath(objPolicies.TrafficMonitoring.clickTrottelingValues)).sendKeys(throttleData.value);
        for (k in throttleData.destination) {
            await element(by.xpath(objPolicies.TrafficMonitoring.verifyDestination_1 + throttleData.destination[k] + objPolicies.TrafficMonitoring.verifyDestination_2)).isSelected().then(async function (deststatus) {
                if (deststatus == false) {
                    await element(by.xpath(objPolicies.TrafficMonitoring.clickDestination + throttleData.destination[k] + objPolicies.commonXpathEnding)).click();
                }
            })
        }
        await element(by.xpath(objPolicies.TrafficMonitoring.typeAlertInterval)).sendKeys(throttleData.alertInterval);
        await element(by.xpath(objPolicies.TrafficMonitoring.clickUnit + throttleData.unit + objPolicies.commonXpathEnding)).click();
        await element(by.xpath(objPolicies.TrafficMonitoring.clickAlertFrequency + throttleData.alertFrequency + objPolicies.commonXpathEnding)).click();
        await element(by.xpath(objPolicies.TrafficMonitoring.typeAlertMessage)).sendKeys(throttleData.alertMessage);
        await element(by.xpath(objPolicies.TrafficMonitoring.typeConsumerApplication)).sendKeys(throttleData.consumerApplications);
        await browser.sleep(5000);
        el = await element(by.xpath(objPolicies.TrafficMonitoring.selectConsumerApplication + throttleData.consumerApplications + objPolicies.commonXpathEnding));
        await browser.executeScript('arguments[0].scrollIntoView()', el.getWebElement());
        await browser.sleep(3000);
        await el.click();
    },


    // ************************************************ Policy Category - Routing *******************************************

    outboundAuthTrasport: async function (outboundData) {
        await element(by.xpath(objPolicies.Routing.outboundAuthScheme + outboundData.authScheme + objPolicies.commonXpathEnding)).click();
        if (outboundData.authScheme == "Basic" || outboundData.authScheme == "NTLM") {
            await element(by.xpath(objPolicies.Routing.outboundAuthScheme + outboundData.authSchemeDetails.authUsing + objPolicies.commonXpathEnding)).click();
            await element(by.xpath(objPolicies.Routing.outboundUsername)).sendKeys(outboundData.authSchemeDetails.username);
            await element(by.xpath(objPolicies.Routing.outboundPassword)).sendKeys(outboundData.authSchemeDetails.password);
            await element(by.xpath(objPolicies.Routing.outboundDomain)).sendKeys(outboundData.authSchemeDetails.domain);
        } else if (outboundData.authScheme == "Kerberos") {
            await element(by.xpath(objPolicies.Routing.outboundAuthScheme + outboundData.authSchemeDetails.authUsing + objPolicies.commonXpathEnding)).click();
            await element(by.xpath(objPolicies.Routing.outboundClientPrincipal)).sendKeys(outboundData.authSchemeDetails.clientPrincipal);
            await element(by.xpath(objPolicies.Routing.outboundClientPassword)).sendKeys(outboundData.authSchemeDetails.clientPassword);
            await element(by.xpath(objPolicies.Routing.outboundServicePrincipal)).sendKeys(outboundData.authSchemeDetails.servicePrinipal);
            await element(by.xpath("//label[text()='" + outboundData.authSchemeDetails.nameForm + objPolicies.commonXpathEnding)).click();

        } else if (outboundData.authScheme == "OAuth2") {
            await element(by.xpath(objPolicies.Routing.outboundAuthScheme + outboundData.authSchemeDetails.authUsing + objPolicies.commonXpathEnding)).click();
            await element(by.xpath(objPolicies.Routing.outboundOauthToken)).sendKeys(outboundData.authSchemeDetails.oauthToken);
        } else if (outboundData.authScheme == "JWL") {
            await element(by.xpath(objPolicies.Routing.outboundAuthScheme + outboundData.authSchemeDetails.authUsing + objPolicies.commonXpathEnding)).click();
        }
    },


    straightThroughRouting: async function (straightRoutingData) {
        if (straightRoutingData.defaultValues == false) {
            await element(by.xpath(objPolicies.Routing.straightEndpointURI)).sendKeys(straightRoutingData.endpointURI);
            await element(by.xpath(objPolicies.Routing.straightHttpMethod + straightRoutingData.httpMethod + objPolicies.commonXpathEnding)).click();
            await element(by.xpath(objPolicies.Routing.straightConnectTimeout)).sendKeys(straightRoutingData.connTimeout);
            await element(by.xpath(objPolicies.Routing.straightReadTimeout)).sendKeys(straightRoutingData.readTimeout);
            await element(by.xpath(objPolicies.Routing.straightKeyStoreAlias)).sendKeys(straightRoutingData.keystoreAlias);
            await browser.sleep(2000);
            await element(by.xpath(objPolicies.Routing.straightClick + straightRoutingData.keystoreAlias + objPolicies.commonXpathEnding)).click();
            await element(by.xpath(objPolicies.Routing.striaghtKeyAlias)).sendKeys(straightRoutingData.keyAlias);
            await browser.sleep(2000);
            await element(by.xpath(objPolicies.Routing.straightClick + straightRoutingData.keyAlias + objPolicies.commonXpathEnding)).click();
        }
    }
}