@05Rest
Feature: 05. Create REST service from scratch in API Gateway
    Creation of REST API services from scratch in API Gateway, This flow contains creation of API from URL and checking the service in api portal    

    @TestCaseKey=RNDSIQA-T8084
    Scenario: API_CLD_GW_19_Import Odata URL in API Gateway.
        Given Login to API gateway as Administrator
        Then Click on APIs link
        Then Click Create API for REST_Scratch08
        
    
    @TestCaseKey=RNDSIQA-T8085
    Scenario: API_CLD_GW_20_Add Resources and verify the REST API REST_Scratch08.
        Then Add Resources and verify the REST API REST_Scratch08


    @TestCaseKey=RNDSIQA-T8086
    Scenario: API_CLD_GW_21_Activate the created REST API.
        Then Activate and Verify REST_Scratch08


    @TestCaseKey=RNDSIQA-T8087
    Scenario: API_CLD_GW_22_Publish the Created API.
        Then Publish REST_Scratch08


