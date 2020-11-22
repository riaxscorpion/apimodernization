@04Odata
Feature: 04. Testing API-Gateway using ODATA (Import from URL)
    Creation of REST API services from URL in API Gateway, This flow contains creation of API from URL and checking the service in api portal    

    @TestCaseKey=RNDSIQA-T8079
    Scenario: API_CLD_GW_14_Import Odata URL in API Gateway.
        Given Login to API gateway as Administrator
        Then Click on APIs link
        Then Click Create API for REST_OData04
    
    @TestCaseKey=RNDSIQA-T8080
    Scenario: API_CLD_GW_15_Activate the Created API.
        Then Activate and Verify REST_OData04


    @TestCaseKey=RNDSIQA-T8081
    Scenario: API_CLD_GW_16_Verify the OData API details.
        # Then Publish REST_OData04


    @TestCaseKey=RNDSIQA-T8082
    Scenario: API_CLD_GW_17_Publish the Created API.
        Then Publish REST_OData04

 

