import express from "express";
import bcrypt from "bcrypt";
import cors from "cors";
import knex from "knex";

const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    port: 5432,
    user: "postgres",
    password: "",
    database: "face-recognition-brain",
  },
});

const app = express();
app.use(express.json());
app.use(cors());

const saltRounds = 10;

// Mimic the future database
const database = {
  users: [
    {
      id: "123",
      name: "John",
      email: "john@gmail.com",
      password: "cookies",
      entries: 0,
      joined: new Date(),
    },
    {
      id: "456",
      name: "Sally",
      email: "sally@gmail.com",
      password: "bananas",
      entries: 0,
      joined: new Date(),
    },
  ],
  login: [
    {
      id: "789",
      hash: "",
      email: "peter@gmail.com",
    },
  ],
};

app.get("/", (req, res) => {
  res.send(database.users);
});

app.post("/signin", (req, res) => {
  // Load hash from your password DB.
  // bcrypt.compare(
  //   "apples",
  //   "$2b$10$tM0ZQieWGC.oVRLHCTGIUO3tnTSpEn.NJcO.pzWL5oDjUISd7S32O",
  //   function (err, result) {
  //     console.log("correct password: ", result);
  //   }
  // );
  // bcrypt.compare(
  //   "veggies",
  //   "$2b$10$tM0ZQieWGC.oVRLHCTGIUO3tnTSpEn.NJcO.pzWL5oDjUISd7S32O",
  //   function (err, result) {
  //     console.log("correct password: ", result);
  //   }
  // );

  if (
    req.body.email === database.users[0].email &&
    req.body.password === database.users[0].password
  ) {
    res.json(database.users[0]);
  } else {
    res.status(400).json("error");
  }
});

app.post("/register", (req, res) => {
  const { name, email, password } = req.body;

  db("users")
    .returning("*")
    .insert({ email: email, name: name, joined: new Date() })
    .then((user) => {
      res.json(user[0]);
    })
    .catch((err) => res.status(400).json("Unable to register"));

  // bcrypt.hash(password, saltRounds, function (err, hash) {
  //   console.log(hash);
  // });
});

app.get("/profile/:id", (req, res) => {
  const { id } = req.params;

  db.select("*")
    .from("users")
    .where({ id: id })
    .then((user) => {
      if (user.length) {
        res.json(user[0]);
      } else {
        res.status(404).json("Wrong user id. User not found!");
      }
    });
});

app.put("/image", (req, res) => {
  const { id } = req.body;
  let found = false;

  database.users.forEach((user) => {
    if (user.id === id) {
      found = true;
      user.entries++;
      return res.json(user.entries);
    }
  });

  if (!found) {
    res.status(404).json("Wrong user id. User not found!");
  }
});

app.listen(3001, () => {
  console.log("app is running on port 3001");
});

/*
API routes structure:

/ --> res = this is working
/signin (POST) --> res = success/fail
/register (POST) --> res = new user registration
/profile/:userId (GET) --> res = user data
/image (PUT) --> res = user count

*/
