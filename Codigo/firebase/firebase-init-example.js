// firebase-init-example.js
// IMPORTANTE: Renombra este archivo a 'firebase-init.js' y completa con tus credenciales.

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";

export const firebaseConfig = {
    apiKey: "TU_API_KEY_AQUI",
    authDomain: "TU_DOMAIN_AQUI",
    projectId: "TU_PROJECT_ID_AQUI",
    storageBucket: "TU_BUCKET_AQUI",
    messagingSenderId: "TU_SENDER_ID_AQUI",
    appId: "TU_APP_ID_AQUI"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
