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
let sendAgainBtn;
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

  sendAgainBtn = document.querySelector("#sendAgainBtn")

  receiveDiv = document.querySelector("#receiveDiv");
  sendDiv = document.querySelector("#sendDiv");

  sendMessageBtn.addEventListener('click', sendMessage);
  receiveMessageBtn.addEventListener('click', receiveMessage);
  sendAgainBtn.addEventListener('click', sendAgain);


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

    //confirmation p
    // createP(`sent message: + ${nodeData.messageText}`);

    //zero out the text area
    messageInput.value = ''

    // sendDiv.style.display='none';
    // receiveDiv.style.display='block';



  } else {
    //if they didnt type anything
    alert("uh oh. type message first!")

  }
}

function receiveMessage() {

  // shuffle array first
  shuffleArray(fbDataArray);

  for (let i = 0; i < fbDataArray.length; i++) {

    if (fbDataArray[i].received === false) {
      // console.log("received message");
      // console.log(fbDataArray[i].messageText);

      receivedMessage.innerHTML = fbDataArray[i].messageText;

      updateNode(folderName, fbDataArray[i].timestamp, {
        recevied: true
      });

      receiveMessageBtn.style.display = 'none';
      sendAgainBtn.style.display = 'block';


      break;


    } else {
      receivedMessage.innerHTML = "no more messages:(";
      // console.log(" no more messages:( )");

    }

  }

}

function sendAgain() {

  // reset receive div
  receivedMessage.innerHTML = "";
  receiveMessageBtn.style.display = 'block';
  sendAgainBtn.style.display = 'none';

  // return to begining
  sendDiv.style.display = 'none';
  receiveDiv.style.display = 'block';

}

function shuffleArray(_array) {
  // iterate backwards through an array
  for (let i = _array.length - 1; i > 0; i--) {

    // grab random index from 0 to i
    let randomIndex = Math.floor(Math.random() * (i + 1));

    // swap elements _array[i] and _array[j]
    [_array[i], _array[randomIndex]] = [_array[randomIndex], _array[i]]; // using "destructuring assignment" syntax

    // same can be written as:
    // let arrayItem = _array[i]; // _array item in original position _array[i]
    // _array[i] = _array[randomIndex]; // overwrite _array[i] with new item at random index
    // _array[randomIndex] = _arrayItem; // now move _array item from original position into random position

  }
}
