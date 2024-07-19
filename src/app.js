const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const morgan = require('morgan');
const { errorHandler } = require('./middlewares/error.middlewares.js');

const userRouter = require('./routes/auth/user.routes.js');
const blogRouter = require('./routes/blog.routes.js');
const likeRouter = require('./routes/like.routes.js');

const app = express();
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || '*',
    credentials: true,
  })
);

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

app.use(cookieParser());

// Set security headers with Helmet middleware
app.use(helmet());

// Log requests with Morgan middleware (use 'combined' format for production)
app.use(morgan('dev'));

app.use('/api/v1/users', userRouter);
app.use('/api/v1/blogs', blogRouter);
app.use('/api/v1/likes', likeRouter);

app.use(errorHandler);

module.exports = { app };
