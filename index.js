const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { route } = require('./routes');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const corsOptions = {
  origin: process.env.CORS_ORIGIN || '*', 
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
};
app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to MemoryNest API!' });
});

app.use('/api/v1', route)

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
