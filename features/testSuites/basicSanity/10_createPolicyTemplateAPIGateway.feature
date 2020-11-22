@10CreatePolicyTemplate
Feature: 10. Policy Template in API Gateway
    Policy Template in API Gateway and Template contains many policies combinations


    @TestCaseKey=RNDSIQA-T8107
    Scenario: API_CLD_GW_36_Create Policy Template in API Gateway
        Given Login to API gateway as Administrator
        Then Click on Policies link
        Then Click on Policy Templates link
        Then Click on Create policy template button
        Then Enter policy template details
        Then Add Policies for template as required
        Then Click on Save Button to save Policy Template
        Then Verify template created

    @TestCaseKey=RNDSIQA-T8108
    Scenario: Create Scratch API to Apply Template
        Then Click on APIs link
        Then Click Create API for REST_Scratch_Template
        Then Add Resources and verify the REST API REST_Scratch_Template
        
