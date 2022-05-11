Feature: Briqs builder

  Background: Navigation
    Given User opens briq builder page

  Scenario: Left click introduces a new briq
    And Amount of used briqs is 27
    When User left clicks on x=400 and y=400 coordinates in the canvas
    Then Amount of used briqs is 28

  Scenario: Right click removes the brig
    When User left clicks on x=500 and y=500 coordinates in the canvas
    Then Amount of used briqs is 28
    When User right clicks on x=500 and y=500 coordinates in the canvas
    Then Amount of used briqs is 27
