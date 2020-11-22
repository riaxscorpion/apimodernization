@03Soap
Feature: 03. Testing API-Gateway using SOAP (Import from URL)
    Creation of SOAP API services from URL in API Gateway, This flow contains creation of API from URL and checking the service in api portal    

    @TestCaseKey=RNDSIQA-T8074
    Scenario: API_CLD_GW_09_Import SOAP URL in API Gateway.
        Given Login to API gateway as Administrator
        Then Click on APIs link
        Then Click Create API for SOAP03
        
    
    @TestCaseKey=RNDSIQA-T8075
    Scenario: API_CLD_GW_10_Activate the Created API.
        Then Activate SOAP03


    @TestCaseKey=RNDSIQA-T8076
    Scenario: API_CLD_GW_11_Verify the Created API.
        Then Verify SOAP03


    @TestCaseKey=RNDSIQA-T8077
    Scenario: API_CLD_GW_12_Publish the Created API.
        Then Publish SOAP03


