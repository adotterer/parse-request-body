const { sendFormPage } = require("./routes");
const http = require("http");

const server = http.createServer((req, res) => {
  console.log(req.method, "METHOD");
  console.log(req.url, "URL");
  let reqBody = "";
  req.on("data", (data) => {
    reqBody += data;
  });
  req.on("end", () => {
    if (reqBody) {
      req.body = reqBody
        .split("&")
        .map((pair) => pair.split("="))
        // .map(([key, value]) => {
        //   console.log(key, value);
        // })
        .map(([key, value]) => {
          return [key, value.replace(/\+/g, " ")];
        })
        .map(([key, value]) => {
          return [decodeURIComponent(key), decodeURIComponent(value)];
        })
        .reduce((acc, [key, value]) => {
          acc[key] = value;
          return acc;
        }, {});
    }
    sendFormPage(req, res);
  });
});

server.listen(5000, () => console.log("listening on port 5000"));

