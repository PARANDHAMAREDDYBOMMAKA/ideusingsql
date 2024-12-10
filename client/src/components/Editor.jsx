// src/components/CodeEditor.jsx

import React, { useState, useEffect } from "react";
// import { LexicalComposer } from "@lexical/react/LexicalComposer";
// import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
// import { ContentEditable } from "@lexical/react/LexicalContentEditable";
// import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
// import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
// import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { Editor as MonacoEditor } from "@monaco-editor/react";
import { getBoilerplateCode } from "./utils/languageBoilerplate";
import editorMapping from "./utils/editorMapping.js";
import "react-quill/dist/quill.snow.css"; // If you plan to use Quill
import "tailwindcss/tailwind.css";
import clsx from "clsx";

// Lexical Theme Configuration (optional)
const lexicalTheme = {
  paragraph: "mb-2",
  text: {
    bold: "font-bold",
    italic: "italic",
    underline: "underline",
    // Add more text styles if needed
  },
  // Add more theme configurations if needed
};

// Lexical Editor Component
const LexicalEditor = ({ code, setCode }) => {
  const initialConfig = {
    namespace: "CodeEditor",
    theme: lexicalTheme,
    onError: (error) => {
      console.error(error);
    },
  };

  const onChange = (editorState) => {
    editorState.read(() => {
      const root = editorState.getRoot();
      const text = root.getTextContent();
      setCode(text);
    });
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <RichTextPlugin
        contentEditable={
          <ContentEditable className="min-h-[400px] p-2 border border-gray-300 rounded-lg focus:outline-none font-mono text-sm" />
        }
        placeholder={
          <div className="text-gray-500">Write your code here...</div>
        }
        ErrorBoundary={LexicalErrorBoundary}
      />
      <HistoryPlugin />
      <OnChangePlugin onChange={onChange} />
    </LexicalComposer>
  );
};

// Monaco Editor Wrapper Component
const MonacoEditorWrapper = ({ code, setCode, language }) => {
  const handleEditorChange = (value) => {
    setCode(value || "");
  };

  return (
    <MonacoEditor
      height="400px"
      language={language || "javascript"}
      theme="vs-dark"
      value={code}
      onChange={handleEditorChange}
      options={{
        fontSize: 14,
        minimap: { enabled: false },
        automaticLayout: true,
        wordWrap: "on",
      }}
    />
  );
};

// CodeEditor Main Component
const CodeEditor = ({ language, onExecute }) => {
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");

  // Load boilerplate code when language changes
  useEffect(() => {
    const boilerplate = getBoilerplateCode(language);
    setCode(boilerplate);
  }, [language]);

  const handleExecute = async () => {
    try {
      const result = await onExecute(code, language);
      setOutput(result);
    } catch (error) {
      setOutput(`Error: ${error.message}`);
    }
  };

  // Determine which editor to use based on language
  const currentEditor = editorMapping[language] || "monaco";

  return (
    <div className="flex flex-col space-y-4 p-4">
      {/* Editor Section */}
      <div className="w-full bg-white p-4 rounded-lg shadow-lg bg-opacity-40 backdrop-blur-xl">
        {currentEditor === "monaco" && (
          <MonacoEditorWrapper
            code={code}
            setCode={setCode}
            language={language}
          />
        )}
        {currentEditor === "lexical" && (
          <LexicalEditor code={code} setCode={setCode} />
        )}
        {/* Add more editors here if needed */}
        <div className="flex justify-end mt-4">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
            onClick={handleExecute}
          >
            Execute
          </button>
        </div>
      </div>

      {/* Output Section */}
      <div className="w-full bg-gray-900 text-white p-4 rounded-lg shadow-lg">
        <h2 className="text-xl mb-4">Output:</h2>
        <pre className="overflow-auto max-h-[400px] whitespace-pre-wrap break-words">
          {output}
        </pre>
      </div>
    </div>
  );
};

export default CodeEditor;
