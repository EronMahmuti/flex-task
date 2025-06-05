import express, { Express } from 'express';
import cors from 'cors';
import jobRoutes from './routes/jobRoutes';
import { errorHandler } from './middleware/errorHandler';

const app: Express = express();

app.use(cors({
    origin: 'http://localhost:5173', // Replace with your frontend's actual URL/port
    credentials: true, // Allow cookies to be sent
  }));

app.use(express.json());
app.use('/api/jobs', jobRoutes);
app.use(errorHandler);


export default app;