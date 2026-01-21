import express from 'express';
import axios from 'axios';
import { SocksProxyAgent } from 'socks-proxy-agent';

const router = express.Router();

const torAgent = new SocksProxyAgent('socks5://tor:9050');

// Route GET /api/tor/users
router.get('/users', async (req, res) => {
    try {
        const response = await axios.get('https://randomuser.me/api/?results=10', {
            httpAgent: torAgent,
            httpsAgent: torAgent
        });

        res.json({ 
            result: true, 
            users: response.data.results 
        });

    } catch (error) {
        res.status(500).json({ 
            result: false, 
            error: "Impossible de communiquer via Tor. Vérifiez que le conteneur Tor est lancé." 
        });
    }
});

export default router;