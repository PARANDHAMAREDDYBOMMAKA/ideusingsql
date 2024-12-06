import React, { useState } from 'react';
import Editor from './components/Editor';
import axios from 'axios';

const App = () => {
  const [language, setLanguage] = useState('javascript'); 

  const handleExecute = async (code, language) => {
    try {
      const response = await axios.post('http://localhost:8000/api/code/execute', { code, language });
      return response.data.result;
    } catch (error) {
      throw new Error(error.response ? error.response.data.error : error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600">
      <div className="container mx-auto p-6">
        <h1 className="text-white text-4xl mb-6 text-center">Online Code Editor</h1>
        <div className="flex justify-center space-x-4 mb-4">
          {/* Language selector */}
          <select
            className="bg-white text-black p-2 rounded"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="go">Go</option>
            <option value="c">C</option>
            <option value="cpp">C++</option>
            <option value="java">Java</option>
            <option value="ruby">Ruby</option>
            <option value="rust">Rust</option>
          </select>
        </div>
        <Editor language={language} onExecute={handleExecute} />
      </div>
    </div>
  );
};

export default App;
