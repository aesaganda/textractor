const router = require("express").Router();
const recognize = require("./recognize");
const detect = require("./detect");

router.use("/recognize", recognize);
router.use("/detect", detect);

module.exports = router;
