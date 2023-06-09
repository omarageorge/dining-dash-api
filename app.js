import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import connectDB from './config/database.js';
import errorHandler from './middleware/error.js';
import authRouter from './routes/authRoutes.js';
import restaurantRouter from './routes/restaurantRoutes.js';

const app = express();

/* Init */
dotenv.config(); // Load environment variables
connectDB(); // Connect to MongoDB

/* Middleware */
app.use(morgan('dev'));
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/static', express.static('public'));

app.use('/api/v1/auth', authRouter); // Auth Endpoints
app.use('/api/v1/restaurants', restaurantRouter); // Restaurant Endpoints

app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));
