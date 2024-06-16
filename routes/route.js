const fs = require("fs");
const requestHandler = function (req, res) {
  console.log(req);
  const url = req.url;
  const method = req.method;

  if (url === "/") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");
    res.write(
      `
        <html>
        <head>
        <title>
            Fist node page
        </title>
        </head>

        <body>
            <h1>Fist node page</h1>

        </body>
        </html>
        `
    );
    res.end();
  } else if (url === "/mensaje" && method === "GET") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");
    res.write(
      `
        <html>
        <head>
        <title>
            Mensaje
        </title>
        </head>

        <body>
            <h1>Mensaje</h1>

            <form action="/mensaje" method = "POST">
                <label for="titulo">
                    Titulo:
                </label>
                <input id="titulo" name="titulo" type="text">

                <button type="submit">
                    Enviar
                </button>
            </form>

        </body>
        </html>
        `
    );
    res.end();
  } else if (url === "/mensaje" && method === "POST") {
    const body = [];

    req.on("data", function (chunk) {
      body.push(chunk);
    });

    req.on("end", function () {
      const bodyParser = Buffer.concat(body).toString();
      const titulo = bodyParser.split("=")[1];
      fs.writeFile("test.txt", titulo, function () {
        res.statusCode = 302;
        res.setHeader("Location", "/mensaje");
        res.end();
      });
    });
  } else {
    res.statusCode = 404;
    res.setHeader("Content-Type", "text/html");
    res.write(
      `
        <html>
        <head>
        <title>
            No found
        </title>
        </head>

        <body>
            <h1>Page no found</h1>

        </body>
        </html>
        `
    );
    res.end();
  }
};

module.exports = requestHandler;
