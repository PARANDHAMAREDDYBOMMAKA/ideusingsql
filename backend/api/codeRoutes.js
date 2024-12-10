const express = require("express");
const { executeCode } = require("./codeExecution");
const router = express.Router();

const supportedLanguages = [
  "javascript",
  "python",
  "go",
  "c",
  "cpp",
  "java",
  "ruby",
  "rust",
];

// Route to execute code
router.post("/execute", async (req, res) => {
  const { code, language } = req.body;

  if (!code || !language) {
    return res.status(400).json({ error: "Code and language are required" });
  }

  if (!supportedLanguages.includes(language)) {
    return res.status(400).json({ error: `Unsupported language: ${language}` });
  }

  console.log(`Executing code for language: ${language}`);
  try {
    const result = await executeCode(code, language);
    res.json({ result });
  } catch (error) {
    console.error("Error executing code:", error);
    res.status(500).json({ error: error });
  }
});

module.exports = router;
