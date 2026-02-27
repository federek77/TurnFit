import { db } from "../firebase/firebase-init.js";
import { collection, getDocs, addDoc } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";
import { auth } from "../firebase/firebase-init.js";

const horariosPorClase = {
    yoga: [
        { fecha: '2025-07-21', hora: '09:00' },
        { fecha: '2025-07-23', hora: '09:00' },
    ],
    spinning: [
        { fecha: '2025-07-21', hora: '10:00' },
        { fecha: '2025-07-23', hora: '10:00' },
    ],
    hit: [
        { fecha: '2025-07-22', hora: '17:00' },
        { fecha: '2025-07-24', hora: '17:00' },
    ],
    funcional: [
        { fecha: '2025-07-22', hora: '19:00' },
        { fecha: '2025-07-24', hora: '19:00' },
    ],
};

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
                <button class="reservar-btn btn btn-primary mt-2" data-id="${doc.id}" data-nombre="${clase.nombre}">
                    Reservar
                </button>
            `;

            container.appendChild(card);
        });

        container.addEventListener("click", (e) => {
            if (e.target.classList.contains("reservar-btn")) {
                const claseId = e.target.getAttribute("data-id");
                const claseNombre = e.target.getAttribute("data-nombre").toLowerCase();

                const horarios = horariosPorClase[claseNombre];
                if (!horarios || horarios.length === 0) {
                    alert("No hay horarios disponibles para esta clase.");
                    return;
                }

                const { fecha, hora } = horarios[0]; // tomamos el primer horario
                const fechaHoraISO = new Date(`${fecha}T${hora}:00`).toISOString();

                guardarReserva(claseId, fechaHoraISO);
            }
        });

    } catch (error) {
        console.error("Error al cargar las clases:", error);
        container.innerHTML = "<p>Hubo un error al cargar las actividades.</p>";
    }
});

async function guardarReserva(claseId, fechaHoraISO) {
    const usuario = auth.currentUser;
    if (!usuario) {
        alert("Debes iniciar sesión para reservar.");
        return;
    }

    try {
        await addDoc(collection(db, "reservas"), {
            claseId: claseId,
            usuarioId: usuario.uid,
            fechaReserva: fechaHoraISO,
            timestampReserva: new Date().toISOString()
        });
        alert("Reserva guardada correctamente.");
    } catch (error) {
        console.error("Error guardando reserva:", error);
        alert("Error al guardar la reserva.");
    }
}
