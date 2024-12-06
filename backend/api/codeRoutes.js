const express = require("express");
const { executeCode } = require("./codeExecution");

const router = express.Router();

// Execute code
router.post("/execute", async (req, res) => {
  const { code, language } = req.body;
  try {
    const result = await executeCode(code, language);
    res.json({ result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
