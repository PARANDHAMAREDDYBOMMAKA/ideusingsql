import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import 'tailwindcss/tailwind.css';

const CodeEditor = ({ language, onExecute }) => {
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');

  const handleExecute = async () => {
    try {
      const result = await onExecute(code, language);
      setOutput(result);
    } catch (error) {
      setOutput(`Error: ${error.message}`);
    }
  };

  return (
    <div className="flex space-x-4 p-4">
      {/* Left side: Code editor */}
      <div className="w-1/2 bg-white p-4 rounded-lg shadow-lg bg-opacity-40 backdrop-blur-xl">
        <Editor
          height="400px"
          language={language || 'javascript'} // Dynamically set the language
          theme="vs-dark"
          value={code}
          onChange={(value) => setCode(value)}
          options={{
            fontSize: 14,
            minimap: { enabled: false },
            automaticLayout: true,
          }}
        />
        <div className="flex justify-between mt-4">
          <button className="bg-blue-500 text-white p-2 rounded" onClick={handleExecute}>
            Execute
          </button>
        </div>
      </div>

      {/* Right side: Output */}
      <div className="w-1/2 bg-gray-900 text-white p-4 rounded-lg shadow-lg">
        <h2 className="text-xl mb-4">Output:</h2>
        <pre>{output}</pre>
      </div>
    </div>
  );
};

export default CodeEditor;
