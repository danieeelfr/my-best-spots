import express from 'express';
import cors from 'cors';
import routes from './routes/routes';
import path from 'path';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.use('/img', express.static(path.resolve(__dirname, '..', 'img', 'items')))
app.use('/shared', express.static(path.resolve(__dirname, '..', 'shared')))

app.listen(3333);
