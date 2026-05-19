Feature: Way2Automation Homepage Validation
  As a visitor
  I want to verify homepage stability
  So that the website has no broken links and enough visible content

  @smoke
  Scenario: Verify no broken links exist on homepage
    Given I open the Way2Automation homepage
    When I collect all homepage links
    Then all homepage links should return a valid status

  @smoke @sanity
  Scenario: Validate visible image count is greater than one
    Given I open the Way2Automation homepage
    Then I should see more than one visible image on the homepage
