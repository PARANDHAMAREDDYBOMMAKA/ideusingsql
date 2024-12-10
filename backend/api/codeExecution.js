const { exec } = require("child_process");
const path = require("path");
const fs = require("fs");
const util = require("util");

const unlinkAsync = util.promisify(fs.unlink);

const executeCode = (code, language) => {
  return new Promise((resolve, reject) => {
    const timestamp = Date.now();
    const tempFilePath = path.join(
      __dirname,
      `tempCode_${timestamp}.${getFileExtension(language)}`
    );

    try {
      // Write the code to a temporary file
      fs.writeFileSync(tempFilePath, code);

      // Get the execution command
      const command = getExecutionCommand(language, tempFilePath);
      console.log(`Executing command: ${command}`);

      // Execute the code
      exec(command, { timeout: 20000 }, async (err, stdout, stderr) => {
        try {
          // Clean up temporary files
          console.log("Cleaning up file:", tempFilePath);
          await unlinkAsync(tempFilePath);

          if (err) {
            console.error("Execution error:", err.message || stderr);
            reject(err.message || stderr);
            return;
          }

          if (stderr) {
            console.error("Runtime error:", stderr);
            reject(stderr);
            return;
          }

          resolve(stdout.trim());
        } catch (cleanupError) {
          console.error("Error during cleanup:", cleanupError);
          reject(cleanupError);
        }
      });
    } catch (error) {
      reject(`Execution error: ${error.message}`);
    }
  });
};

// Helper function to get the file extension
function getFileExtension(language) {
  const extensions = {
    javascript: "js",
    python: "py",
    go: "go",
    c: "c",
    cpp: "cpp",
    java: "java",
    ruby: "rb",
    rust: "rs",
  };
  return extensions[language] || "txt";
}

// Helper function to get the execution command
function getExecutionCommand(language, tempFilePath) {
  const commands = {
    javascript: `node ${tempFilePath}`,
    python: `python3 ${tempFilePath}`,
    go: `go run ${tempFilePath}`,
    c: `gcc ${tempFilePath} -o ${tempFilePath}.out && ${tempFilePath}.out`,
    cpp: `g++ ${tempFilePath} -o ${tempFilePath}.out && ${tempFilePath}.out`,
    java: `javac ${tempFilePath} && java -cp ${path.dirname(
      tempFilePath
    )} ${path.basename(tempFilePath, ".java")}`,
    ruby: `ruby ${tempFilePath}`,
    rust: `rustc ${tempFilePath} -o ${tempFilePath}.out && ${tempFilePath}.out`,
  };

  return commands[language] || `node ${tempFilePath}`;
}

module.exports = { executeCode };
