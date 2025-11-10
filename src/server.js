import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import helmet from 'helmet';
import notesRoutes from './routes/notesRoutes.js';
import { logger } from './middleware/logger.js';
import {connectMongoDB} from './db/connectMongoDB.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';


const app = express();
const PORT = process.env.PORT ?? 3000;
app.use(logger);
app.use(
  express.json({
    type: ['application/json', 'application/vnd.api+json'],
    limit: '100kb',
  }),
);
app.use(helmet());
app.use(cors());

app.use((req, res, next) => {
  console.log(`Time: ${new Date().toLocaleString()}`);
  next();
});

// ...маршрути
app.use(notesRoutes);

//обробник помилок 404
app.use(notFoundHandler);

//middleware для обробки помилок (500)
app.use(errorHandler);

//мого ДБ підключення 
await connectMongoDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
