import express from "express";
import cors from "cors";
import 'dotenv/config';
import pino from 'pino-http';
import helmet from "helmet";

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(helmet());
app.use(express.json());
app.use(cors());
app.use(
  pino({
    level: 'info',
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,
        translateTime: 'HH:MM:ss',
        ignore: 'pid,hostname',
        messageFormat: '{req.method} {req.url} {res.statusCode} - {responseTime}ms',
        hideObject: true,
      },
    },
  }),
);

app.use((req, res, next) => {
    console.log(`Time: ${new Date().toLocaleString()}`);
    next();
  });

// маршрут нотатки
app.get('/notes', (req, res) => {
  res.status(200).json({message: "Retrieved all notes"});
});

//маршрут айді для 1 нотатки
app.get('/notes/:noteId', (req, res) => {
  const { noteId } = req.params;
  res.status(200).json({ message: `Retrieved note with ID: ${noteId}` });
});

app.get('/test-error', () => {
  throw new Error('Simulated server error');
});

//обробник помилок
app.use((req, res) => {
  res.status(404).json({message: 'Route not found'});
});


//middleware для обробки помилок
app.use((err, req, res, next) => {
  console.error(err);

  const isProd = process.env.NODE_ENV === "production";

  res.status(500).json({
    message: isProd
      ? "Something went wrong. Please try again later."
      : err.message,
  });
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
