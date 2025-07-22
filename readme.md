# 🗓️ Office Scheduler Web App

An interactive scheduling dashboard that allows users to add, view, and manage weekly events such as shifts, meetings, and remote workdays. Events are saved in MongoDB and displayed in a visual calendar format as well as a dynamic row beneath the calendar.

---

## ✨ Features

- 📅 **Weekly Calendar View**: Pre-filled events (e.g., shifts, meetings).
- ➕ **Add New Event**: Modal popup form to input event title, day, and time.
- 🧠 **MongoDB Integration**: Newly added events are saved to a MongoDB collection.
- 🔁 **Instant Display**: Successfully saved events are rendered dynamically without page reload.
- 🔔 **Notification Panel**: Toggleable panel for updates.
- ✅ **Styling Consistency**: New event row visually matches the main calendar layout.

---

## 📂 Project Structure

├── model/ # Mongoose models (user, event)
│ ├── event.js
│ └── user.js
│
├── public/ # Static assets
│ └── styles/ # CSS styles for pages
│ ├── calendar.css
│ ├── dashboard.css
│ ├── login.css
│ ├── registration.css
│ ├── scheduleWeek.css
│ └── support.css
│
├── views/ # HTML views + client-side JS
│ ├── calendar.html
│ ├── dashboard.html
│ ├── login.html
│ ├── register.html
│ ├── scheduleWeek.html
│ ├── support.html
│ └── scripts/
│ ├── calendar.js
│ ├── eventHandler.js
│ ├── profile.js
│ └── support.js
│
├── routes/ # Express route handlers
│ ├── dashboard.js
│ ├── eventList.js
│ ├── eventRouter.js
│ ├── login.js
│ ├── logout.js
│ ├── notification&search.js
│ └── register.js
│
├── images/ # Image assets (if any)
├── .gitignore
├── events.rest # REST client file (VS Code plugin)
├── index.js # Entry point of the app
├── package.json
├── package-lock.json
└── README.md # You're here

yaml
Copy
Edit




---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16+ recommended)
- [MongoDB](https://www.mongodb.com/) (local or Atlas)

### Installation

```bash
# Clone the repository
git clone https://github.com/777iamankit/AppointmentScheduling-CT_CSI_NJ_6070-.git
cd AppointmentScheduling-CT_CSI_NJ_6070-

# Install dependencies
npm install





# Run the code
nodemon index.js