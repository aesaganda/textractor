const router = require("express").Router();
const { downloadPDF } = require("../controllers/textract");

router.post("/", downloadPDF);

module.exports = router;
