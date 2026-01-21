import express from 'express';
import axios from 'axios';
import { SocksProxyAgent } from 'socks-proxy-agent';

const router = express.Router();

const proxyUrl = process.env.TOR_PROXY_URL || 'socks5://tor:9050';
const torAgent = new SocksProxyAgent(proxyUrl);

router.get('/users', async (req, res) => {
    try {        
        const response = await axios.get('https://randomuser.me/api/?results=5', {
            httpAgent: torAgent,
            httpsAgent: torAgent
        });

        res.json({ result: true, users: response.data.results, source: 'Tor Network' });

    } catch (error) {
        res.status(500).json({ 
            result: false, 
            error: "Erreur Tor. Vérifiez que le conteneur 'tor' est lancé." 
        });
    }
});

export default router;