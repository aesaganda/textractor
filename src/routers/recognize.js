const router = require("express").Router();
const { imageRecognize } = require("../controllers/textract");

router.post("/", imageRecognize);

module.exports = router;
