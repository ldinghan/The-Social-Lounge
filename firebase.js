import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyAkMaGEEb62F_1g-fbUXkkEOBup3DAIzi4",
    authDomain: "dh-test-game.firebaseapp.com",
    databaseURL: "https://dh-test-game-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "dh-test-game",
    storageBucket: "dh-test-game.appspot.com",
    messagingSenderId: "279019435180",
    appId: "1:279019435180:web:2e58bc862463e617e09b09",
    measurementId: "G-X4P66FKLS1"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase();
