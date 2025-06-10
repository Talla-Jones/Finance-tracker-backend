// server.js

require('dotenv').config();        // 1. Load env vars
const express = require('express'); // 2. Import express
const cors = require('cors');       // 3. Optional but useful
const db = require('./config/db');  // 4. Import DB
const authRoutes = require('./routes/auth'); // 5. 
// const protectedRoutes = require('./routes/
const protectedRoutes = require('./routes/protected');

const transactionRoutes = require('./routes/transactions');


const app = express();             // ✅ 6. Initialize app

// Middleware
app.use(cors());
app.use(express.json());
app.use('/api/protected', protectedRoutes);


// Routes
app.use('/api/auth', authRoutes);  // Use routes AFTER app is defined

app.use('/api/transactions', transactionRoutes);
// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
