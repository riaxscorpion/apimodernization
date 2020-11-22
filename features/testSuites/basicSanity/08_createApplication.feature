@08Application
Feature: 08. Creating Application
    Creation of Application to be associated to APIs    


    @TestCaseKey=RNDSIQA-T8096
    Scenario: API_CLD_GW_29_Create Application in API Gateway.
        Given Login to API gateway as Administrator
        Then Click on Applications link
        Then Create Application
        Then Click on Applications link
        Then Add Identifiers to Application

 
    Scenario: API_CLD_GW_30_Get API Key from Application
        Then Click on Applications link
        Then Get API Key from Application and store it
        
    

