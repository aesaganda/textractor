const mongoose = require("mongoose");

mongoose
  .connect(process.env.ATLAS_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected successfully");
  })

  .catch((err) => {
    console.log("MongoDB connection error: " + err);
  });

module.exports = mongoose;
