import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {

        apiKey: "AIzaSyD5sfscHRzVFZk1vR9dS2dwN5Se6cG7oqs",
        authDomain: "anime-a6969.firebaseapp.com",
        databaseURL: "https://anime-a6969-default-rtdb.firebaseio.com",
        projectId: "anime-a6969",
        storageBucket: "anime-a6969.appspot.com",
        messagingSenderId: "300332750325",
        appId: "1:300332750325:web:cfec606eeadd7588227cbc",
        measurementId: "G-3V1FTT21QY"

};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };

