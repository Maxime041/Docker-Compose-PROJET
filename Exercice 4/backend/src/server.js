import express from 'express';
import cors from 'cors';
import sequelize from './config/database.js';
import torRouter from './routes/tor.js';
import dbRouter from './routes/users.js';

const app = express();
const PORT = process.env.PORT_BACKEND || 5000;

app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:3000' }));
app.use(express.json());

app.use('/api/tor', torRouter);     
app.use('/api/database', dbRouter);

const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();

        app.listen(PORT, () => {
            console.log(`Backend démarré sur le port ${PORT}`);
        });

    } catch (error) {
        console.error('Erreur critique:', error);
    }
};

start();