require('dotenv').config()
const {connectDB} = require("./database/database")
const TaskRoute = require("./routes/taskRoute")
const AuthRoute = require("./routes/authRoute")
const cors = require("cors")
const express = require("express")
const app = express()


app.use(express.urlencoded({extended: true}))
app.use(express.json());

app.use(cors({ origin: 'http://localhost:80', credentials: true }));
  
app.use("/auth", AuthRoute)
app.use("/api", TaskRoute)

const port = process.env.PORT
app.listen(port || 5000, async () => {
  connectDB();
  console.log(`Server running on port ${process.env.PORT || 5000}`);
});