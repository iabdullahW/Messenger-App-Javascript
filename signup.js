document.addEventListener('DOMContentLoaded', function () {
    const firebaseConfig = {
        apiKey: "AIzaSyAv9a5ctmnUEa3TGLVPk_u8wBl37k-rSxE",
        authDomain: "chat-signup.firebaseapp.com",
        projectId: "chat-signup",
        storageBucket: "chat-signup.appspot.com",
        messagingSenderId: "864467316222",
        appId: "1:864467316222:web:8fc8da3432ffde16e3a4af"
    };
  
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
  
    const signupForm = document.getElementById('signup-form');
  
    signupForm.addEventListener('submit', function (event) {
        event.preventDefault();
  
        // Get user input
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const password = document.getElementById('password').value;
  
        // Replace the following code with your Firebase authentication logic
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Redirect to a new page
                window.location.href = "chat.html";
            })
            .catch((error) => {
                console.error(error.message);
            });
    });
  });