const http = require("http");

const router = require("./routes/route");

const puerto = 1080;

const server = http.createServer(router);
server.listen(puerto);
