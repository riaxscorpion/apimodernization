const path = require('path');
var fs=require('fs');
const file = path.resolve(__dirname, "./jenkins.properties");
var PropertiesReader = require('properties-reader');
var prop = PropertiesReader(file);

module.exports = {
    gateway_url: prop.get("apigateway_url"),
    portal_url: prop.get("apiportal_url"),
    username: prop.get("username"),
    password: prop.get("password"),

    runtimeData: function(){
        var apikeyDetails = [];
        var data=fs.readFileSync('./features/properties/runtimeData.json', 'utf8');
        var words=JSON.parse(data);
        apikeyDetails[0] = words.keys;
        apikeyDetails[1] = words.values;
        return apikeyDetails;
    }
}