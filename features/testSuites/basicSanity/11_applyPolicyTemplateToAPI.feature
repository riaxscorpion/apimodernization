@11applyPolicyTemplate
Feature: 11. Add/Remove Policy from Template
    Add/Remove Policy from Template and Template contains many policies combinations

    @TestCaseKey=RNDSIQA-T8109
    Scenario: API_CLD_GW_37_Add Policy to the API using policy Template
        Given Login to API gateway as Administrator
        Then Click on APIs link
        Then Open created API to apply policy template
        Then Click on Policies link under API Level
        Then Click On Edit Button to apply template
        Then Apply required Template to API
        Then Click on Save Button to apply template


    @TestCaseKey=RNDSIQA-T8111
    Scenario: API_CLD_GW_37_Activate the API
        Then Click on APIs link
        Then Activate required API after applying template


    @TestCaseKey=RNDSIQA-T8112
    Scenario: Republish all API's for testing in Portal
        Then Wait for sometime
        Then Click on APIs link
        Then Publish REST_JSON01
        Then Publish REST_YAML01
        Then Publish SOAP03
        Then Publish REST_OData04
        Then Publish REST_Scratch08
        Then Publish Versioned REST_Scratch08
        Then Publish REST_Scratch_Template
        Then Publish "REST_JSON_WP"
        Then Publish "REST_YAML_WP"
        Then Publish "SOAP_WP"
        Then Publish "REST_OData_WP"
        Then Publish "REST_Scratch_WP"


    Scenario: Adding API's to Created Application
        Given Login to API gateway as Administrator
        Then Click on Applications link
        Then Add API to Application