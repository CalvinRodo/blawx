# Changelog

Notable changes to Blawx will be documented here.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).
As of v0.2-alpha, this project is attempting to adhere to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).
While alpha, however, any version may include breaking changes that may not be specifically noted as such,
and breaking changes will not necessarily result in changes to the main version number.

## [v1.3.31-alpha](https://github.com/Lexpedite/blawx/releases/tag/v1.3.31-alpha) 2022-09-29

No user-facing changes.

### Changed
* Revised the Dockerfile to speed up development builds
* Switched to develop version of blockly.

## [v1.3.30-alpha](https://github.com/Lexpedite/blawx/releases/tag/v1.3.30-alpha) 2022-09-28

This update gives the scenario editor the ability to indicate which objects, attributes, and values are relevant
for finding additional non-contingent answers to your test question. It also improves the relevance calculations
used in the interview endpoint.

BlawxBot is removed, and in the documentation and tutorials where it was referred to as an example it has been replaced with
the same example in the Scenario Editor.

### Added
* Scenario editor now indicates what additional facts would be relevant to un-conditional answers to the query by highlighting
  the relevant add object and add value buttons in green.
* Scenario editor will highlight relevant values in boolean and object selector new value inputs.
* Scenario editor will indicate (by highlighting the expand button) that there are hidden relevant attributes in collapsed categories and objects.

### Changed
* Constraints and other residual information will now be displayed inside models instead of inside
  answers in the scenario editor.
* Explanations for the same bindings but different constraints or hypothesized variables will be treated
  as explanations for the same answer in the scenario editor.
* The interview endpoint now returns all answers, including answers that rely on assumptions specified in
  the fact data.
* BlawxBot has been removed from the interface, until it is revised to work with the new interview endpoint.
* BlawxBot has been removed from the documentation, until it is revised to work with the new interview endpoint.
* Added documentation for the scenario editor.
* Updated the Beginner's Guide to use the scenario editor instead of BlawxBot in Step 4.
* Updated the tutorial to use the scenario editor instead of BlawxBot
* Updated images in the documentation to remove the BlawxBot button.

### Fixed
* The presence of singleton variables in answers no longer causes console warnings in the scenario editor.
* If you specify that a category is abducible in the scenario editor, it is abducible only with regard to objects
  that are not already a part of that category, this was not previously true, which was causing duplicate answers.
* If you specify that a category is abducible in the scenario editor, the attributes of abduced objects are also
  made abducible. This was not previously true, which was causing there to be no answers when only categories
  were abducible in the scenario editor.

## [v1.3.29-alpha](https://github.com/Lexpedite/blawx/releases/tag/v1.3.29-alpha) 2022-09-25

### Added
* Scenario editor now uses the same natural language generation used in explanations in the user interface

### Changed
* In order to provide additional space for NLG text, the scenario editor has been made a single-column tabbed interface.

## [v1.3.28-alpha](https://github.com/Lexpedite/blawx/releases/tag/v1.3.28-alpha) 2022-09-25

### Added
* Scenario editor will now deal with numerical values, dates, and durations

### Fixed
* The ontology endpoint will now function properly when number values are defined in the code and tests.

### Changed
* The `/run` and `/interview` endpoints now accept dates in the 'yyyy-mm-dd' format, and durations in the '[-]PyYmMdD' format.
* The `/onto` endpoint now returns dates in the 'yyyy-mm-dd' format, and durations in the '[-]PyYmMdD' format.

## [v1.3.27-alpha](https://github.com/Lexpedite/blawx/releases/tag/v1.3.27-alpha) 2022-09-15

### Added
* The "Scenario Editor" has been added to the test interface
* Added documentation for the Scenario Editor component to the docs

### Changed
* The `/onto` endpoint on tests will only return fully-ground responses

