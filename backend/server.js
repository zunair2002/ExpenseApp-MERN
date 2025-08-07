require('dotenv').config();
const express = require("express");
const connectionDB = require('./config/connectionDB');
const cors = require('cors'); 
const app = express();

// DB connection
connectionDB();

// Middlewares
app.use(cors());
app.use(express.json()); 

// Add user route
app.use('/api/v1/user', require('./routes/userroutes'));
//transaction route
app.use('/api/v1/transaction', require('./routes/transactionroute'));

// Listen for connections
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});