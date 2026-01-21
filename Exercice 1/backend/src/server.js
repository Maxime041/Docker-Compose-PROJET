import express from 'express';
import cors from 'cors';
import helloRouter from './routes/hello.js'; 

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.use('/api', helloRouter);

app.listen(PORT, () => {
    console.log(`Backend démarré sur http://localhost:${PORT}`);
});