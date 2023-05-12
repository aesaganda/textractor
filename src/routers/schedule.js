const router = require("express").Router();
const { schedule } = require("../controllers/textract");

router.post("/", schedule);

module.exports = router;
