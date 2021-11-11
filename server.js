import express from "express";

const app = express();
app.use(express.json());

// Mimic the future database
const database = {
  users: [
    {
      id: 123,
      name: "John",
      email: "john@gmail.com",
      password: "cookies",
      entries: 0,
      joined: new Date(),
    },
    {
      id: 456,
      name: "Sally",
      email: "sally@gmail.com",
      password: "bananas",
      entries: 0,
      joined: new Date(),
    },
  ],
};

app.get("/", (req, res) => {
  res.send("this is working");
});

app.post("/signin", (req, res) => {
  if (
    req.body.email === database.users[0].email &&
    req.body.password === database.users[0].password
  ) {
    res.json("Login Success!");
  } else {
    res.json("Login Error!");
  }
});

app.listen(3000, () => {
  console.log("app is running on port 3000");
});

/*
API routes structure:

/ --> res = this is working
/signin (POST) --> res = success/fail
/register (POST) --> res = new user registration
/profile/:userId (GET) --> res = user data
/image (PUT) --> res = user count

*/
