const mongoose = require("mongoose");

const languageSchema = new mongoose.Schema({
  lang_code: {
    type: String,
    required: true,
  },

  language: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Language", languageSchema);
