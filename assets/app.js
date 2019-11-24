$(document).ready(function () {
    // Your web app's Firebase configuration
    var firebaseConfig = {
        apiKey: "AIzaSyCvlJz5NIeJ_LxnCxZRE-wmJbEaiMcbtpY",
        authDomain: "train-schedule-bbef2.firebaseapp.com",
        databaseURL: "https://train-schedule-bbef2.firebaseio.com",
        projectId: "train-schedule-bbef2",
        storageBucket: "train-schedule-bbef2.appspot.com",

    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    var database = firebase.database();

    $("#submitButton").on("click", function (event) {

        event.preventDefault();

        //  Grab Input values IF the conditon above is true
        var name = $("#trainNameInput").val().trim();
        var destination = $("#destinationInput").val().trim();
        var firstArrival = $("#firstTrainTimeInput").val().trim();
        
        var frequency = $("#frequencyInput").val().trim();

        var trainFirebaseData = {
            DatatrainName: name,
            DataDest: destination,
            DatafirstArrival: firstArrival,
            Datafrequency: frequency,
            TimeStamp: firebase.database.ServerValue.TIMESTAMP
        };

        database.ref().push(trainFirebaseData);

        $("#trainNameInput").val("");
        $("#destinationInput").val("");
        $("#firstTrainTimeInput").val("");
        $("#frequencyInput").val("");


    });

    database.ref().on("child_added", function (childSnapshot) {
        //  make variable to ease reference
        var snapName = childSnapshot.val().DatatrainName;
        var snapDest = childSnapshot.val().DataDest;
        var snapFreq = childSnapshot.val().Datafrequency;
        var snapArrival = childSnapshot.val().DatafirstArrival;
        
        console.log(snapArrival);
        
        
        
        
        
        var currentTime = moment();
        console.log("Current Time: " + moment(currentTime).format("hh:mm"));
        var firstArrivalConverted = moment(snapArrival, "HH:mm");
        console.log(firstArrivalConverted);
        
        var diffTime = moment().diff(moment(firstArrivalConverted), "minutes");
        console.log(diffTime);
        
    
        
        // Time Remain
        var tRemainder = diffTime % snapFreq;
        console.log(tRemainder);
        
        // Minute Until Train
        var minutesAway = snapFreq - tRemainder;
        console.log("minutes until: " + minutesAway);
        
        // Next Train
        var nextTrain = moment().add(minutesAway, "minutes");
        console.log("arrival time: " + moment(nextTrain).format("hh:mm"))
        
        var newRow = $("<tr>").append(
            $("<td>").text(snapName),
            $("<td>").text(snapDest),
            $("<td>").text(snapFreq),
            $("<td>").text(moment(nextTrain).format("hh:mm")),
            $("<td>").text(minutesAway),

        );

        $("#table-info").append(newRow);    
        
        
    });
});