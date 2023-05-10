const { getlanguages, addLanguage } = require("../controllers/home");
const router = require("express").Router();

router.get("/get-languages", getlanguages);
router.post("/add-language", addLanguage);

module.exports = router;
