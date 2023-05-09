require("dotenv").config();
const Language = require("../model/languages");

const getlanguages = async (req, res) => {
  try {
    const languages = await Language.find({});
    console.log("LANGUAGES : ", languages);
    res.json(languages);
  } catch (error) {
    console.error("Error in getlanguages: ", error);
    res.status(500).send("An error occurred while getting the languages.");
  }
};

const addLanguage = async (req, res) => {
  const { lang_code, language } = req.body;

  if (!lang_code) {
    return res.status(400).send("Missing lang_code");
  }
  if (!language) {
    return res.status(400).send("Missing language");
  }

  try {
    const newLanguage = new Language({ lang_code, language });
    await newLanguage.save();
    res.send("Language added successfully");
  } catch (error) {
    console.error("Error in addLanguage: ", error);
    res.status(500).send("An error occurred while adding the language.");
  }
};

module.exports = {
  getlanguages,
  addLanguage,
};
