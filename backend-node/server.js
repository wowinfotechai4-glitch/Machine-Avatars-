require('dotenv').config();

const express = require('express');
const cors = require('cors');

const app = express();

require('./config/db');

app.use(cors());
app.use(express.json());

const UserRoutes = require('./routes/UserRoutes');

app.use('/api/user', UserRoutes);

app.get('/', (req, res) => {
  res.send("Server running");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});

const dataRoutes = require("./routes/dataRoutes");

app.use("/api/data", dataRoutes);

const searchRoutes = require("./routes/searchRoutes");

app.use("/api/search", searchRoutes);
console.log("SearchRoutes:", searchRoutes);

const chatRoutes = require("./routes/chatRoutes");

app.use("/api/chat", chatRoutes);

const blogRoutes = require("./routes/blogRoutes");

app.use("/api/blogs", blogRoutes);