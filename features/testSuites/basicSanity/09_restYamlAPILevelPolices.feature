@09APIPolicies
Feature: 09. Functioning of API gateway with few Policies applied (OR / AND / HTTP / HTTPS / Global Applications / Registered Applications)
    Functioning of API gateway with few Policies applied (OR / AND / HTTP / HTTPS / Global Applications / Registered Applications)


    @TestCaseKey=RNDSIQA-T8097
    Scenario: API_CLD_GW_31_Select Rest_yaml_Swagger REST API and apply 1st set of policies
        Given Login to API gateway as Administrator
        Then Click on APIs link
        Then Click Create API for REST_JSON_WP
        Then Click on Policies link under API Level
        Then Click On Edit Button
        Then Create API Level Policy as required "REST_JSON_WP"
        Then Click on Save Button to save API Level Policies
        Then Click on APIs link
        Then Activate required API "REST_JSON_WP"
        Then Publish "REST_JSON_WP"


    @TestCaseKey=RNDSIQA-T8099
    Scenario: API_CLD_GW_32_Select Rest_yaml_Swagger REST API and apply 2nd set of policies
        Then Click on APIs link
        Then Click Create API for REST_YAML_WP
        Then Click on Policies link under API Level
        Then Click On Edit Button
        Then Create API Level Policy as required "REST_YAML_WP"
        Then Click on Save Button to save API Level Policies
        Then Click on APIs link
        Then Activate required API "REST_YAML_WP"
        Then Publish "REST_YAML_WP"


    @TestCaseKey=RNDSIQA-T8101
    Scenario: API_CLD_GW_33_Select Rest_yaml_Swagger REST API and apply 3rd set of policies
        Then Click on APIs link
        Then Click Create API for SOAP_WP
        Then Click on Policies link under API Level
        Then Click On Edit Button
        Then Create API Level Policy as required "SOAP_WP"
        Then Click on Save Button to save API Level Policies
        Then Click on APIs link
        Then Activate required API "SOAP_WP"
        Then Publish "SOAP_WP"


    @TestCaseKey=RNDSIQA-T8103
    Scenario: API_CLD_GW_34_Select Rest_yaml_Swagger REST API and apply 4th set of policies
        Then Click on APIs link
        Then Click Create API for REST_OData_WP
        Then Click on Policies link under API Level
        Then Click On Edit Button
        Then Create API Level Policy as required "REST_OData_WP"
        Then Click on Save Button to save API Level Policies
        Then Click on APIs link
        Then Activate required API "REST_OData_WP"
        Then Publish "REST_OData_WP"


    @TestCaseKey=RNDSIQA-T8105
    Scenario: API_CLD_GW_35_Select Rest_yaml_Swagger REST API and apply 5th set of policies
        Then Click on APIs link
        Then Click Create API for REST_Scratch_WP
        Then Add Resources and verify the REST API REST_Scratch_WP
        Then Click on Policies link under API Level
        Then Click On Edit Button
        Then Create API Level Policy as required "REST_Scratch_WP"
        Then Click on Save Button to save API Level Policies
        Then Click on APIs link
        Then Activate required API "REST_Scratch_WP"
        Then Publish "REST_Scratch_WP"