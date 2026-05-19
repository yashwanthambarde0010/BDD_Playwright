Feature: Way2Automation Login Validation
  As a registered user
  I want to validate login behavior
  So that valid and invalid login paths are tracked

  @smoke
  Scenario: Valid login should succeed
    Given I open the Way2Automation login page
    When I submit login credentials "testuser" and "testpassword"
    Then I should see a login result message containing "Welcome"

  @sanity
  Scenario: Invalid password should fail
    Given I open the Way2Automation login page
    When I submit login credentials "testuser" and "wrongpassword"
    Then I should see a login result message containing "Invalid"

  @sanity
  Scenario: Empty credentials should show an error
    Given I open the Way2Automation login page
    When I submit login credentials "" and ""
    Then I should see a login result message containing "required"

  @sanity
  Scenario: Intentionally failing login scenario
    Given I open the Way2Automation login page
    When I submit login credentials "intentionally" and "failing"
    Then I should see a login result message containing "this text will not exist"
