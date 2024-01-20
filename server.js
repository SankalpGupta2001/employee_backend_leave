const express = require('express');
const router = express.Router();
const userControllers = require("./controllers/userControllers");
const leaveControllers = require("./controllers/leaveControllers");
require('dotenv').config();
const connectDB = require('./config/db');
const cors = require('cors');
const path=require("path");
const app = express();
app.use(cors({ origin: 'http://localhost:3000' }));

const PORT = process.env.PORT || 5000;

app.use(express.json());

connectDB();


app.use('/api', userControllers);
app.use('/api', leaveControllers);

app.use(express.static(path.join(__dirname,'./build')));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
