@06Versioning
Feature: 06. Testing API-Gateway using REST API (Versioning)							
    Creation of Versioning of APIs    

    @TestCaseKey=RNDSIQA-T8089
    Scenario: API_CLD_GW_24_Create Versioning of API.
        Given Login to API gateway as Administrator
        Then Click on APIs link
        Then Open Created API for Versioning
        Then Create Version


    @TestCaseKey=RNDSIQA-T8090
    Scenario: API_CLD_GW_25_Activate the versioned REST API.
        Then Activate and Verify REST_Scratch08


    @TestCaseKey=RNDSIQA-T8091
    Scenario: API_CLD_GW_26_Publish the versioned REST API.
        Then Publish Versioned REST_Scratch08
        
    

