const router = require("express").Router();
const { imageProcessing } = require("../controllers/textract");

router.post("/", imageProcessing);

module.exports = router;
