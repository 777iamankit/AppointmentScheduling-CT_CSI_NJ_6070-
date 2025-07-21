const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const url = "mongodb://127.0.0.1:27017/AppointmentScheduler";
mongoose.connect(url);

const con = mongoose.connection;
con.on("open", () => {
  console.log("connected");
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "views", "login.html"));
});

const registerRouter = require("./routes/register.js");
app.use("/register", registerRouter);

const loginRouter = require("./routes/login.js");
app.use("/login", loginRouter);

const logoutRouter = require("./routes/logout.js");
app.use("/logout", logoutRouter);


const notificationAndSearchRouter=require('./routes/notification&search.js');
app.use('/',notificationAndSearchRouter);


const eventRouter = require("./routes/eventRouter.js");
app.use("/event", eventRouter); // or `app.use("/events", eventRouter);`



app.get('/calendar.html', (req, res) => {
  res.sendFile(path.join(__dirname,'public', 'views', 'calendar.html'));
});



app.listen(3000, () => {
  console.log(`Server is listening on port 3000`);
});
