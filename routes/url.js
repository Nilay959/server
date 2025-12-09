const express = require('express');
const router = express.Router();
const {generateShortURL , redirectToOriginalURL , getURLStats, deleteURL , updateURL , getAllURLStats} = require('../controller/url');

router.get("/stats", getAllURLStats);
router.post("/add", generateShortURL);
router.get("/stats/:shortId", getURLStats);
router.put("/:shortId", updateURL);
router.delete("/:shortId", deleteURL);
// ✅ Redirect route LAST
router.get("/:shortId", redirectToOriginalURL);

module.exports = router;