const express = require("express");
const dotenv = require("dotenv");
const cors = require('cors');

dotenv.config();

require("./config.js");

const server = express();
const urlRoutes = require("./routes/url");

server.use(cors());
server.use(express.json());
server.use("/url", urlRoutes);

const PORT = process.env.PORT || 8001;

server.listen(PORT, () => {
  console.log(`Server is listening on port:${PORT}`);
});
