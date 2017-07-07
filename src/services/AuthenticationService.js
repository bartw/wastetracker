import * as firebase from "firebase";

export default class AuthenticationService {
  constructor() {
    const config = {
      apiKey: "AIzaSyBFst0KH4hxxdiU7ADQd09NMW_7oPh9RTI",
      authDomain: "wastetracker-5daf7.firebaseapp.com",
      databaseURL: "https://wastetracker-5daf7.firebaseio.com",
      projectId: "wastetracker-5daf7",
      storageBucket: "wastetracker-5daf7.appspot.com",
      messagingSenderId: "39773773466"
    };
    const app = firebase.initializeApp(config);
    const provider = new firebase.auth.GoogleAuthProvider();

    let token = localStorage.getItem("token");
    let user = localStorage.getItem("user");

    this.login = () => {
      return firebase
        .auth()
        .signInWithPopup(provider)
        .then(result => {
          token = result.credential.accessToken;
          user = result.user;
          localStorage.setItem("token", token);
          localStorage.setItem("user", JSON.stringify(user));
        })
        .catch(error => {
          console.log(error);
        });
    };

    this.logout = () => {
      return firebase
        .auth()
        .signOut()
        .then(() => {
          token = null;
          user = null;
          localStorage.removeItem("token");
          localStorage.removeItem("user");
        })
        .catch(error => {
          console.log(error);
        });
    };

    this.isAuthenticated = () => token !== null;
  }
}
