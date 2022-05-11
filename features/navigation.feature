Feature: Briq navigation

  Background: Navigation
    Given User opens briq welcome page

  Scenario: Click build button
    When `Build` button is clicked
    Then User is presented with canvas

  Scenario: Get help
    Given User opens briq builder page
    When `Help` button is clicked
    Then User is redirected to the `How to` guide