### Fixed
* The reasoner API will no longer create duplicate facts if facts specified in the rule and test
  are re-submitted in the JSON payload for the `/run` and `/interview` endpoints. ([#342](https://github.com/Lexpedite/blawx/issues/342)).

## [v1.3.26-alpha](https://github.com/Lexpedite/blawx/releases/tag/v1.3.26-alpha) 2022-08-10

### Fixed
* A bug where multiple users importing the same project caused code to disappear was fixed.

## [v1.3.25-alpha](https://github.com/Lexpedite/blawx/releases/tag/v1.3.25-alpha) 2022-08-09

### Fixed
* A bug where non-admin users did not have permissions to export projects was fixed.

## [v1.3.24-alpha](https://github.com/Lexpedite/blawx/releases/tag/v1.3.24-alpha) 2022-07-21

### Fixed
* A permission problem that was preventing tests from being created properly has been solved.

## [v1.3.23-alpha](https://github.com/Lexpedite/blawx/releases/tag/v1.3.23-alpha) 2022-07-21

Bug fixes and updates to documentation

### Fixed
* A problem that was preventing tests from saving properly has been solved.

### Added
* install.md now has more detailed instructions on what is required to deploy Blawx to production.

## [v1.3.22-alpha](https://github.com/Lexpedite/blawx/releases/tag/v1.3.22-alpha) 2022-07-11

This release adds the ability for administrative users to turn off user registration, for restricted-access
deployments.

### Added
* An "allow user registration" setting has been added to the interface. If set to false, the "register" links
  will not appear and the user registration view will be forbidden.

### Changed
* The option to "register" now appears in the top bar alongside "login" for unauthenticated users.

### Fixed
* Authenticated users other than the owner have access to published projects.

## [v1.3.21-alpha](https://github.com/Lexpedite/blawx/releases/tag/v1.3.21-alpha) 2022-07-11

You can now "publish" a project in the Rule Editor screen, which gives other users, including
anonymous users, read-only access to view the code, and the ability to run tests and BlawxBot,
and the ability to access the API endpoints for that project and its tests. 

### Added
* The user registration page will set the default username based on an X-Forwarded-Email header if present.
* Projects can now be set to "published" in the Rule Editor screen and admin interface.
* Anonymous users and users other than the owner of the project have read and execute
  access to published rules and their associated tests.
* The admin interface now allows permissions to be set for users and groups with regard
  to specific rules, workspaces, and tests.

### Changed
* User interface elements that require permissions you do not have will appear disabled.
* The coding interface in Code Editor and Test Editor will be read-only if you do not have permissions to change the code.

## [v1.3.20-alpha](https://github.com/Lexpedite/blawx/releases/tag/v1.3.20-alpha) 2022-07-11

This release adds user registration, restricts access to projects that the user created,
and allows the user to create new projects from templates and tutorials.

These features make it possible for Blawx to be used in a multi-user environment.

### Breaking Changes
* Note that `.blawx` files from previous versions will not work with this version. You can address this problem
  by editing your `.blawx` files to add an `owner` field to your `ruledoc` objects, only. You can set the value
  to any number, it will be ignored on import.

### Added
* User registration - non-admin users can create user accounts for themselves.
* Users can now only see and interact with projects they created.

### Changed
* Tutorials and Examples are now available from the New Project button.
* Updates to Beginner's Guide and Examples documentation.

### Fixed
* A bug in the project import method has been fixed.

## [v1.3.19-alpha](https://github.com/Lexpedite/blawx/releases/tag/v1.3.19-alpha) 2022-07-07

### Added
* A tutorial based on a simplified version of the Wills example
* Documentation for the Wills tutorial.

### Fixed
* Overrule blocks will now accept variables in addition to section selector blocks.
* Comments work again.
* Long contents in the rightbar makes it scrollable

### Changed
* Documentation was updated to add the "Tutorial" button in the interface.
* Blockly version temporarily fixed at 8.0.2 until comments work in current.
* The rightbor in the Code Editor has been made wider to make reading the tutorial content easier.

## [v1.3.18-alpha](https://github.com/Lexpedite/blawx/releases/tag/v1.3.18-alpha) 2022-06-29

### Added
* Rules can now have associated tutorials, which can be accessed in the right sidebar of the code editor when present

### Fixed
* A change in how the s(CASP) library reports reasons broke the interview endpoint's relevance calculations.
* Saving rules with no tests defined caused a malformed .blawx file
* Crash in New Rule screen
* Headers in doc sidebar were linked to root of blawx server

### Changed
* Dockerfile generates superuser and database at build time
* Password for admin user can be set by providing `--build-arg SU_PASSWORD=password` as a parameter to `docker build`.
* Google fonts are now installed locally to the Docker container to facilitate off-line use
* jQuery is now installed locally to the Docker container to facilitate off-line use
* bootstrap is now installed locally to the Docker container to facilitate off-line use
* bootstrap-icons is now installed locally to the Docker container to facilitate off-line use
* What the exit and cancel buttons do (and whether they appear) in the rule editor now depends on whether you got
  to it from an existing rule, or while trying to create a new rule

## [v1.3.17-alpha](https://github.com/Lexpedite/blawx/releases/tag/v1.3.17-alpha) 2022-06-28

This version adds a first attempt at user authentication. Currently, one admin user `admin` and one non-admin user `demo`
are created by default, each with the password `blawx2022`. The admin account can use the admin interface at `/admin`
to add and remove users. All authenticated users can access all features of the site. Unauthenticated users cannot
access any of the server's capabilities. Exposing Web API end-points for public use will be implemented in a future version.

This version also re-implements the import/export features that were available prior to v1. If you are in the rule page,
you can now hit the "Export" button to download your rule, all of its associated code, and all of its associated tests,
as a single `.blawx` file. If you are on the main page, you can use the "Import" button to upload a `.blawx` file to your
server. Note that while Blawx is in alpha, there is no guarantee that `.blawx` files made with one version of Blawx
will work in a later version. We will do our best to indicate when there are breaking changes and how you might resolve
them.

We have also made a number of improvements to the user interface designed to make it easier to use and more consistent.

### Added
* The version of Blawx currently installed is now visible in the footer of each page after the copyright notice
* User Authentication - you will be prompted to log in when required
* Username, Change Password, and Logout/Login are displayed on header.
* Documentation - New Page on admin interface for adding users
* Import/Export - It is now possible to save your rule to a `.blawx` file from inside the rule screen,
  and to import a `.blawx` file from the main Blawx screen, allowing you to save and share your work
  even if the server goes down.

### Changed
* By default, only authenticated users have access to anything other than the rule index and the documentation
* Changes to the user interface on several pages

## [v1.3.16-alpha](https://github.com/Lexpedite/blawx/releases/tag/v1.3.16-alpha) 2022-06-23

### Added
* Beard Tax Act example project

### Fixed
* Code runs properly when single quotes occur in the text fields of a category or attribute customize block


## [v1.3.15-alpha](https://github.com/Lexpedite/blawx/releases/tag/v1.3.15-alpha) 2022-06-22

This release improves the interview endpoint's method of determining which attributes and categories
are relevant, and also improves BlawxBot's ability to describe fact scenarios and derive relevant
categories from relevant attributes. The Wills Act example has been modified to demonstrate
these capabilities, and the documentation updated.

### Changed
* The interview endpoint was modified to calculate question relevance better, and BlawxBot was
  revised to match.
* The Wills Act example and documentation was updated to demonstrate the new reasoning capabilities.

### Removed
* An example project was temporarily removed.

## [v1.3.14-alpha](https://github.com/Lexpedite/blawx/releases/tag/v1.3.14-alpha) 2022-06-22

Removing temporary fix for problems with SWI-Prolog. If you experience problems using
this version, you may need to rebuild the docker container using the `--no-cache` option,
to ensure that Docker grabs the latest release of SWI-Prolog when building.

### Changed
* The MQI.pl file and the steps in the Dockerfile for installing it have been removed,
  as the problems with MQI have now been resolved in the latest version of SWI-Prolog.

## [v1.3.13-alpha](https://github.com/Lexpedite/blawx/releases/tag/v1.3.13-alpha) 2022-06-21

This update brings all of the documentation included up to speed with the current version
of the software, taking into account outstanding bugs.  

### Added
* Documentation for Answers and Explanations
* Documentation for Dates and Durations
* Documentation for Defaults and Exceptions
* Documentation for Logical Constraints
* Documentation for Numerical Constraints
* Documentation for Numbers and Math
* Documentation for BlawxBot
* Documentation for Web API
* Documentation for CLEAN
* Several Example Documentation Pages
* Linked new blocks to their own help pages

### Changed
* Completely re-organized and re-wrote the Beginner's Guide to Blawx
* Updated all other documentation to current version.
* User interface documentation now uses animated gifs

## [v1.3.12-alpha](https://github.com/Lexpedite/blawx/releases/tag/v1.3.12-alpha) 2022-06-17

### Fixed
* Legal texts with sandwich sections caused the code editor to crash. ([Issue #258](https://github.com/Lexpedite/blawx/issues/258))

## [v1.3.11-alpha](https://github.com/Lexpedite/blawx/releases/tag/v1.3.11-alpha) 2022-06-08

Milestone: Automated Interviews

This release marks the end of the automated interview milestone. Expect near-future changes
to focus on updating documentation, adding demonstrations, and occasional bug fixes.

### Changed
* The interview end point now generates relevant category and attribute data on the basis of
  an abductive query based on the user's input so far.
* BlawxBot now uses the relevance information from the interview end point to determine whether
  or not it needs to ask each question.
* The Rock Paper Scissors demonstrate code has been modified to ensure that games and players
  are relevant categories in BlawxBot. This may be undone once
  BlawxBot is dealing better with category relevance and question order.

### Added
* A Wills Act demonstration, with a test that can be run in BlawxBot to demonstrate that it
  is deciding whether to ask questions on the basis of whether they are logically relevant.

## [v1.3.10-alpha](https://github.com/Lexpedite/blawx/releases/tag/v1.3.10-alpha) 2022-06-07

Fixing display of attributed variables in answers.

### Changed
* Inequality and numerical constraints on bound variables are now displayed in the bindings of answers.
* Names generated by the reasoner are not displayed as attributes.

## [v1.3.9-alpha](https://github.com/Lexpedite/blawx/releases/tag/v1.3.9-alpha) 2022-06-03

Added ontology and interview endpoints for tests, and added BlawxBot demonstration expert systems to tests.

Note that there are a lot of improvements to come in BlawxBot, but it will at least run all the existing example tests.

Also made the navigation tree and output pane display automatically, to simplify the interface for new users.

### Added
* Each test now has a `onto/` endpoint from which a list of categories, attributes, and their natural language
  generation expressions can be obtained.
* Each test now has a `interview/` endpoint which will currently return any answers that can be
  generated, ignoring the "known" entries in the data submitted over JSON, and a list of relevant
  categories and attributes to collect as input. Currently, all categories and attributes are returned
  in all cases.
* Demonstration chatbot at `bot/` for each test
* "Bot" button in test endpoint.

### Fixed
* The ontology endpoint now works with codebases that have no attributes in them.

### Changed
* The Copyright notice in the footer was corrected.
* The output pane in tests is displayed automatically when the user clicks "Run".
* The navigation pane in the code interface is displayed automatically when the page opens.


## [v1.3.8-alpha](https://github.com/Lexpedite/blawx/releases/tag/v1.3.8-alpha) 2022-05-12

Updates to the JSON data format expected by the tests/run endpoint.

### Added
* You can now make "assume" statements in your data payload to
  the test/run endpoint.

### Changed
* The format expected by the test/run endpoint now looks like this:
  ```
  {
    "person": {
      "members_known": false,
      "attributes_known": {
        "test_attribute": false
      },
      "members": {
        "jason": {
          "favourite_number": {
            "values_known": false,
            "values": [42]
          }
        }
      }
    }
  }
  ```
  Detailed documentation will come later, but the 'members_known', 'attributes_known', and 'values_known',
  give you the ability to add three different sorts of
  "assume" statements over the JSON Payload.


## [v1.3.7-alpha](https://github.com/Lexpedite/blawx/releases/tag/v1.3.7-alpha) 2022-05-11

Dates and Durations.

### Added
* Date and Duration Data Type Selectors
* Date and Duration Value Inputs
* Date and Duration Builders, Comparison, Date Add, Date Difference
* Net 30 Example

## [v1.3.6-alpha](https://github.com/Lexpedite/blawx/releases/tag/v1.3.6-alpha) 2022-05-11

This release just finishes a first draft of the code for the Rule 34 example, and adds
a test that replicates the experiment originally done in [Morris, Jason. "Constraint answer set programming as a tool to improve legislative drafting: a rules as code experiment." *Proceedings of the Eighteenth International Conference on Artificial Intelligence and Law*. 2021.](https://dl.acm.org/doi/abs/10.1145/3462757.3466084)

### Changed
* Rule 34 example is finished

### Added
* Test for Rule 34 example

## [v1.3.5-alpha](https://github.com/Lexpedite/blawx/releases/tag/v1.3.5-alpha) 2022-05-09

This release adds some examples, but more importantly makes some changes to the reasoner to
ensure that a problem with some tests not returning results.
The Rule 34 example is incomplete, and will be updated in a later release.

Much thanks to Jan Wielemaker (SWI-Prolog) and Eric Zinda (MQI) for upstream code changes
that were necessary to get those tests running.

### Added
* Some examples rules, and tests.

### Changed
* Some tests will now return an additional variable named "Attributes".

### Fixed
* Problems with some queries that appeared not to terminate have been corrected.
* links to rules in a span of text now show up properly in explanations

## [v1.3.4-alpha](https://github.com/Lexpedite/blawx/releases/tag/v1.3.4-alpha) 2022-04-27

This update makes changes to the back-end of how code is generated by Blawx. The
only user-facing change should be the fix below.

### Fixed
* Code with comments in the Blocks will now work properly (issue #184)

## [v1.3.3-alpha](https://github.com/Lexpedite/blawx/releases/tag/v1.3.3-alpha) 2022-04-20

This update improves the formatting of explanations in the reasoner, adds text
of the relevant rules to the output of the reasoner, and makes corresponding
changes to the API endpoint for running tests.

This version will break code that was using the previous version of the blocks
in the "known sections" drawer of the toolbox.

### Added
* Answers include the bindings of the variables named in the Question.
* A new `{rulenumber}/rule/{section_id}` endpoint has been created that will return
  the XML and plain text of a portion of the rule's text document indicated by the `eId`
  attribute for the AkomaNtoso section.

### Changed
* If a question returns multiple explanations, they are now grouped according
  to the bindings for the variables in the question. This allows the user to
  see which explanations are for the same answer.
* Explanations are now presented in a nested collapsible tree structure, so
  that the user can navigate to the portions of the explanation that are
  most relevant for them.
* The format of results from the `{rulenumber}/{testname}/run` endpoint has
  been modified extensively.
* In explanations, when a rule is mentioned in an "according to",
  the name of the rule is a link with a tooltip that
  will show the text of the relevant section.
* We have changed how rule names are displayed in explanations to avoid
  exposing implementation details not relevant to the user.

## [v1.3.2-alpha](https://github.com/Lexpedite/blawx/releases/tag/v1.3.2-alpha) 2022-04-07

This update allows you to use the defeasibility features for defaults
and exceptions that occur inside a single section of the rules.

### Added
* Blawx now supports the use of span elements generated in Clean>=0.0.4
* In the Rule navigator, now only clicking on the "arrow" will open
  up the sub-parts of a section of a rule.

## [v1.3.1-alpha](https://github.com/Lexpedite/blawx/releases/tag/v1.3.1-alpha) 2022-03-29

### Fixed
* Problems with primary and known section drawers in Test interface.

## [v1.3.0-alpha](https://github.com/Lexpedite/blawx/releases/tag/v1.3.0-alpha) 2022-03-28

This update adds defeasibility back to the v1 series.

### Added
* There is now an "Exceptions" drawer in the toolbox, with the blocks required
  for using the defeasibility system: overrules, opposes, according to, and holds.
* There is now a "Known Sections" drawer, with rule section selectors for each
  of the elements in the rule navigation tree, for use in the according to and
  overrules blocks.
* A new example has been added called Tweety that shows how the exceptions
  system works.

### Changed
* The primary drawer is now dynamically generated, and has two additional
  entries, a query that includes the "holds" block, and a rule that includes
  the "according to" block filled in for the currently-selected rule.

## [v1.2.0-alpha](https://github.com/Lexpedite/blawx/releases/tag/v1.2.0-alpha) 2022-03-11

The point of this update is to make it easy to edit your natural-language
legislation inside the Blawx interface. The minor version change indicates
that fixtures in the previous versions will no longer load in this version of
blawx because the data structure has changed.

### Added
* Rule Editing View

### Changed
* Laws are now specified using the [clean markdown language](https://github.com/lexpedite/clean), instead of in Akoma Ntoso. Akoma Ntoso is still used to generate the user interface, and the ability to export and import Akoma Ntoso
  will be added later.

### Removed
* The demonstration Rule demonstrating a complicated Akoma Ntoso example has
  been removed.

## [v1.1.0-alpha](https://github.com/Lexpedite/blawx/releases/tag/v1.1.0-alpha) 2022-03-01

### Added
* Code is now organized among Rules, Sections, and Tests
* Rules can be created using Akoma Ntoso encodings of legislation
* Complex Akoma Ntoso example
* Simple Rock Paper Scissors example with encoding and test

### Changed
There have been significant changes to almost all aspects of the tool, many of
which are breaking. You can expect that code created with any previous version
will not work in this version.

## [v1.0.6-alpha](https://github.com/Lexpedite/blawx/releases/tag/v1.0.6-alpha) 2022-02-08

### Added
* JSON Input primary block
* Documentation page for JSON input primary block
* JSON input processing on run endpoint

### Changed
* Requests to run code from the interface now use application/json content type


## [v1.0.5-alpha](https://github.com/Lexpedite/blawx/releases/tag/v1.0.5-alpha) 2022-02-08

### Added
* Examples dropdown menu for loading example workspaces
* Examples model and api endpoint at /examples/id

### Removed
* Existing example workspaces

### Changed
* Workspaces can all now be updated and deleted by anyone.

## [v1.0.4-alpha](https://github.com/Lexpedite/blawx/releases/tag/v1.0.4-alpha) 2022-02-07

### Added
* Documentation for all v1 blocks, available in context menu and help (resolve [#135](https://github.com/Lexpedite/blawx/issues/135))

## [v1.0.3-alpha](https://github.com/Lexpedite/blawx/releases/tag/v1.0.3-alpha) 2022-02-03

### Added
* Blawx reports compiler errors (resolving [#61](https://github.com/Lexpedite/blawx/issues/61))
* Basic CodeQL Scanning Workflow

### Removed
* Admin interface for documentation

## [v1.0.2-alpha](https://github.com/Lexpedite/blawx/releases/tag/v1.0.2-alpha) 2022-02-03

### Changed
* Documentation and default workspaces have been deleted from the database, and are now loaded from
  YAML fixtures in the installation process.

## [v1.0.1-alpha](https://github.com/Lexpedite/blawx/releases/tag/v1.0.1-alpha) 2022-02-03

### Added
* Category Display Block
* `update.sh` Script to stop, rebuild, and run local docker container

### Changed
* Dockerfile loads blawx files from local
* Explanations use language from category display block
* Object declaration blocks use language from category display block
* Dockerfile reorganized to rebuild faster


## [v1.0.0-alpha](https://github.com/Lexpedite/blawx/releases/tag/v1.0.0-alpha) 2022-02-01
v1.0.0-alpha is nearly a complete rewrite of the code, to facilitate two major changes:
* New reasoning engine (from Flora-2 to s(CASP))
* Server-side workspace management

### **Major Version Change**

The move from v0 to v1 indicates there is no compatibility between Blawx code written for v1, and for previous versions.

### Added
* Natural language explanations
* Multiple model responses to queries
* Numerical constraints
* Logical constraints
* Compiler warnings
* Live code generation
* Server side management of workspaces
* User Authentication
* Example workspaces (not modifiable by anonymous users)
* Assumptions, hypothetical reasoning

### Changed
* Code generation has been moved to the client side
* The entire block language has been updated
* The web API uses code stored on the server
* JSON input data schema has changed

### Removed
* Silent variables
* Several Logical statements
* Dates, Times, Durations, and Strings
* Includes
* Data blocks

## [v0.2.4-alpha RC1](https://github.com/Blawx/blawx/releases/tag/v0.2.4-alphaRC1) 2021-01-22
### Added
* Date, Time, Datetime, and Duration Datatypes ([Issue #48](https://github.com/Blawx/blawx/issues/48))
* Date Math Functions
* String Functions
* New Attribute Declarations with Cardinality
* The docker container now includes a Jekyll set of documentation at /docs.
* Silent and unnamed variable blocks.
* Tooltips and help links to all blocks.
* Beginner's Guide in documentation
* Image type hints on method and type selectors
### Changed
* Toolbox reorganized
* Updated reasoner to Flora-2.1RC1 ([Issue #55](https://github.com/Blawx/blawx/issues/55))
* "String" renamed to "Text"
* "True/False" renamed to "Yes/No"
* New String Value Block
  
  **Breaking Change: Workspaces from previous versions using string values will not load.**

* Reimplemented Reasoner
  
  Reasoner responses for small queries will be significantly faster. Reasoner responses will also scale better with hardware. Workspaces or data that take more than 30 seconds of processor time will fail.

* New Object blocks are now created for each Category in the workspace. ([Issue #42](https://github.com/Blawx/blawx/issues/42))
### Fixed
* Allow Long Search Results ([Issue #1](https://github.com/Blawx/blawx/issues/1))
* Stop using sleep in Reasoner.php ([Issue #26](https://github.com/Blawx/blawx/issues/26))
* Queries don't work if they are not at the bottom ([Issue #24](https://github.com/Blawx/blawx/issues/24))

## [v0.2.3-alpha](https://github.com/Blawx/blawx/releases/tag/v0.2.3-alpha) 2020-06-29
### Added
* adding `?load=url` to address for interface will pre-load a .blawx file
  at that url.

## [v0.2.2-alpha](https://github.com/Blawx/blawx/releases/tag/v0.2.2-alpha) 2020-06-06
### Added
* Script for updating running container in development enviroments.
* Start of gh-pages based documentation
* Keyboard navigation.
### Changed
* Implemented custom true/false value block ([Issue #8](https://github.com/Blawx/blawx/issues/8))
  **Note that this may be a breaking change for people using the docassemble-blawx integration.**
* Changes to what counts as conflicting results for the purpose of override blocks, only applies
  to workspaces using the new true/false blocks.
### Fixed
* Docker install missing sudo.
* Docker install missing python3. ([Issue #38](https://github.com/Blawx/blawx/issues/38))
* Overridden answers still returned. ([Issue #2](https://github.com/Blawx/blawx/issues/2))
* Aggregate functions not working. ([Issue #19](https://github.com/Blawx/blawx/Issues/19))

## [v0.2.1-alpha](https://github.com/Blawx/blawx/releases/tag/v0.2.1-alpha) 2020-05-26
### Added
* Dockerized install process ([Issue #21](https://github.com/Blawx/blawx/issues/21))
* Calculation Block ([Issue #20](https://github.com/Blawx/blawx/issues/20))
* Changelog
### Changed
* Remove extra implication operators ([Issue #16](https://github.com/Blawx/blawx/issues/16))
* Math operators and aggregate functions now report "Number" as their output type.

## [v0.2-alpha](https://github.com/Blawx/blawx/releases/tag/v0.2-alpha) 2020-05-22
### Changed
* Installation process clarified, simplified. ([Issue #9](https://github.com/Blawx/blawx/issues/9))
### Fixed
* Reasoner was crashing on machines with slower processors. ([Issue #25](https://github.com/Blawx/blawx/issues/25))ff

