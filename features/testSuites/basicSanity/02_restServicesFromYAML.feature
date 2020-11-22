@02Yaml
Feature: 02. Testing API-Gateway using REST API (Import yaml file)
    Creation of REST API services from yaml in API Gateway, This flow contains creation of API from File and checking the service in api portal    

    @TestCaseKey=RNDSIQA-T8070
    Scenario: API_CLD_GW_05_Import a json file in API Gateway.
        Given Login to API gateway as Administrator
        Then Click on APIs link
        Then Click Create API for REST_YAML01
    
    
    @TestCaseKey=RNDSIQA-T8071
    Scenario: API_CLD_GW_06_Activate the Created API.
        Then Activate and Verify REST_YAML01


    @TestCaseKey=RNDSIQA-T8072
    Scenario: API_CLD_GW_07_Publish the Created API.
        Then Publish REST_YAML01


