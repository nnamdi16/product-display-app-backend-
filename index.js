const mongoose = require("mongoose");
const app = require("./src/config/express");
// require and configure dotenv, will load vars in .env in PROCESS.ENV
require('dotenv').config();

const mongoUri = process.env.DATABASE;

mongoose.connect(mongoUri, {
  useCreateIndex: true,
  keepAlive: 1,
  useNewUrlParser: true,
  useFindAndModify: false
});

mongoose.connection.on("error", () => {
  throw new Error(`unable to connect to database: ${mongoUri}`);
});

if (process.env.NODE_ENV !== "test") {
  const PORT = process.env.PORT;

  app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`);
  });
}
