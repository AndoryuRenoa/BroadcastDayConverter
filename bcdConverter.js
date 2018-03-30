var rawData;
var sDate;
var oSMonth;
var sMonth;
var sDay;
var oSDay;
var sYear;
var oSYear;
var eDate;
var eDay;
var oEDay;
var eMonth;
var oEMonth;
var eYear;
var oEYear;
var sTime;
var eTime;
var cName;
var isci;
var length;
var rotation;
var tMethod;
var updatedRaw;
var findNext;
var findLast;
var sTimeHours;
var sTimeMinutes;
var sTimeMilitary;
var eTimeHours;
var eTimeMinutes;
var eTimeMilitary;
var PMtest;
var startIns1;
var startIns2;
var startIns3;

function runRawData(){
  //divide and place the corresponding raw data into the correct divided data below
  var rawData = document.getElementById("RawData").value; // make sure .value is correct for getting this string!
  //runDivData();
  var sDate = rawData.slice(0,8);
  document.getElementById("startDate").value=sDate;
  var eDate = rawData.slice(9,17);
  document.getElementById("endDate").value=eDate;
  //sTime is next, however it could be either XX:XX or X:XX so you have to take that into account!
  // I'm going to use spaces to cut apart the different parts moving forward, I'll need a new variable i.e. updatedRaw
  var updatedRaw = rawData.slice(18);
  var findNext = updatedRaw.search(/\s/);
  var sTime = updatedRaw.slice(0,findNext+3); // this still needs to be worked with
  sTime.trim(); // need to do sTime = sTime.trim(); for this to have effect
  document.getElementById("startTime").value=sTime;
  var updatedRaw = updatedRaw.slice(findNext+4); // same here
  var findNext = updatedRaw.search(" ");
  var eTime = updatedRaw.slice(0,findNext+3); // same here
  eTime.trim();
  document.getElementById("endTime").value=eTime;
  var updatedRaw = updatedRaw.slice(findNext);
  var findLast = updatedRaw.lastIndexOf(" ");
  var tMethod = updatedRaw.slice(findLast, updatedRaw.length);
  tMethod=tMethod.trim();
  document.getElementById("transferMethod").value=tMethod;
  var updatedRaw = updatedRaw.slice(0, findLast);
  var findLast = updatedRaw.lastIndexOf(" ");
  var rotation = updatedRaw.slice(findLast, updatedRaw.length);
  rotation = rotation.trim();
  document.getElementById("rotation").value=rotation;
  var updatedRaw = updatedRaw.slice(0, findLast);
  var findLast = updatedRaw.lastIndexOf(" ");
  var length = updatedRaw.slice(findLast, updatedRaw.length);
  length = length.trim();
  document.getElementById("length").value=length;
  var updatedRaw = updatedRaw.slice(0, findLast);
  var findLast = updatedRaw.lastIndexOf(" ");
  var isci = updatedRaw.slice(findLast, updatedRaw.length);
  isci = isci.trim(); // should have if statement here to test if there is a space before the H
  document.getElementById("isci").value=isci;
  var cName = updatedRaw.slice(3, findLast); // didn't measure this slice
  document.getElementById("creative").value = cName;
 
  runDivData();
}


