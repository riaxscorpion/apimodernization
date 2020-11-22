@APIPortal
Feature: 12. All API Portal testcases
    Verify all the APIs in API Portal created in API Gateway

    @TestCaseKey=RNDSIQA-T8069
    Scenario: API_CLD_GW_04_Test the api in API Portal.
        Given Login to API Portal as Administrator
        Then Test REST_JSON01


    @TestCaseKey=RNDSIQA-T8073
    Scenario: API_CLD_GW_08_Test the api in API Portal.
        Then Test REST_YAML02


    @TestCaseKey=RNDSIQA-T8078
    Scenario: API_CLD_GW_13_Test the api in API Portal.
        Then Test SOAP03


    @TestCaseKey=RNDSIQA-T8083
    Scenario: API_CLD_GW_18_Test the api in API Portal.
        Then Test REST_OData04


    @TestCaseKey=RNDSIQA-T8088
    Scenario: API_CLD_GW_23_Test the api in API Portal.
        Then Test REST_Scratch05


    @TestCaseKey=RNDSIQA-T8092
    Scenario: API_CLD_GW_27_Test the api in API Portal.
        Then Test Versioned REST_Scratch05

    @TestCaseKey=RNDSIQA-T8098
    Scenario: Test the api in API Portal with Policy for JSON.
        Then Test REST_JSON_WP


    @TestCaseKey=RNDSIQA-T8100
    Scenario: Test the api in API Portal with Policy for Yaml
        Then Test REST_YAML_WP


    @TestCaseKey=RNDSIQA-T8102
    Scenario: Test the api in API Portal with Policy for Soap.
        Then Test SOAP_WP


    @TestCaseKey=RNDSIQA-T8104
    Scenario: Test the api in API Portal with Policy for OData.
        Then Test REST_OData_WP


    @TestCaseKey=RNDSIQA-T8106
    Scenario: Test the api in API Portal with Policy for Scratch.
        Then Test REST_Scratch_WP


    @TestCaseKey=RNDSIQA-T8113
    Scenario: Test the api in API Portal with policy Template applied.
        Then Test REST_Scratch_Template