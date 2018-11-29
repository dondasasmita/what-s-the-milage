const express = require("express");
const request = require("request");
const { email, password, token, server } = require("./config");

const app = express();

const port = 3000;

app.get("/", (req, res) => {
  request(
    {
      url: `${server}/api/positions?token=${token}`,
      json: true
    },
    (err, response, body) => {
      if (err) {
        console.log(`Error: ${err}`);
      } else {
        console.log(response.statusCode);
        res.send(body);
      }
    }
  ).auth(email, password);
});

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
