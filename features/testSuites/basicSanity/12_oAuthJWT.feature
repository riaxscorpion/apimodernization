@oauthjwt
Feature: 12. Oauth and JWT policy testcases
    Creating a JSON with oauth and JWT I&A policy

    
    Scenario: Create new API for oauth policy verification
        Given Login to API gateway as Administrator
        Then Click on APIs link
        Then Click Create API for oauth policy verification

    
    Scenario: Create new API for JWT policy verification
        Given Login to API gateway as Administrator
        Then Click on APIs link
        Then Click Create API for JWT policy verification


    @TestCaseKey=RNDSIQA-T8308
    Scenario: API_CLD_GW_55_Apply Oauth2Token Policy with Approval Settings in Gateway
        Then Click on APIs link
        Then Open created API to apply oauth policy
        Then Click on Policies link under API Level
        Then Click On Edit Button
        Then Create API Level Policy as required for oAuth API
        Then Click on Save Button to save API Level Policies
        Then Click on APIs link
        Then Activate required API for oauth verification
        Then Publish created API for oauth verification
        Then Navigate to Administration page
        Then Navigate to Security tab
        Then Add the oAuth scope
        Then Navigate to oAuth openID scopes page
        Then Map scope to API and created scope


    @TestCaseKey=RNDSIQA-T8310
    Scenario: API_CLD_GW_57_Apply JWT Policy with Approval Settings in Gateway
        Then Click on APIs link
        Then Open created API to apply JWT policy
        Then Click on Policies link under API Level
        Then Click On Edit Button
        Then Create API Level Policy as required for JWT API
        Then Click on Save Button to save API Level Policies
        Then Click on APIs link
        Then Activate required API for JWT verification
        Then Publish created API for JWT verification
        Then Navigate to Administration page
        Then Navigate to Security tab
        Then Add the JWT configuration


    @TestCaseKey=RNDSIQA-T8309
    Scenario: API_CLD_GW_56_Create an application for oauth using get access token through API Portal
        Given Login to API Portal as Administrator
        Then Request oAuth Access Token Application for API through API Portal


    
    # Scenario: Invoke API which has oAuth Policy through API Portal
    #     # Given Login to API Portal as Administrator
    #     Then Test API Portal of oAuth API with approved oauth Token Application


    # @ojp @approve
    # Scenario: Approve application which is created in API Portal through API gateway
    #     Given Login to API gateway as Administrator
    #     Then Navigate to Pending Request link
    #     Then Go to Pending Request tab
    #     Then Approve all the pending requests


    @TestCaseKey=RNDSIQA-T8311
    Scenario: API_CLD_GW_56_Create an application for JWT using get access token through API Portal
        Given Login to API Portal as Administrator
        Then Request JWT Access Token Application for API through API Portal


    Scenario: Invoke API which has JWT Policy through API Portal
        # Given Login to API Portal as Administrator
        Then Test API Portal of JWT API with approved JWT Token Application