// function addEvent() {
//   // Collect values from the modal inputs
//   const inputs = document.querySelectorAll('.modal input');
//   const title = inputs[0].value.trim();
//   const day = inputs[1].value.trim();
//   const time = inputs[2].value.trim();

//   // Basic validation
//   if (!title || !day || !time) {
//     alert("Please fill out all fields.");
//     return;
//   }

//   // POST data to the backend
//   fetch('/event/add-event', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ title, day, time })
//   })
//     .then(res => res.json())
//     .then(result => {
//       alert(result.message || "Event saved.");
//       closeModal();     // Hide the modal (your UI function)
//       loadEvents();     // Optional: Refresh event display
//     })
//     .catch(err => {
//       console.error("Failed to save event:", err);

//     });
// }

function toggleNotif() {
  const panel = document.getElementById("notifPanel");
  panel.style.display = panel.style.display === "none" ? "block" : "none";
}

function showModal() {
  document.getElementById("modalBg").style.display = "block";
}

function closeModal() {
  document.getElementById("modalBg").style.display = "none";
}

// function addEvent() {
//   const inputs = document.querySelectorAll('.modal input');
//   const title = inputs[0].value;
//   const day = inputs[1].value;
//   const time = inputs[2].value;

//   if (!title || !day || !time) {
//     alert("Please fill in all fields.");
//     return;
//   }

//   // Add to event list container
//   const list = document.getElementById('eventList');
//   const li = document.createElement('li');
//   li.textContent = `${title} - ${day} at ${time}`;
//   list.appendChild(li);

//   // Clear modal inputs
//   inputs.forEach(input => input.value = "");

//   closeModal();

//   // If saving to MongoDB, you could do a POST here
//   // fetch('/api/events', { method: 'POST', body: ... })
// }

function addEvent() {
  const inputs = document.querySelectorAll(".modal input");
  const title = inputs[0].value.trim();
  const day = inputs[1].value.trim();
  const time = inputs[2].value.trim();

  if (!title || !day || !time) {
    alert("Please fill out all fields.");
    return;
  } // POST to backend

  fetch("/event/add-event", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, day, time }),
  })
    .then((res) => {
      if (!res.ok) throw new Error("Failed to save event");
      return res.json();
    })
    .then((result) => {
      alert(result.message || "Event saved to database."); // ✅ Update UI

      const list = document.getElementById("eventList");
      const li = document.createElement("li");
      li.textContent = `${title} - ${day} at ${time}`;
      list.appendChild(li); // Clear modal inputs

      inputs.forEach((input) => (input.value = ""));

      closeModal(); // Hide modal
    })
    .catch((err) => {
      console.error("Error saving event:", err);
      alert("Something went wrong. Check console for details.");
    });
}

function showEventInRow(title, day, time) {
  const eventRow = document.getElementById("eventList");
  eventRow.innerHTML = ""; // clear previous

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  days.forEach((d) => {
    const cell = document.createElement("div");
    cell.className = "event-cell";

    if (d === day) {
      const box = document.createElement("div");
      box.className = "event-box";
      box.textContent = `${title} ${time}`;
      cell.appendChild(box);
    }

    eventRow.appendChild(cell);
  });
}


function requestTimeOff(){
  alert("Time off request submitted! (Demo)");
}

function swapShift(){
  alert("Shift swap request sent! (Demo)");
}





const teamEvents = [
  { day: 'Mon', label: 'Riya: WFH', color: '#FFC107' },
  { day: 'Tue', label: 'Alex: Shift 11-7PM', color: '#9C27B0' },
  { day: 'Wed', label: 'Kim: PTO', color: '#FF5722' },
];



function toggleTeamOverlay(checked) {
  let overlayRow = document.getElementById('teamOverlayRow');
  if (!overlayRow) {
    overlayRow = document.createElement('tr');
    overlayRow.id = 'teamOverlayRow';
    const table = document.querySelector('.calendar-table');
    table.appendChild(overlayRow);
  }
  overlayRow.innerHTML = '';
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
  days.forEach(day => {
    const td = document.createElement('td');
    const teammate = teamEvents.find(ev => ev.day === day);
    if (checked && teammate) {
      td.innerHTML = `<div style="background:${teammate.color};color:#fff;padding:6px 8px;border-radius:5px;font-size:0.9em;">${teammate.label}</div>`;
    }
    overlayRow.appendChild(td);
  });
  overlayRow.style.display = checked ? '' : 'none';
}



const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
const hours = [8, 6, 4, 0, 7]; // Example weekly workload

// Bar Chart
const barCtx = document.getElementById('workloadBar').getContext('2d');
const workloadBar = new Chart(barCtx, {
  type: 'bar',
  data: {
    labels: days,
    datasets: [{
      label: 'Work Hours',
      data: hours,
      backgroundColor: [
        '#4CAF50', '#9C27B0', '#2196F3', '#FF9800', '#009688'
      ]
    }]
  },
  options: {
    plugins: {
      tooltip: {
        callbacks: {
          label: function(context) {
            return `${context.dataset.label}: ${context.parsed.y} hrs`;
          }
        }
      },
      legend: { display: false }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: { display: true, text: 'Hours per Day' }
      }
    }
  }
});

// Pie Chart
const total = hours.reduce((a, b) => a + b, 0);
const pieCtx = document.getElementById('workloadPie').getContext('2d');
const workloadPie = new Chart(pieCtx, {
  type: 'pie',
  data: {
    labels: days,
    datasets: [{
      label: 'Workload Share',
      data: hours,
      backgroundColor: [
        '#4CAF50', '#9C27B0', '#2196F3', '#FF9800', '#009688'
      ]
    }]
  },
  options: {
    plugins: {
      tooltip: {
        callbacks: {
          label: function(context) {
            const value = context.parsed;
            const percent = ((value / total) * 100).toFixed(1);
            return `${context.label}: ${value} hrs (${percent}%)`;
          }
        }
      }
    }
  }
});


function deleteAppointment(id) {
  if (!confirm("Are you sure you want to delete this appointment?")) return;

  fetch(`/api/events/${id}`, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then((result) => {
      alert(result.message || "Appointment deleted.");
      location.reload(); // Refresh list after deletion
    })
    .catch((err) => {
      console.error("Failed to delete appointment:", err);
      alert("Failed to delete appointment.");
    });
}
