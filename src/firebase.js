import firebase from "firebase"
const firebaseConfig = {
    apiKey: "AIzaSyBYGWOiZ8Uzh3pIk0h9YeUonnNA7h9lWvc",
    authDomain: "find-passion.firebaseapp.com",
    projectId: "find-passion",
    storageBucket: "find-passion.appspot.com",
    messagingSenderId: "415687361684",
    appId: "1:415687361684:web:5d0de32ef298c501cba081"
  };
 
  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore()
  const auth = firebaseApp.auth();
//   const provider = new firebase.auth.GoogleAuthProvider();
  const storage = firebase.storage();

  export {auth , storage };

  export default db;