const express = require("express");
const { createServer } = require("http");
const { ConnectDb } = require("./database/database.js");
const { connectToSocket } = require("./src/Controllers/SocketManager.js");
const userRoutes = require("./src/Routes/users.Routes.js");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json({ limit: "40kb" }));
app.use(express.urlencoded({ limit: "40kb", extended: true }));

app.set("PORT", process.env.PORT || 3000);

app.use("/api/v1/users", userRoutes);

const server = createServer(app);
const io = connectToSocket(server);

ConnectDb();

server.listen(app.get("PORT"), () => {
  console.log(`Listening on port ${app.get("PORT")}`);
});

   
  
   
   
  
 