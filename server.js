const express = require("express");
const Pusher = require("pusher");
const path = require("path");
const bodyparser = require("body-parser");

const app = express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

const pusher = new Pusher({
  appId: "1744591",
  key: "1907f82a25e16929ea8b",
  secret: "b996f5fa79bbb79e7d46",
  cluster: "ap2",
  useTLS: true,
});

// app.use(function (req, res, next) {
//   var error404 = new Error("Route Not Found");
//   error404.status = 404;
//   next(error404);
// });

app.post("/comment", function (req, res) {
  console.log(req.body);
  var newComment = {
    name: req.body.name,
    email: req.body.email,
    comment: req.body.comment,
  };

  pusher.trigger("flash-comments", "new_comment", newComment);
  console.log("created");
  res.json({ created: true });
});

module.exports = app;

// app.get("/", (req, res) => {
//   res.send("Server running successfully");
// });

app.listen(8000, () => {
  console.log(`Hi Shivam, Your server is running on port 8000`);
});
