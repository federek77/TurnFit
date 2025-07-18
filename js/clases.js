import { db } from "../firebase/firebase-init.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", async () => {
    const container = document.getElementById("clases-container");

    try {
        const snapshot = await getDocs(collection(db, "clases"));

        if (snapshot.empty) {
            container.innerHTML = "<p>No hay clases disponibles.</p>";
            return;
        }

        snapshot.forEach(doc => {
            const clase = doc.data();

            const card = document.createElement("div");
            card.className = "clase-card";

            card.innerHTML = `
                ${clase.imagen ? `<img src="${clase.imagen}" alt="${clase.nombre}" class="img-fluid rounded mb-2">` : ""}
                <h2>${clase.nombre}</h2>
                <p><strong>Descripción:</strong> ${clase.descripcion}</p>
                <p><strong>Duración:</strong> ${clase.duracion}</p>
                <p><strong>Nivel:</strong> ${clase.nivel}</p>
                
            `;

            container.appendChild(card);
        });

        // Delegación de eventos para botones
        container.addEventListener("click", (e) => {
            if (e.target.classList.contains("reservar-btn")) {
                const claseElegida = e.target.getAttribute("data-nombre");
                alert(`¡Reservaste una clase de ${claseElegida}!`);
                // Aquí podrías redirigir a la página de calendario o guardar la reserva en Firestore
            }
        });

    } catch (error) {
        console.error("Error al cargar las clases:", error);
        container.innerHTML = "<p>Hubo un error al cargar las actividades.</p>";
    }
});
