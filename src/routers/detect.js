const router = require("express").Router();

const { imageDetect } = require("../controllers/textract");

router.post("/", imageDetect);

module.exports = router;