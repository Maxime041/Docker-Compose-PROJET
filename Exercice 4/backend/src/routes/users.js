import express from 'express';
import User from '../models/User.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const users = await User.findAll();
        res.json({ result: true, users, source: 'PostgreSQL' });
    } catch (error) {
        res.status(500).json({ result: false, error: error.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const { username, password } = req.body;
        const newUser = await User.create({ username, password });
        res.status(201).json({ result: true, user: newUser });
    } catch (error) {
        res.status(500).json({ result: false, error: error.message });
    }
});

export default router;