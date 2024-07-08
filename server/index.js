const express = require("express");
const server = express();
const connectDb = require("./Utils/db");
const cors = require("cors");
const userRouter = require("./router/User.route");
const AuthRouter = require("./router/Auth.route");
const clientRouter = require("./router/Client.route");
const roleRouter = require("./router/Role.route");
require("dotenv").config();

const corsoptions = {
  origin: "http://localhost:4000",
  methods: "GET,POST,PUT,DELETE,FATCH,HEAD",
  Credentials: true,
};

server.use(cors());

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use("/uploads", express.static("uploads"));
// server.use("/skill", router);
server.use("/user", userRouter);
server.use("/auth", AuthRouter);
server.use("/client", clientRouter);
server.use("/role", roleRouter);

server.get("/", (req, res) => {
  res.json({ msg: "Hello" });
});

connectDb().then(() => {
  server.listen(4000, () => {
    console.log("Server started");
  });
});
