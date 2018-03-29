var rawData;
var sDate;
var eDate;
var sTime;
var eTime;
var cName;
var isci;
var isciLength;
var rotation;
var tMethod;
var updatedRaw;
var findNext;

function runRawData(){
  //divide and place the corresponding raw data into the correct divided data below
  var rawData = document.getElementById("RawData").value; // make sure .value is correct for getting this string!
  alert("Still a WIP")
  //runDivData();
  var sDate = rawData.slice(0,8);
  document.getElementById("startDate").value=sDate;
  var eDate = rawData.slice(9,17);
  document.getElementById("endDate").value=eDate;
  //sTime is next, however it could be either XX:XX or X:XX so you have to take that into account!
  // I'm going to use spaces to cut apart the different parts moving forward, I'll need a new variable i.e. updatedRaw
  var updatedRaw = rawData.slice(19);// which is it 18 or 19?
  var findNext = updatedRaw.search(/\s/);  // maybe an issue with updatedRaw.
  var sTime = updatedRaw.splice(0,findNext);
  document.getElementById("startTime").value=sTime;
}

function runDivData(){
  // this will house the logic for converting from regular day into broadcast day
  alert("Still a WIP")
  //output will go in elementById"output"
}
