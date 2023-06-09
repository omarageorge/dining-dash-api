import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';

const app = express();

/* Configs */
dotenv.config();

/* Middleware */
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.send('Server: OK');
});

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));
