var obj = require("../../properties/objects.json");
const { element, browser, ActionSequence } = require("protractor");
var chai = require('chai');
var chaiAsPromised = require("chai-as-promised");
const { enableHttpHttps } = require("../APILevelSpecifications/policies");
chai.use(chaiAsPromised);
var expect = chai.expect;

var EC = protractor.ExpectedConditions;


module.exports = {

    clickUserManagementLink: async function () {
        await element(by.linkText(obj.userManagement.teamAndGroup.userManagement)).click();
        await browser.wait(EC.visibilityOf(await element(by.id(obj.userManagement.teamAndGroup.users)), 180000, "**** NOT FOUND ****"));
        await browser.sleep(2000);
    },

    clickMenuOptions: async function(){
        await browser.wait(EC.visibilityOf(await element(by.xpath(obj.userManagement.teamAndGroup.menuOptions)), 180000, "**** NOT FOUND ****"));
        await browser.sleep(2000);
        await element(by.xpath(obj.userManagement.teamAndGroup.menuOptions)).click();
        await browser.sleep(3000);
    },

    clickGroupsLink: async function () {
        await element(by.id(obj.userManagement.group.groupsLink)).click();
        await browser.sleep(2000);
    },

    clickTeamsLink: async function () {
        await element(by.id(obj.userManagement.team.teamsLink)).click();
        await browser.sleep(2000);
    },

    deleteGroup: async function (groups) {

        for (i in groups) {
            await element(by.xpath(obj.userManagement.teamAndGroup.delete1 + groups[i].groupName + obj.userManagement.teamAndGroup.delete2 + groups[i].groupDesc + obj.userManagement.teamAndGroup.delete3 + obj.userManagement.teamAndGroup.deleteIcon)).click();
            await browser.sleep(2000);
            await element(by.xpath(obj.userManagement.teamAndGroup.deleteYesButton)).click();
            await browser.sleep(5000);
        }
    },
 
    deleteTeam: async function (teams) {
    
        for (i in teams) {
            await element(by.xpath(obj.userManagement.teamAndGroup.delete1 + teams[i].teamName + obj.userManagement.teamAndGroup.delete2 + teams[i].teamDesc + obj.userManagement.teamAndGroup.delete3 + obj.userManagement.teamAndGroup.deleteIcon)).click();
            await browser.sleep(2000);
            await element(by.xpath(obj.userManagement.teamAndGroup.deleteYesButton)).click();
            await browser.sleep(5000);
        }
    },
    
    addGroup: async function (groups) {
        
        for (i in groups) {
            await element(by.xpath(obj.userManagement.group.addGroupButton)).click();
            await element(by.xpath(obj.userManagement.group.name)).sendKeys(groups[i].groupName);
            await element(by.xpath(obj.userManagement.group.description)).sendKeys(groups[i].groupDesc);
            await element(by.xpath(obj.userManagement.teamAndGroup.saveButton)).click();
            await browser.sleep(2000);
            var status = await element(by.xpath(obj.userManagement.teamAndGroup.alertMessage)).getText();
            expect(status).to.contains("Group '"+groups[i].groupName+"' created successfully.");
            await browser.sleep(2000);
        }
    },

    addGroupUsers: async function (groups) {
        
        for (i in groups) {

            await element(by.xpath(obj.userManagement.teamAndGroup.selectGroup1 + groups[i].groupName + obj.userManagement.teamAndGroup.selectGroup2)).click();
            await browser.wait(EC.visibilityOf(await element(by.xpath(obj.baseModule.login.loadingImage)), 180000, "Login ID Not found"));
            await browser.sleep(6000);
            await element(by.xpath(obj.userManagement.teamAndGroup.editButton)).click();
            await element(by.xpath(obj.userManagement.group.addUsersButton)).click();

            for (j in groups[i].usersToBeAdded) {
                
                await element(by.xpath(obj.userManagement.group.inputUser)).sendKeys(groups[i].usersToBeAdded[j]);
                await browser.wait(EC.not(EC.visibilityOf(await element(by.xpath(obj.baseModule.login.loadingImage)), 180000, "Login ID Not found")));
                await browser.sleep(2000);
                await element(by.xpath(obj.userManagement.group.selectUser1 + groups[i].usersToBeAdded[j] + obj.userManagement.group.selectUser2)).click();
                await element(by.xpath(obj.userManagement.teamAndGroup.cleanInputField)).click();

            }
            
            await element(by.xpath(obj.userManagement.teamAndGroup.saveButton)).click();
            await browser.sleep(2000);
            var status = await element(by.xpath(obj.userManagement.teamAndGroup.alertMessage)).getText();
            expect(status).to.contains("Group '"+groups[i].groupName+"' updated successfully.");
            await browser.sleep(2000);
            await element(by.xpath(obj.userManagement.teamAndGroup.backToUserManagement)).click();
            await browser.sleep(4000);
        }
    },

    
    addTeam: async function (teams) {
        for (i in teams) {
            
            await element(by.xpath(obj.userManagement.team.addTeam)).click();
            await element(by.xpath(obj.userManagement.team.name)).sendKeys(teams[i].teamName);
            await element(by.xpath(obj.userManagement.team.description)).sendKeys(teams[i].teamDesc);
            await element(by.xpath(obj.userManagement.teamAndGroup.saveButton)).click();
            await browser.sleep(2000);
            var status = await element(by.xpath(obj.userManagement.teamAndGroup.alertMessage)).getText();
            expect(status).to.contains("Team '"+teams[i].teamName+"' created successfully.");
            await browser.sleep(2000);
        }
    },

   
    addFunctionalPrivileges: async function (teams) {

        for (i in teams) {
            
            await element(by.xpath(obj.userManagement.team.selectTeam1 + teams[i].teamName + obj.userManagement.team.selectTeam2)).click();
            await browser.wait(EC.visibilityOf(await element(by.xpath(obj.baseModule.login.loadingImage)), 180000, "Login ID Not found"));
            await browser.sleep(6000);
            await element(by.xpath(obj.userManagement.team.functionalPrivilege)).click();
            await browser.sleep(2000);
            await element(by.xpath(obj.userManagement.teamAndGroup.editButton)).click();
            await browser.sleep(2000);

            for (j in teams[i].functionalPrivileges) {
                await element(by.xpath(obj.userManagement.teamAndGroup.selectPrivilege1 + teams[i].functionalPrivileges[j] + obj.userManagement.teamAndGroup.selectPrivilege2)).click();
            }
            await browser.sleep(2000);
            await element(by.xpath(obj.userManagement.teamAndGroup.saveButton)).click();
            await browser.sleep(2000);
    
            var status = await element(by.xpath(obj.userManagement.teamAndGroup.alertMessage)).getText();
            expect(status).to.contains("Team '"+teams[i].teamName+"' updated successfully.");
            await browser.sleep(2000);
            await element(by.xpath(obj.userManagement.teamAndGroup.backToUserManagement)).click();
            await browser.sleep(4000);
        }
    },
    
    assignTeamsGroup: async function (teams) {

        for (i in teams) {
            await element(by.xpath(obj.userManagement.team.selectTeam1 + teams[i].teamName + obj.userManagement.team.selectTeam2)).click();
            await browser.wait(EC.visibilityOf(await element(by.xpath(obj.baseModule.login.loadingImage)), 180000, "Login ID Not found"));
            await browser.sleep(6000);
            await element(by.xpath(obj.userManagement.teamAndGroup.editButton)).click();
            await browser.sleep(2000);
            await element(by.xpath(obj.userManagement.team.groups)).click();
            await browser.sleep(2000);

            for (j in teams[i].groupsNameToBeAdded) {
                
                await element(by.xpath(obj.userManagement.team.inputGroup)).sendKeys(teams[i].groupsNameToBeAdded[j]);
                await browser.wait(EC.not(EC.visibilityOf(await element(by.xpath(obj.baseModule.login.loadingImage)), 180000, "Login ID Not found")));
                await browser.sleep(2000);
                await element(by.xpath(obj.userManagement.team.selectGroup1 + teams[i].groupsNameToBeAdded[j] + obj.userManagement.team.selectGroup2)).click();
                await element(by.xpath(obj.userManagement.teamAndGroup.cleanInputField)).click();
            }

            await element(by.xpath(obj.userManagement.teamAndGroup.saveButton)).click();
            await browser.sleep(2000);
            var status = await element(by.xpath(obj.userManagement.teamAndGroup.alertMessage)).getText();
            expect(status).to.contains("Team '"+teams[i].teamName+"' updated successfully.");
            await browser.sleep(2000);
            await element(by.xpath(obj.userManagement.teamAndGroup.backToUserManagement)).click();
            await browser.sleep(4000);
        }
    }
}