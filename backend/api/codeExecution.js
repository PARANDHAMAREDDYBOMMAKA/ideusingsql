const { exec } = require("child_process");
const path = require("path");
const fs = require("fs");

// Function to execute code based on language
const executeCode = (code, language) => {
  return new Promise((resolve, reject) => {
    const tempFilePath = path.join(__dirname, "tempCode.js");
    const tempPythonFilePath = path.join(__dirname, "tempCode.py");
    const tempGoFilePath = path.join(__dirname, "tempCode.go");
    const tempCppFilePath = path.join(__dirname, "tempCode.cpp");
    const tempCFilePath = path.join(__dirname, "tempCode.c");
    const tempJavaFilePath = path.join(__dirname, "tempCode.java");
    const tempRubyFilePath = path.join(__dirname, "tempCode.rb");

    fs.writeFileSync(tempFilePath, code);

    // Map of supported languages and commands
    let command;
    if (language === "javascript") {
      command = `node ${tempFilePath}`;
    } else if (language === "python") {
      fs.writeFileSync(tempPythonFilePath, code);
      command = `python3 ${tempPythonFilePath}`;
    } else if (language === "go") {
      fs.writeFileSync(tempGoFilePath, code);
      command = `go run ${tempGoFilePath}`;
    } else if (language === "c") {
      fs.writeFileSync(tempCFilePath, code);
      command = `gcc ${tempCFilePath} -o tempCode && ./tempCode`;
    } else if (language === "cpp") {
      fs.writeFileSync(tempCppFilePath, code);
      command = `g++ ${tempCppFilePath} -o tempCode && ./tempCode.cpp`;
    } else if (language === "java") {
      fs.writeFileSync(tempJavaFilePath, code);
      command = `javac ${tempJavaFilePath} && java tempCode`;
    } else if (language === "ruby") {
      fs.writeFileSync(tempRubyFilePath, code);
      command = `ruby ${tempRubyFilePath}`;
    } else if (language === "rust") {
      fs.writeFileSync(tempFilePath, code);
      command = `rustc ${tempFilePath} -o tempCode && ./tempCode`;
    } else {
      reject("Unsupported language");
      return;
    }

    exec(command, (err, stdout, stderr) => {
      if (err || stderr) {
        reject(err || stderr);
        return;
      }
      resolve(stdout);
    });
  });
};

module.exports = { executeCode };
