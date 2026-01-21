import express from 'express';
import cors from 'cors';
import torRouter from './routes/tor.js';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.use('/api/tor', torRouter);

app.listen(PORT, () => {
    console.log(`Backend Tor démarré sur http://localhost:${PORT}`);
});