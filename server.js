import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("this is working");
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
