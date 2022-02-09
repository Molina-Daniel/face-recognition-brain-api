import express from "express";
import bcrypt, { hash } from "bcrypt";
import cors from "cors";
import knex from "knex";
import { handleRegister } from "./controllers/register.js";
import { handleSignin } from "./controllers/signin.js";
import { handleProfile } from "./controllers/profile.js";
import { handleApiCall, handleImage } from "./controllers/image.js";

const db = knex({
  client: "pg",
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  },
});

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  db.select("*")
    .from("users")
    .then((users) => {
      res.send(users);
    });
});

app.post("/signin", (req, res) => {
  handleSignin(req, res, db, bcrypt);
});

app.post("/register", (req, res) => {
  handleRegister(req, res, db, bcrypt);
});

app.get("/profile/:id", (req, res) => {
  handleProfile(req, res, db);
});

app.put("/image", (req, res) => {
  handleImage(req, res, db);
});
app.post("/imageurl", (req, res) => {
  handleApiCall(req, res);
});

app.listen(process.env.PORT || 3001, () => {
  console.log(`App is running on port ${process.env.PORT}`);
});

/*
API routes structure:

/ --> res = this is working
/signin (POST) --> res = success/fail
/register (POST) --> res = new user registration
/profile/:userId (GET) --> res = user data
/image (PUT) --> res = user count

*/
