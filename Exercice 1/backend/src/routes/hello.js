import express from 'express';

const router = express.Router();

// Get /hello
router.get('/hello', (req, res) => {
    res.json({ message: 'Hello World' });
});

export default router;