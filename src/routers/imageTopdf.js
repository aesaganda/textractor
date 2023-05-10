const router = require("express").Router();
const { imageToPdf } = require("../controllers/textract");

router.post("/", imageToPdf);

module.exports = router;
