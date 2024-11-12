import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import notFound from './app/middlewares/notFound';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import router from './app/routes';

const app: Application = express();
//const port = 3000

app.use(express.json());
app.use(express.urlencoded());

const allowedOrigins = ['https://safaresidency.com', 'https://www.safaresidency.com', 'http://localhost:5173'];

const corsOptions: cors.CorsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
// app.use(cors({ origin: ['*'], credentials: true}))
// app.use(cors({ origin: ['https://safaresidency.com', 'http://localhost:5173'], credentials: true}))

//  application routes
app.use('/api', router)

app.get('/', (req: Request, res: Response) => {
  res.send("Hello from safa!!");
});

app.use(globalErrorHandler)
app.use(notFound)

export default app;
