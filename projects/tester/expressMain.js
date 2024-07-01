const fs = require("fs");
const Express = require("express");
const Busboy = require("connect-busboy");
const app = Express();
const port = 8991;

app.use(Busboy());
app.use(Express.json());                                    // for parsing application/json
app.use(Express.urlencoded({ extended: true }));    // for parsing application/x-www-form-urlencoded

app.get("/", (request, response) => {
  const result = "Hello World! My friend. This is express apps!!!";
  response.status(200).send(result);
});

app.listen(port, () => {
  console.log('运行咯,ip:', port);
  //
});
