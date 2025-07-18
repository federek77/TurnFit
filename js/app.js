import { auth } from "firebase/firebase-init.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";

// Verificar estado de autenticación
onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log("Usuario logueado:", user.email);
    } else {
        console.log("Usuario no logueado");
    }
});

// Logout
const logoutBtn = document.getElementById("logout-btn");
if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
        signOut(auth).then(() => {
            console.log("Sesión cerrada");
            window.location.href = "index.html";
        });
    });
}
