$(document).ready(function(){

var dataRef = new Firebase("https://flickering-heat-9801.firebaseio.com/");


$('#addTrainButton').on('click', function(){

	//grabbing values from input boxes
	var trainName = $('#trainNameInput').val().trim();
	var destination = $('#destinationInput').val().trim();
	var frequency = $('#frequencyInput').val().trim();
	var firstTime = $("#firstTrainInput").val().trim();
	
	/*nextArrival = $('#nextArrivalInput').val().trim();
	minutesAway = $('#minutesAwayInput').val().trim(); */
	//'hh:mm' ex 01:04
	if(moment(firstTime, ["hh:mm"], true).isValid() && trainName && destination){

		//FIREBASE STUFF
		dataRef.push({
			trainName: trainName, 
			destination: destination, 
			frequency: frequency,
			firstTime: firstTime
		});
	} else {
		$("#error").html("You need fill all the fields!");
		$("#error").addClass("error");
	}
	

	return false;
});

dataRef.on("child_added", function(childSnapshot, prevChildKey){
	
	var trainName = childSnapshot.val().trainName;
	var frequency = childSnapshot.val().frequency;
	var destination = childSnapshot.val().destination;
	var firstTime = childSnapshot.val().firstTime;

	var diffTime = moment().diff(moment(firstTime, "hh:mm"), "minutes");
	console.log("DIFFERENCE IN TIME: " + diffTime);
	// Time apart (remainder)
	var tRemainder = diffTime % frequency;
	console.log(tRemainder);
	// // Minute Until Train
	var tMinutesTillTrain = frequency - tRemainder;
	// console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
	// // Next Train
	var nextTrain = moment().add(tMinutesTillTrain, "minutes")
	// console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"))

	//HTML HERE
	$("#trainNameBox").append("<tr class='well'>" + "<td id='trainName'>" + trainName + "</td>" + "<td id='destination'>" + destination+ "</td>" + "<td id='frequency'>" + 
		frequency+ "</td>" + "<td id='minutesAway'>" + moment(nextTrain).format("hh:mm") + "</td>" + "<td id='nextArrival'>" + tMinutesTillTrain + "</td>")
2
	}, function(errorObject){

}); 

});

