import 'dotenv/config';
import express from 'express';
import axios from 'axios';

const app = express();
const port = 5173;

const CLIENT_ID = process.env.DISCORD_CLIENT_ID;
const CLIENT_SECRET = process.env.DISCORD_CLIENT_SECRET;
const REDIRECT_URI = process.env.DISCORD_REDIRECT_URI;

if (!CLIENT_ID || !CLIENT_SECRET || !REDIRECT_URI) {
    console.error('Missing required environment variables. Check your .env file.');
    process.exit(1);
}

app.use(express.json());

app.get('/', (req, res) => {
    res.send(`
        <h1>Login with Discord</h1>
        <a href="https://discord.com/api/oauth2/authorize?client_id=1339215518841831544&redirect_uri=http://localhost:5173/auth/callback&response_type=code&scope=identify">
            Login with Discord
        </a>
    `);
});

app.get('/auth/callback', async (req, res) => {
    const { code } = req.query;

    if (!code) {
        return res.status(400).send('No code provided!');
    }

    try {
        const tokenResponse = await axios.post('https://discord.com/api/oauth2/token',
            new URLSearchParams({
                client_id: CLIENT_ID,
                client_secret: CLIENT_SECRET,
                grant_type: 'authorization_code',
                code,
                redirect_uri: REDIRECT_URI,
                scope: 'identify'
            }), {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            }
        );

        const { access_token: accessToken } = tokenResponse.data;

        const userResponse = await axios.get('https://discord.com/api/users/@me', {
            headers: { Authorization: `Bearer ${accessToken}` }
        });

        const { id, username, discriminator, email, avatar } = userResponse.data;

        res.send(`
            <h1>Login successful!</h1>
            <p>ID: ${id}</p>
            <p>Username: ${username}</p>
            <p>Discriminator: ${discriminator}</p>
            <p>Email: ${email || 'Not public'}</p>
            <img src="https://cdn.discordapp.com/avatars/${id}/${avatar}.png" alt="Avatar">
        `);
    } catch (error) {
        console.error(error.response?.data || error.message);
        res.status(500).send('An error occurred during login!');
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});