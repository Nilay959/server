const mongoose = require('mongoose');
const dotenv = require('dotenv');


mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB connected ✅"))
  .catch((err) => console.error("MongoDB error ❌", err));
