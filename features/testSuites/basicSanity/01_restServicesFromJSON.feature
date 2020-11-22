@01Json
Feature: 01. Testing API-Gateway using REST API (Import json file)
    Creation of REST API services from URL in API Gateway, This flow contains creation of API from File and checking the service in api portal    

    @TestCaseKey=RNDSIQA-T8066
    Scenario: API_CLD_GW_01_Import a json file in API Gateway.
        Given Login to API gateway as Administrator
        Then Click on APIs link
        # Then Click Create API for REST_JSON01

    @TestCaseKey=RNDSIQA-T8067
    Scenario: API_CLD_GW_02_Activate the Created API.
        Then Activate and Verify REST_JSON01

    @TestCaseKey=RNDSIQA-T8068
    Scenario: API_CLD_GW_03_Publish the Created API.
        Then Publish REST_JSON01


