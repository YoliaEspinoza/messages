// https://console.firebase.google.com/u/0/project/messages-301de/database/messages-301de/data
'use strict';

let nodeData; // object we will push to firebase
let fbData; // data we pull from firebase
let fbDataArray; // firebase data values converted to an array
let database; // reference to our firebase database
let folderName = "message"; // name of folder you create in db
let messageInput;
let sendMessageBtn;
let receiveMessageBtn;
let receivedMessage;
let receiveDiv, sendDiv;

function setup() {

  noCanvas();
  //access dom elements
  // messageInput = select("#messageInput");
  messageInput = document.querySelector("#messageInput");
  sendMessageBtn = document.querySelector("#sendMessageBtn");

  receiveMessageBtn = document.querySelector("#receiveMessageBtn");
  receiveMessage = document.querySelector("#receiveMessage");

  receiveDiv = document.querySelector("#receiveDiv");
  sendDiv = document.querySelector("#sendDiv");

  sendMessageBtn.addEventListener('click', sendMessage);
  receiveMessageBtn.addEventListener('click', receiveMessage);


  let config = {
    apiKey: "AIzaSyBeR5kS3tgOuJ9BsSlcY7KV5CbWRra87lI",
    authDomain: "messages-301de.firebaseapp.com",
    databaseURL: "https://messages-301de.firebaseio.com",
    projectId: "messages-301de",
    storageBucket: "messages-301de.appspot.com",
    messagingSenderId: "505982968939",
    appId: "1:505982968939:web:ed15f8af66236c2b58bd2e",
  };

  firebase.initializeApp(config);

  database = firebase.database();

  // this points to the folder you want your data to appear in
  let ref = database.ref(message);

  // initialize Firebase connection
  // callback functions are gotData() and errData()
  ref.on('value', gotData, errData);
}




function draw() {

}

function sendMessage() {
  if (messageInput.value) {

    let timestamp = Date.now();

    nodeData = {
      messageText: messageInput.value,
      timestamp: timestamp,
      received: false,
    }
    createNode(folderName, timestamp, nodeData);

    console.log("sent message:");
    console.log(nodeData);

    createP(`sent message: + ${nodeData.messageText}`);

    //zero out the text area
    messageInput.value = ''

  } else {
    //if they didnt type anything
    alert("uh oh. type message first")

  }
}

function receiveMessage() {

  for (let i = 0; i, fbDataArray.length; i++) {
    if (fbDataArray[i].received == false) {
      console.log("received message");
      console.log(fbDataArray[0].messageText);

    }else{
      console.log(" no more messages:( )");
      

    }

  }

}
