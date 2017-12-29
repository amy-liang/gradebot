//////////////////////////////
//
//   Tabs Functionality
//
//////////////////////////////

var tabLinks;
var tabPanels;

// Set up
window.onload=function() {
    
    tabLinks = document.getElementById("tabs").getElementsByTagName("a"); // Grab <a> elements
	tabPanels = document.getElementById("container").getElementsByTagName("div"); // Grab container divs
    
    // Open window with first tab activated
    displayPanel(tabLinks[0]);

    // Attach event listener to links, fire the displayPanel function, return false to disable the link
    for (var i = 0; i < tabLinks.length; i++) {
        tabLinks[i].onclick = function() { 
			displayPanel(this); 
			return false;
		}
        
        tabLinks[i].onfocus = function() { 
			displayPanel(this); 
			return false;
		}
    }
}


function displayPanel(tabToActivate) {
    
    // Go through all the <a> elements
    for (var i = 0; i < tabLinks.length; i++) {
        
        if (tabLinks[i] == tabToActivate) { //add active class to change style, and display container
            tabLinks[i].classList.add("active");
			tabPanels[i].style.display = "block";
            
        } else { //remove active class, hide contianer
        	tabLinks[i].classList.remove("active");
			tabPanels[i].style.display = "none";
        }
	}
}


//////////////////////////////
//
//   Grade Calculations
//
//////////////////////////////

// Grab buttons
var submit1 = document.getElementById("submit1");
var submit2 = document.getElementById("submit2");
var submit3 = document.getElementById("submit3");
var submit4 = document.getElementById("submit4");

// Catches input errors
function catchError(userInput){
    return (isNaN(userInput) || userInput == "" || userInput > 100 || userInput < 0);
}

// Tab1 onClick
//////////////////////

submit1.addEventListener("click", function() { 
    
    var currGrade = document.getElementById("currentGrade1").value;
    var desiredGrade = document.getElementById("desiredGrade1").value;
    var percent = document.getElementById("percent1").value;
    var result = document.getElementById("result1");
    
    if (catchError(currGrade) || catchError(desiredGrade) || catchError(percent)) {
        result.textContent = "Error - inputs are between 0 and 100, numbers only!";
    } else {
        percent = percent * 0.01
        var newGrade = ( desiredGrade - ((1 - percent) * currGrade) ) / percent;
        newGrade = Number(Math.round(newGrade + 'e2') + 'e-2'); //round
        
        if ( newGrade > 100 ) {
            result.textContent = "Minimum Mark Needed: " + newGrade + "% :(";
        }
        else { 
            result.textContent = "Minimum Mark Needed: " + newGrade + "%";
        }
    }
    
  }, true);

// Tab2 onClick
//////////////////////

submit2.addEventListener("click", function() { 
    
    var currGrade = document.getElementById("currentGrade2").value;
    var predictedGrade = document.getElementById("predictedGrade2").value;
    var percent = document.getElementById("percent2").value;
    var result = document.getElementById("result2");
    
    if (catchError(currGrade) || catchError(predictedGrade) || catchError(percent)) {
        result.textContent = "Error - inputs are between 0 and 100, numbers only!";
    } else {
        percent = percent * 0.01
        var finalGrade = (1 - percent) *  currGrade + (percent * predictedGrade)
        finalGrade = Number(Math.round(finalGrade + 'e2') + 'e-2'); //round

        result.textContent = "Predicted Final Mark: " + finalGrade + "%";
    }
    
  }, true);

// Tab3 onClick
//////////////////////

submit3.addEventListener("click", function() {
    //Input from user (subject)
    var formerGrade = document.getElementById("formerGrade3").value;
    var finalGrade = document.getElementById("finalGrade3").value;
    var percent = document.getElementById("percent3").value;
    var result = document.getElementById("result3");
    
    if (catchError(formerGrade) || catchError(finalGrade) || catchError(percent)) {
        result.textContent = "Error - inputs are between 0 and 100, numbers only!";
    } else {
        percent = percent * 0.01
        var lowest = ( Math.round(finalGrade) - 0.4 - ((1 - percent)*formerGrade) ) / percent;
        var highest = ( Math.round(finalGrade) + 0.4 - ((1 - percent)*formerGrade) ) / percent;
        lowest = Number(Math.round(lowest + 'e2') + 'e-2'); //round
        highest = Number(Math.round(highest + 'e2') + 'e-2'); //round
        
        if (highest > 100){
            highest = 100;
        }
        
        if (lowest > 100) {
            result.textContent = "Something went wrong - your received grade wasn't achievable.";
        } else {
            result.textContent = "Possible Received Grade(s): " + lowest + "% - " + highest + "%";
        }
        
    }
    
  }, true);

// Tab4 onClick
//////////////////////

submit4.addEventListener("click", function() {
    //Input from user (subject)
    var percentGrade = document.getElementById("percentGrade4").value;
    var totalMarks = document.getElementById("totalMarks4").value;
    var result = document.getElementById("result4");
    
    if (catchError(percentGrade) || isNaN(totalMarks) || totalMarks == "" || totalMarks < 1) {
        result.textContent = "Error - 0 <= grade <= 100, 0 < totalMarks, numbers only!";
    } else {
        
        percentGrade =  Math.round(percentGrade);
        totalMarks = Math.round(totalMarks);
        var possible = "";

        for ( var i = 0; i < totalMarks + 1; i+= 0.5 ){ //check each possibility for match
            var possiblePercent = i / totalMarks;
            if (percentGrade == Math.round(possiblePercent * 100)) {
                possible = possible + i + "/" + totalMarks + ", "
            }
        }
        
        if (possible == "") {
            result.textContent = "Something went wrong - no results matched the percentage";
        } else {
            result.textContent = "Possible Mark(s) Received: " + possible.substring(0, possible.length - 2); //remove ", "
        }
    }
    
  }, true);


