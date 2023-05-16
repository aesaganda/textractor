const router = require("express").Router();
const { fontFinder } = require("../controllers/textract");

router.post("/", fontFinder);

module.exports = router;
