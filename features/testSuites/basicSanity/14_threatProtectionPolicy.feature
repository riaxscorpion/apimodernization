Feature: Implement and manage global policies.  
   Invoke REST API by applying Threat Protection Policy (Create Rules and Enable Global DOS)

   Scenario: Create REST API in API Gateway.
      Given Login to API gateway as Administrator
      Then Click on APIs link
      Then Click Create API for threat Protection Policy
      Then Add Resources and verify the REST API for threat Protection Policy
      Then Activate and Verify API for threat Protection Policy
      Then Publish REST API for threat Protection Policy
   
   Scenario: Add Rule Type1
      Then Click on Policies
      Then Click on Threat Protection
      Then Add Type1 Rule under Threat Protection

   Scenario: Invoke REST API in API Portal After adding Rule Type1
      Given Login to API Portal as Administrator
      Then Test REST_API with input less than 1 MB
      Then Test REST_API with input more than 1 MB

   Scenario: Delete Rule Type1
      Given Login to API gateway as Administrator
      Then Click on Policies
      Then Click on Threat Protection
      Then Delete Type1 Rule under Threat Protection

   Scenario: Add Rule Type2
      Then Click on Policies
      Then Click on Threat Protection
      Then Add Type2 Rule under Threat Protection

   Scenario: Invoke REST API in API Portal after adding Rule Type2
      Given Login to API Portal as Administrator
      Then Test REST_API with input less than 1 MB
      Then Test REST_API with input more than 1 MB

   Scenario: Delete Rule Type2
      Given Login to API gateway as Administrator
      Then Click on Policies
      Then Click on Threat Protection
      Then Delete Type2 Rule under Threat Protection

   Scenario:Enable Global denial of service
      Then Click on Policies
      Then Click on Threat Protection
      Then Enable Global denial of service

   Scenario: Invoke REST API in API Portal After Enabling the Global DOS 
      Given Login to API Portal as Administrator
      Then Test REST_API after enabling Global DOS
      Then Test REST_API Again after One Minute 

   Scenario:Disable Global denial of service
      Given Login to API gateway as Administrator
      Then Click on Policies
      Then Click on Threat Protection
      Then Disable Global denial of service

