const fs = require("fs");
var someObject = require("./.tmp/report/merged-output.json");
var outputpath = "./.tmp/report/results.html";

function msToTime(duration) {
  var milliseconds = parseInt(duration % 1000);
  var seconds = parseInt(duration / 1000);
  minutes = parseInt(seconds / 60);
  seconds = seconds % 60;
  hours = parseInt(minutes / 60);
  minutes = minutes % 60;

  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;
  if (milliseconds < 10) {
    milliseconds = milliseconds < 100 ? "00" + milliseconds : milliseconds;
  } else if (milliseconds < 100) {
    milliseconds = milliseconds < 100 ? "0" + milliseconds : milliseconds;
  }

  return hours + ":" + minutes + ":" + seconds + "." + milliseconds;
}

function getHtmlReport(obj) {
  var totalSuccessCount = 0;
  var totalFailedCount = 0;
  var totalDuration = 0;
  var htmlContent =
    "<html><head></head><body><table style='border-collapse: collapse; width: 90%;'><th style='width:20%; border:solid 2px black; text-align: center; height: 36px; background-color: #f2f2f2; font-size: 20px;'>Scenarios</th><th style='width:10%; border:solid 2px black; text-align: center; height: 36px; background-color: #f2f2f2; font-size: 20px;'>Status</th><th style='width:10%; border:solid 2px black; text-align: center; height: 36px; background-color: #f2f2f2; font-size: 20px;'>Duration</th><th style='width:10%; border:solid 2px black; text-align: center; background-color: #f2f2f2; font-size: 20px;'>Total</th><th style='width:10%; border:solid 2px black; text-align: center; background-color: #f2f2f2; font-size: 20px;'>Success</th><th style='width:10%; border:solid 2px black; text-align: center; background-color: #f2f2f2; font-size: 20px;'>Failed</th>";

  for (let i = 0; i < obj.length; i++) {
    htmlContent =
      htmlContent +
      "<tr><td style='text-align: center; border:solid 1px black; height: 28px; font-size: 18px;'>";
    htmlContent = htmlContent + obj[i].name;
    let successCount = 0;
    let failedCount = 0;
    let duration = 0;

    for (let k = 0; k < obj[i].elements.length; k++) {
      for (let j = 0; j < obj[i].elements[k].steps.length; j++) {
        if (
          obj[i].elements[k].steps[j].keyword !== "After" &&
          obj[i].elements[k].steps[j].keyword !== "Before"
        ) {
          if (
            obj[i].elements[k].steps[j] &&
            obj[i].elements[k].steps[j].result &&
            obj[i].elements[k].steps[j].result.status &&
            obj[i].elements[k].steps[j].result.status == "passed"
          ) {
            successCount++;
          } else {
            failedCount++;
          }
        }

        if (
          obj[i].elements[k].steps[j] &&
          obj[i].elements[k].steps[j].result &&
          obj[i].elements[k].steps[j].result.duration &&
          typeof obj[i].elements[k].steps[j].result.duration == "number"
        ) {
          duration = duration + obj[i].elements[k].steps[j].result.duration;
        }
      }
    }

    let totalCount = successCount + failedCount;
    totalSuccessCount = totalSuccessCount + successCount;
    totalFailedCount = totalFailedCount + failedCount;
    totalDuration = totalDuration + duration;

    let status = "";
    let htmlContentForStatus = "";
    if (failedCount > 0) {
      status = "Failed";
      color = "red";
      htmlContentForStatus =
        "<td style='text-align: center; border:solid 1px black; text-transform:uppercase; color: red;'><span style='background-color: lightpink; padding:3px; font-weight:900; font-size: 18px;'>";
    } else {
      status = "Passed";
      color = "green";
      htmlContentForStatus =
        "<td style='text-align: center; border:solid 1px black; text-transform:uppercase; color: green;'><span style='background-color: #98FB98; padding:3px; font-weight:900; font-size: 18px;'>";
    }

    htmlContent =
      htmlContent +
      htmlContentForStatus +
      status +
      "</span></td>" +
      "<td style='text-align: center; border:solid 1px black; font-size: 18px;'>" +
      msToTime(duration / 1000000) +
      "</td>" +
      "<td style='text-align: center; border:solid 1px black; font-size: 18px;'>" +
      totalCount +
      "</td>" +
      "<td style='text-align: center; border:solid 1px black; font-size: 18px;'>" +
      successCount +
      "</td>" +
      "<td style='text-align: center; border:solid 1px black; font-size: 18px;'>" +
      failedCount +
      "</td></tr>";
    // htmlContent = htmlContent + "<td style='text-align: center; border:solid 1px black;'>" + successCount + "</td></tr>";
    htmlContent = htmlContent + "</td></tr>";
  }

  let totalTestCount = totalSuccessCount + totalFailedCount;

  htmlContent =
    htmlContent +
    "<tr style='height:36px; font-weight:bold'><td style='text-align: center; height:36px;'></td><td style='text-align: center;'></td><td style='text-align: center; border:solid 1px black; font-size: 18px;'>" +
    msToTime(totalDuration / 1000000) +
    "</td><td style='text-align: center; border:solid 1px black; font-size: 18px;'>" +
    totalTestCount +
    "</td><td style='text-align: center; border:solid 1px black; font-size: 18px;'>" +
    totalSuccessCount +
    " </td><td style='text-align: center; border:solid 1px black; font-size: 18px;'>" +
    totalFailedCount +
    "</td></tr>";

  htmlContent = htmlContent + "</table></body></html>";

  let setBool = true;

  fs.writeFile(
    outputpath,
    htmlContent,
    (err) => {
      setBool = false;
      if (err) throw err;
    }
  );

  if (setBool) {
    return "HTML Report generated Successfully";
  } else {
    return "Some issues while generating the HTML Report";
  }
}

if (someObject) {
  console.log(getHtmlReport(someObject));
} else {
  console.log(
    "No HTML Report generated. Please check merged json(should not be empty and should be in correct format)"
  );
}