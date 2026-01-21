import express from 'express';
import cors from 'cors';
import sequelize from './config/database.js';
import usersRouter from './routes/users.js'; 

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.use('/api/users', usersRouter);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ result: false, error: err.message });
});


sequelize.sync().then(() => {
    console.log("Base de données synchronisée.");
    app.listen(PORT, () => {
        console.log(`Backend démarré sur http://localhost:${PORT}`);
    });
});