@07GlobalPolicies
Feature: 07. Functioning of API gateway with Global Policy applied
    Create new Global Policies and apply the global policies to all the API's   


    @TestCaseKey=RNDSIQA-T8093
    Scenario: API_CLD_GW_28_Create Global Policy and Verify whether the same applied to each API created
        Given Login to API gateway as Administrator
        Then Click on Policies link
        Then Click on global policies
        Then Click on Create Global policies
        Then Create Global Policy as required
        Then Activate created Global Policy
        Then Verify Applied Global Policy under API Level


    @TestCaseKey=RNDSIQA-T8094
    Scenario: API_CLD_GW_20_Verify the Policies by invoking the API from API Portal


    @TestCaseKey=RNDSIQA-T8095
    Scenario: API_CLD_GW_21_Verify the Log in Analytics