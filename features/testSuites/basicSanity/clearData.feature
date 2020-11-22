@cleanup
Feature: 13. Deleting created API's, Applications etc..
   Delete all API's, Applications, Template, Global Policies etc. etc.


   Scenario: Delete Applications
      Given Login to API gateway as Administrator
      Then Click on Applications link
      Then Delete Applications


   Scenario: Delete Global Policies
      Then Click on Policies link
      Then Click on global policies
      Then Delete Global Policies
      Then Click on Policies link
      Then Click on Policy Templates link
      Then Delete Policy Template


   Scenario: Deactivate all API's
      Then Click on APIs link
      Then Deactivate all APIs


   Scenario: Unpublish all API's
      Then Click on APIs link
      Then Unpublish all APIs


   Scenario: Delete all API's
      Then Click on APIs link
      Then Delete all APIs


   Scenario: Delete Oauth Data
      Then Navigate to Administration page
      Then Navigate to Security tab
      Then Delete Oauth Scopes
      Then Navigate to Administration page
      Then Navigate to oAuth openID scopes page
      Then Delete Oauth Map Scopes