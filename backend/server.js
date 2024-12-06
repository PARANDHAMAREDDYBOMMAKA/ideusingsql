const express = require('express');
const cors = require('cors');
const { initDatabase } = require('./database');
const codeRoutes = require('./api/codeRoutes');

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

// Initialize database
initDatabase();

// API Routes
app.use('/api/code', codeRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
