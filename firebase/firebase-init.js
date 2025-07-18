// firebase-init.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";

export const firebaseConfig = {
    apiKey: "AIzaSyDePBf0rdq1Oq-kVSAect-8QHUzbypruIg",
    authDomain: "sistemareservasgimnasio.firebaseapp.com",
    projectId: "sistemareservasgimnasio",
    storageBucket: "sistemareservasgimnasio.firebasestorage.app",
    messagingSenderId: "971351696221",
    appId: "1:971351696221:web:c37cf4a86e847ab6983eb4"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

