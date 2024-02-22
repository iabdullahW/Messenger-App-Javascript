const firebaseConfig = {
    apiKey: "AIzaSyAwMQUlRQkrWgrJFVmV4FSvaHMCd3GOB5E",
       authDomain: "registration-form-235e6.firebaseapp.com",
       databaseURL: "https://registration-form-235e6-default-rtdb.firebaseio.com",
       projectId: "registration-form-235e6",
       storageBucket: "registration-form-235e6.appspot.com",
       messagingSenderId: "922036269534",
       appId: "1:922036269534:web:65bf601325b8736b18ad4f"
     
  };
  
  firebase.initializeApp(firebaseConfig);
  const db = firebase.database();
  
  let username = "Undefined"; // Default username
  
  document.getElementById("send-message").addEventListener("submit", postChat);
  document.getElementById("change-name-btn").addEventListener("click", openNameModal);
  document.getElementById("clear-chat-btn").addEventListener("click", clearChat);
  
  function postChat(e) {
   e.preventDefault();
   const timestamp = Date.now();
   const chatTxt = document.getElementById("chat-txt");
   const message = chatTxt.value;
  
   if (message.trim() !== "") {
     chatTxt.value = "";
  
     // Update the UI with the sent message
     displayMessage(username, message);
  
     // Save the message to Firebase
     db.ref("messages/" + timestamp).set({
       usr: username,
       msg: message,
       timestamp: timestamp
     });
   }
  }
  
  function openNameModal() {
   const newUsername = prompt("Enter your name:");
   if (newUsername.trim() !== "") {
     username = newUsername;
     document.getElementById("user-name").textContent = username;
   }
  }
  
  function clearChat() {
   const confirmation = confirm("Are you sure you want to clear the chat?");
   if (confirmation) {
     // Clear messages from the UI
     document.getElementById("messages").innerHTML = "";
  
     // Clear messages from Firebase
     db.ref("messages").remove();
   }
  }
  
  // Function to display a message in the chat window
  function displayMessage(sender, message) {
   const chatMessages = document.getElementById("messages");
  
   // Check if the message is not already in the chat window
   const existingMessages = chatMessages.querySelectorAll("li");
   const isDuplicate = Array.from(existingMessages).some(
     (existingMessage) =>
       existingMessage.textContent === `${sender}: ${message}`
   );
  
   if (!isDuplicate) {
     const messageElement = document.createElement("li");
     messageElement.innerHTML = `<span>${sender}: </span>${message}`;
     chatMessages.appendChild(messageElement);
     // Auto-scroll to the bottom of the chat window
     chatMessages.scrollTop = chatMessages.scrollHeight;
   }
  }
  
  // Fetch initial messages and listen for new messages
  const fetchChat = db.ref("messages/");
  let initialLoad = true;
  
  fetchChat.on("child_added", function (snapshot) {
   // Skip the initial load to avoid duplicates
   if (!initialLoad) {
     const messages = snapshot.val();
     // Display the received message in the chat window
     displayMessage(messages.usr, messages.msg);
   }
  });
  
  // Set initialLoad to false after the initial fetch
  fetchChat.once("value").then(() => {
   initialLoad = false;
  });