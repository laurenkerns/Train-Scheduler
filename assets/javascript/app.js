//FireBase Configuration//


//Initalize FireBase
var config = {
    apiKey: "AIzaSyCuSG29Nl8sGq9K6Fvo9CimHLYSuRVf2GU",
    authDomain: "train-scheduler-97b62.firebaseapp.com",
    databaseURL: "https://train-scheduler-97b62.firebaseio.com",
    projectId: "train-scheduler-97b62",
    storageBucket: "train-scheduler-97b62.appspot.com",
    messagingSenderId: "247571573678"
  };
  
  firebase.initializeApp(config);
  
  //define database
  var database = firebase.database();

  //Ian my Tutor helped me with this line of code: when trying to submit my info my prevent default wasn't letting me submit: he gave me this soluciton:
  $('form').on('submit', (event) => {
      event.preventDefault()
  });

  //add trains
  $("#add-train-btn").on("click", function(event) {
    event.preventDefault();

    //take the user input justing jQuery selectors
    var trainName = $("#Train-name-input").val().trim();
    var trainDestination = $("#Destination-input").val().trim();
    var trainTime = $("#Time-input").val().trim();
    var trainFrequency = $("#Frequency-input").val().trim()

    //local temp object to hold the emplyee data
    var newTrain = {
        name: trainName,
        destination: trainDestination,
        time: trainTime,
        frequency: trainFrequency,

    };

    //send the train input information to the firebase database
    database.ref().push(newTrain);

    //show what has been sent to the database in the console.log
    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.time);
    console.log(newTrain.frequency);

    //when information has been inputted send alert to user
    alert("Train information has been submitted!");

    //when user submits the train information, clear all fields to prepare for another emtry
    $("#Train-name-input").val("");
    $("#Destination-input").val("");
    $("#Time-input").val("");
    $("#Frequency-input").val("");
  });
  
  //firebase event when a new train is added to the database and create a new row on the fly within the HTML
  database.ref().on("child_added", function(childSnapshot){
    console.log(childSnapshot.val());

    var trainName = childSnapshot.val().name;
    var trainDestination = childSnapshot.val().destination;
    var trainTime = childSnapshot.val().time;
    var trainFrequency = childSnapshot.val().frequency;

    //console.log the train information
    console.log(trainName);
    console.log(trainDestination);
    console.log(trainTime);
    console.log(trainFrequency);

    /////Calculate the train times and declare/////

        //current time
        var currentTime = moment();

        //first train time converted
        var trainTimeConverted = moment(currentTime, "HH:MM");

        //difference between times
        var timeDifference = moment().diff(trainTimeConverted, "minutes");

        //time trains are apart--reminder (%: division remainder)
        var trainTimeReminder = timeDifference % trainFrequency;

        //minutes train is away
        var trainMinAway = trainFrequency - trainTimeReminder;

        //NEXT ARRIVAL
        var nextArrival = moment().add(trainMinAway, "minutes").format("HH:MM");


        //create the new row and add the train information to the new row using jQuery selectors
        var newRow = $("<tr>").append(
            $("<td>").text(trainName),
            $("<td>").text(trainDestination),
            $("<td>").text(trainTime),
            $("<td>").text(trainFrequency),
            $("<td>").text(nextArrival)
        );

        //append new row to the table
        $("#train-table > tbody").append(newRow);
  });




  





