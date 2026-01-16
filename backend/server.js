const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/error');

// Load env vars
dotenv.config({ path: './.env' });

// Connect to database
connectDB();

// Route files
const auth = require('./routes/auth');
const users = require('./routes/users');
const courses = require('./routes/courses');
const modules = require('./routes/modules');
const lessons = require('./routes/lessons');
const enrollments = require('./routes/enrollments');
const categories = require('./routes/categories');
const files = require('./routes/files');
const certificates = require('./routes/certificates');
const adverts = require('./routes/adverts');
const schedules = require('./routes/schedules');

const app = express();

// Body parser
app.use(express.json());

// Enable CORS
const defaultOrigins = ["https://tesbinn-lms-frontend.vercel.app", "http://localhost:8081", "http://172.16.0.2:8081"];
const allowedOriginsString = process.env.ALLOWED_ORIGINS || process.env.FRONTEND_URL || defaultOrigins.join(",");
const allowedOrigins = allowedOriginsString.split(",").map((origin) => origin.trim()).filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }
      callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);


// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/v1/health', (req, res) => {
  res.status(200).json({ success: true, data: { status: 'ok' } });
});

app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
    environment: process.env.NODE_ENV || 'unknown',
  });
});

// Mount routers
app.use('/api/v1/auth', auth);
app.use('/api/v1/users', users);
app.use('/api/v1/courses', courses);
app.use('/api/v1/modules', modules);
app.use('/api/v1/lessons', lessons);
app.use('/api/v1/enrollments', enrollments);
app.use('/api/v1/categories', categories);
app.use('/api/v1/files', files);
app.use('/api/v1/certificates', certificates);
app.use('/api/v1/adverts', adverts);
app.use('/api/v1/schedules', schedules);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  // Close server & exit process
  server.close(() => process.exit(1));
});