function runDivData(){
	// converts start time to military time (unfinished)
	var startTime= document.getElementById("startTime").value;
	var findNext = startTime.search(":");
	var sTimeHours = startTime.slice(0,findNext);
	var sTimeMinutes = startTime.slice(findNext+1, findNext+3);
	var PMtest = startTime.endsWith("PM");
	if (PMtest == true){
		sTimeHours = parseInt(sTimeHours)+12;
			if (sTimeHours == 24) {
				sTimeHours = 12 ;
			}
	}
	if (PMtest == false){
		if (sTimeHours == 12){
			sTimeHours=0;
		}
	}
	
	// converts end time to military time (unfinished)
	var endTime= document.getElementById("endTime").value;
	var findNext = endTime.search(":");
	var eTimeHours = endTime.slice(0,findNext);
	var eTimeMinutes = endTime.slice(findNext+1, findNext+3);
	var PMtest = endTime.endsWith("PM");
	if (PMtest == true){
		eTimeHours = parseInt(eTimeHours)+12;
			if (eTimeHours == 24) {
				eTimeHours = 12 ;
			}
	}
	if (PMtest == false){
		if (eTimeHours == 12){
			eTimeHours=0;
		}
	}

	
	//breaks apart start date
	var sDate = document.getElementById("startDate").value;
	var sMonth = parseInt(sDate.slice(0,2));
	var sDay = parseInt(sDate.slice(3,5));
	var sYear = parseInt(sDate.slice(6));
	
	//breaks apart end date
	var eDate = document.getElementById("endDate").value;
	var eMonth = parseInt(eDate.slice(0,2));
	var eDay = parseInt(eDate.slice(3,5));
	var eYear = parseInt(eDate.slice(6));
	
	//sets isci
	var isci = document.getElementById("isci").value;
	
	//test broadcast day for instruction start 
	if (sTimeHours < 6){
		oSDay = sDay;
		oSMonth = sMonth;
		sDay = sDay - 1;
		if (sDay == 0){
			sMonth = sMonth - 1;
			// should give options for every month of the year below for new sDay
			sDay = 31;
			alert("check days assuming a 31 day month!");
		}
		// need boolean check for contining to next day
		if(sDate == eDate){
			if (eTimeHours >= 6){
				var startIns1 = sMonth+"/"+sDay+ " " +sMonth+"/"+sDay+" "+sTimeHours+":"+sTimeMinutes+" "+ "05:59:59 " +isci;
				var startIns2 = oSMonth+"/"+oSDay+ " " +oSMonth+"/"+oSDay+" 06:00:00 "+eTimeHours+":"+eTimeMinutes+isci;
				document.getElementById("output").innerHTML=startIns1+"<br>"+startIns2;
		  }
		  if (eTimeHours < 6){
			  var startIns1 = sMonth+"/"+sDay+ " " +sMonth+"/"+sDay+" "+sTimeHours+":"+sTimeMinutes+" "+ "05:59:59 " +isci;
			  var startIns2 = sMonth+"/"+sDay+ " " +sMonth+"/"+sDay+" 06:00:00 "+eTimeHours+":"+eTimeMinutes+isci;
			  document.getElementById("output").innerHTML=startIns1+"<br>"+startIns2;
		  
			}
		}
		else{
			if(eTimeHours >=6){
				var startIns1 = sMonth+"/"+sDay+ " " +sMonth+"/"+sDay+" "+sTimeHours+":"+sTimeMinutes+" "+ "05:59:59 " +isci;
				var startIns2 = oSMonth+"/"+oSDay+ " " +eMonth+"/"+eDay+" 06:00:00 "+"5:59:59" +isci;
				var startIns3 = eMonth+"/"+eDay+" "+eMonth+"/"+eDay+" 06:00:00 "+eTimeHours+":"+eTimeMinutes+" "+isci;
				document.getElementById("output").innerHTML=startIns1+"<br>"+startIns2+"<br>"+startIns3;
			} if (eTimeHours< 6){
				oEDay = eDay -2; 
				oEMonth = eMonth;
				eDay = eDay - 1;
				if (eDay ==0){
					var eMonth = eMonth -1;
					var eDay = 31;
					alert("check days! anything labeled 30th should be 1 day from end of month");
					// again not accounting for the different values of months (would be best to write a function for this):
				}	
				if (oEDay ==0){ // this does not seem to work.
					var oEDay = 31;
					var oEMonth = oEMonth-1;
					alert("check days! anything labeled 30th should be 1 day from end of month");
					// again not accounting for the different values of months (would be best to write a function for this):
				}
				if (oEDay ==-1){
					var oEDay = 30;
					var oEMonth = oEMonth-1;
					alert("check days! anything labeled 30th should be 1 day from end of month");					
					// again not accounting for the different values of months (would be best to write a function for this):
				} if (eDay == oSDay && eMonth == oSMonth){ // this seems to work 
					var startIns1 = sMonth+"/"+sDay+ " " +sMonth+"/"+sDay+" "+sTimeHours+":"+sTimeMinutes+" "+ "05:59:59 " +isci;
					var startIns2 = eMonth+"/"+eDay+" "+eMonth+"/"+eDay+" 06:00:00 "+eTimeHours+":"+eTimeMinutes+" "+isci;
					document.getElementById("output").innerHTML=startIns1+"<br>"+startIns2;					
				}
				else{
					var startIns1 = sMonth+"/"+sDay+ " " +sMonth+"/"+sDay+" "+sTimeHours+":"+sTimeMinutes+" "+ "05:59:59 " +isci;
					var startIns2 = oSMonth+"/"+oSDay+ " " +oEMonth+"/"+oEDay+" 06:00:00 "+"5:59:59" +isci;
					var startIns3 = eMonth+"/"+eDay+" "+eMonth+"/"+eDay+" 06:00:00 "+eTimeHours+":"+eTimeMinutes+" "+isci;
					document.getElementById("output").innerHTML=startIns1+"<br>"+startIns2+"<br>"+startIns3;
				}
			}
		}
	}
	else{
		if(sDate == eDate){
			if (eTimeHours >= 6){
				alert ("end date/time cannot be before start time");
		  }
		  if (eTimeHours < 6){

			  var startIns2 = sMonth+"/"+sDay+ " " +sMonth+"/"+sDay+" 06:00:00 "+eTimeHours+":"+eTimeMinutes+isci;
			  document.getElementById("output").innerHTML=startIns1+"<br>"+startIns2;
		  
			}
		}
		else{
			if(eTimeHours >=6){
			  var startIns1 = sMonth+"/"+sDay+ " " +eMonth+"/"+eDay+" "+sTimeHours+":"+sTimeMinutes+" "+ "05:59:59 " +isci;
			  var startIns2 = eMonth+"/"+eDay+" "+eMonth+"/"+eDay+" 06:00:00 "+eTimeHours+":"+eTimeMinutes+" "+isci;
				document.getElementById("output").innerHTML=startIns1+"<br>"+startIns2;
			} if (eTimeHours< 6){
				oEDay = eDay -2; 
				oEMonth = eMonth;
				eDay = eDay - 1;
				if (eDay ==0){
					var eMonth = eMonth -1;
					var eDay = 31;
					alert("check days! anything labeled 30th should be 1 day from end of month");
					// again not accounting for the different values of months (would be best to write a function for this):
				}	
				if (oEDay ==0){ // this does not seem to work.
					var oEDay = 31;
					var oEMonth = oEMonth-1;
					alert("check days! anything labeled 30th should be 1 day from end of month");
					// again not accounting for the different values of months (would be best to write a function for this):
				}
				if (oEDay ==-1){
					var oEDay = 30;
					var oEMonth = oEMonth-1;
					alert("check days! anything labeled 30th should be 2 days from end of month");
					// again not accounting for the different values of months (would be best to write a function for this):
				} if (eDay == oSDay && eMonth == oSMonth){ // this seems to work 
					var startIns1 = sMonth+"/"+sDay+ " " +sMonth+"/"+sDay+" "+sTimeHours+":"+sTimeMinutes+" "+ "05:59:59 " +isci;
					var startIns2 = eMonth+"/"+eDay+" "+eMonth+"/"+eDay+" 06:00:00 "+eTimeHours+":"+eTimeMinutes+" "+isci;
					document.getElementById("output").innerHTML=startIns1+"<br>"+startIns2;					
				}
				else{
					var startIns1 = sMonth+"/"+sDay+ " " +oEMonth+"/"+oEDay+" "+sTimeHours+":"+sTimeMinutes+" "+ "05:59:59 " +isci;
					var startIns2 = eMonth+"/"+eDay+" "+eMonth+"/"+eDay+" 06:00:00 "+eTimeHours+":"+eTimeMinutes+" "+isci;
					document.getElementById("output").innerHTML=startIns1+"<br>"+startIns2;
				}
			}
		}
	}
}

// the only thing missing from this calculator should be what happens when the instructions start inside a broadcast day
// 04/01/18 04/01/18 12:00 AM 11:59 PM DOWN MON 10/9C ABC25883SH :30 50% ER
