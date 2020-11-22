var fs = require('fs');
var path = require('path');

exports.config= {

    directConnect: true,
    specs: ['features/testSuites/basicSanity/01_restServicesFromJSON.feature'],
    framework: 'custom',
    frameworkPath: require.resolve('protractor-cucumber-framework'),
    getPageTimeout: 600000,
    allScriptsTimeout: 500000,

    capabilities: {
        'browserName': 'chrome'
    },
    
    onPrepare: function() {
        const directory = "./.tmp/json-output-folder";
        const mergedoutput = "./.tmp/report";

        fs.readdir(directory, (err, files) => {
            if (err) throw err;
          
            for (const file of files) {
              fs.unlink(path.join(directory, file), err => {
                if (err) throw err;
              });
            }
        });

        fs.unlink(path.join(mergedoutput, "results.html"), err => {
            // if (err) throw err;
        });

        
        fs.unlink(path.join(mergedoutput, "merged-output.json"), err => {
            // if (err) throw err;
        });
    },

    cucumberOpts: {
        format: 'json:.tmp/results.json',
        require: ['features/stepDefinitions/*.stepDefinitions.js']
    },

    plugins: [{
        package: require.resolve('protractor-multiple-cucumber-html-reporter-plugin'),
        options:{
            automaticallyGenerateReport: true,
            saveCollectedJSON: true,
            removeExistingJsonReportFile: true,
            reportName: "API Cloud - Automation Report",
            pageFooter: "<div><p>SoftwareAG custom report</p></div>",
            displayDuration: true,
            displayTags: false,
            displayDevice: false,
            customMetadata: true
        }
    }]
};