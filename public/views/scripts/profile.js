// -------------------------
// Profile panel toggle
// -------------------------
const profileLink = document.getElementById("profileLink");
const profileBox = document.getElementById("profileBox");

profileLink.addEventListener("click", function (e) {
  e.preventDefault();
  profileBox.style.display = profileBox.style.display === "block" ? "none" : "block";
});

// -------------------------
// Search panel toggle
// -------------------------
document.getElementById("searchButton").addEventListener("click", function (e) {
  e.preventDefault();
  document.getElementById("searchMenu").classList.toggle("active");
  document.getElementById("notificationMenu").classList.remove("active");
});

// -------------------------
// Notification panel toggle (top+sidebar)
// -------------------------
document.querySelectorAll(".notification-trigger").forEach((btn) => {
  btn.addEventListener("click", function (e) {
    e.preventDefault();
    document.getElementById("notificationMenu").classList.toggle("active");
    document.getElementById("searchMenu").classList.remove("active");

    // Fetch notifications from Express
    fetch("/notifications")
      .then((resp) => resp.json())
      .then((data) => {
        document.getElementById("notificationContents").innerHTML =
          data.length
            ? data.map((n) => `<div>${n.text}</div>`).join("")
            : "No new notifications";
      });
  });
});

// -------------------------
// Live search input
// -------------------------
document.getElementById("searchInput").addEventListener("input", function () {
  const query = this.value;
  fetch(`/search?q=${encodeURIComponent(query)}`)
    .then((resp) => resp.json())
    .then((results) => {
      document.getElementById("searchResults").innerHTML = results
        .map((r) => `<div>${r.result}</div>`)
        .join("");
    });
});

// -------------------------
// Profile edit form handlers
// -------------------------
function showEditForm() {
  document.getElementById("editForm").style.display = "flex";
}

function hideEditForm() {
  document.getElementById("editForm").style.display = "none";
}

function saveProfile(event) {
  event.preventDefault();
  const newName = document.getElementById("editName").value;
  const newEmail = document.getElementById("editEmail").value;

  document.getElementById("profileName").textContent = newName;
  document.getElementById("profileEmail").textContent = newEmail;
  hideEditForm();
}

// -------------------------
// Click outside handler
// -------------------------
document.addEventListener("click", function (e) {
  const target = e.target;

  // Hide profileBox
  if (!profileBox.contains(target) && target !== profileLink) {
    profileBox.style.display = "none";
  }

  // Hide search and notification panel
  const searchMenu = document.getElementById("searchMenu");
  const notificationPanel = document.getElementById("notificationMenu");

  const isInsideSearch = searchMenu && searchMenu.contains(target);
const isInsideNotification = (notificationPanel && notificationPanel.contains(target)) || target.classList.contains("notification-trigger");

  if (searchMenu && !isInsideSearch) {
  searchMenu.classList.remove("active");
}
if (notificationPanel && !isInsideNotification) {
  notificationPanel.classList.remove("active");
}

});

function loadCalendar() {
  fetch('/calendar.html') // calendar.html should contain just the calendar markup
    .then(res => res.text())
    .then(html => {
      document.querySelector('.main-content').innerHTML = html;

      // ✅ Load and initialize calendar.js (only once)
      if (!window.calendarInitialized) {
        const script = document.createElement('script');
        script.src = './scripts/calendar.js'; // adjust if your path is different
        script.onload = () => {
          window.calendarInitialized = true;
        };
        document.body.appendChild(script);
      } else {
        // If already loaded, re-render
        if (typeof renderMonthCalendar === 'function') renderMonthCalendar();
        if (typeof renderCurrentWeekSchedule === 'function') renderCurrentWeekSchedule();
      }
    })
    .catch(err => {
      console.error("Failed to load calendar:", err);
      document.querySelector('.main-content').innerHTML = `<p>Error loading calendar.</p>`;
    });
}



document.getElementById("dashboardLink").addEventListener("click", function(e) {
  e.preventDefault();
  loadDashboard();
});

// public/scripts/profile.js

function loadDashboard() {
  fetch('/views/dashboard.html')
    .then(res => res.text())
    .then(html => {
      document.querySelector('.main-content').innerHTML = html;
    })
    .catch(err => {
      document.querySelector('.main-content').innerHTML = '<p>Failed to load dashboard.</p>';
      console.error("Dashboard load error:", err);
    });
}




document.addEventListener("DOMContentLoaded", () => {
  const upcomingBtn = document.getElementById("toggle-upcoming");
  const pastBtn = document.getElementById("toggle-past");

  const upcomingSection = document.querySelector(".upcoming-section");
  const pastSection = document.querySelector(".past-section");

  const upcomingContainer = document.querySelector(".upcoming-scroll");
  const pastContainer = document.querySelector(".past-scroll");

  // Fetch events once
  fetch("/api/events")
    .then(res => res.json())
    .then(data => {
      data.forEach(event => {
        const card = `
          <div class="event-card">
            <div class="event-title">${event.title}</div>
            <div class="event-date">${event.date}</div>
          </div>
        `;

        if (event.type === "upcoming") {
          upcomingContainer.innerHTML += card;
        } else {
          pastContainer.innerHTML += card;
        }
      });
    });

  // Toggle behavior
  upcomingBtn.addEventListener("click", () => {
    upcomingBtn.classList.add("active");
    pastBtn.classList.remove("active");
    upcomingSection.classList.remove("hidden");
    pastSection.classList.add("hidden");
  });

  pastBtn.addEventListener("click", () => {
    pastBtn.classList.add("active");
    upcomingBtn.classList.remove("active");
    pastSection.classList.remove("hidden");
    upcomingSection.classList.add("hidden");
  });
});









