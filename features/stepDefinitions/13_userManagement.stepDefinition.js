var { Before, After, Given, Then, setDefaultTimeout} = require('cucumber');

var common = require("../modules/baseModule/common");
var data = require("../properties/data.json");

var um = require("../modules/MenuOptions/userManagement");
const userManagement = require('../modules/MenuOptions/userManagement');

var userMgmt = data.userManagement;

var groups = userMgmt.groups;
var teams = userMgmt.teams;

setDefaultTimeout(60 * 10000);
browser.ignoreSynchronization = true;



Then("Click on Menu Links", async function(){
    await um.clickMenuOptions();
});

Then("Navigate to User management", async function(){
    await um.clickUserManagementLink();
});

Then("Click group link", async function(){
    await um.clickGroupsLink();
});

Then("Click team link", async function(){
    await um.clickTeamsLink();
});

Then("Create Groups", async function(){
    await um.addGroup(groups);
});

Then("Create Teams", async function(){
    await um.addTeam(teams);
});

Then("Add Users", async function(){
    await um.addGroupUsers(groups);
});

Then("Add Functional privileges", async function(){
    await um.addFunctionalPrivileges(teams);
});

Then("Assign Groups", async function(){
    await um.assignTeamsGroup(teams);
});

Then("Delete Teams", async function(){
    await um.deleteTeam(teams);
});

Then("Delete Groups", async function(){
    await um.deleteGroup(groups);
});