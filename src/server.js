import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import helmet from 'helmet';
//!routes
import userRoutes from './routes/userRoutes.js';
import authRoutes from './routes/authRoutes.js';
import notesRoutes from './routes/notesRoutes.js';
//!middleware
import { logger } from './middleware/logger.js';
import { connectMongoDB } from './db/connectMongoDB.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';
import { errors } from 'celebrate';
import cookieParser from 'cookie-parser';


const app = express();
const PORT = process.env.PORT || 3000;

app.use(logger);
app.use(cors());
app.use(cookieParser());
app.use(helmet());

app.use((req, res, next) => {
  console.log(`Time: ${new Date().toLocaleString()}`);
  next();
});

app.use(notesRoutes);
app.use(authRoutes);
app.use(userRoutes);

app.use(
express.json({
    type: ['application/json', 'application/vnd.api+json'],
    limit: '100kb',
  }),
);
app.use(errors());
app.use(notFoundHandler);
app.use(errorHandler);

await connectMongoDB();


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
