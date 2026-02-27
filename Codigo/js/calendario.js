// NO uses import/export aquí
// Usa la variable global FullCalendar

// Firebase App y Firestore
const firebaseConfig = {
    apiKey: "AIzaSyBIJo0uDxERvwRqKCThOV-Br5_qFadxKe4",
    authDomain: "sistemareservasgimnasio.firebaseapp.com",
    projectId: "sistemareservasgimnasio",
    storageBucket: "sistemareservasgimnasio.appspot.com",
    messagingSenderId: "971351696221",
    appId: "1:971351696221:web:c37cf4a86e847ab6983eb4"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

async function cargarCalendario() {
    const querySnapshot = await db.collection("reservas").get();
    const eventos = [];

    querySnapshot.forEach((doc) => {
        const clase = doc.data();
        if (clase.fechaReserva && clase.clase) {
            const fecha = clase.fechaReserva.toDate
                ? clase.fechaReserva.toDate()
                : new Date(clase.fechaReserva.seconds * 1000);
            const start = fecha.toISOString().slice(0, 16);

            eventos.push({
                title: clase.clase,
                start: start,
                description: clase.usuario || "",
                color: "#0d6efd"
            });
        }
    });

    console.log(eventos);

    const calendarEl = document.getElementById("calendario");
    const calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: "timeGridWeek",
        headerToolbar: {
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay"
        },
        allDaySlot: false,
        events: eventos,
        eventDidMount: function (info) {
            if (info.event.extendedProps.description) {
                info.el.title = info.event.extendedProps.description;
            }
        }
    });

    calendar.render();
}

cargarCalendario();
