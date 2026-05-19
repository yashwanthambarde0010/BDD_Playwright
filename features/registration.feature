Feature: Registration Feature
  As a user
  I want to register for an account
  So that I can access the application

  Scenario Outline: Validating the Registration Feature
    Given I navigate to the registration page
    When I enter the name as "<name>"
    And I enter the phone number as "<phone>"
    And I enter the email as "<email>"
    And I enter the city as "<city>"
    And I enter the username as "<username>"
    And I enter the password as "<password>"
    And I select the country as "<country>"
    And I click the register button

  Examples:
    | name          | phone      | email                      | country | city   | username | password |
    | Yashwant      | 9711111558 | trainer@way2automation.com | India   | Noida  | rahul123 | rahul123 |
    | Hambarde      | 9711191558 | info@way2automation.com    | Germany | Berlin | raman123 | raman123 |