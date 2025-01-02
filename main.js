const express = require('express');
const cors = require('cors');
const db_connect = require(`./src/database/connect`)
const app = express();
const connect = db_connect();
const GeminiRoutes = require('./src/routes/gemini/GeminiRoutes');
const UserRoutes = require('./src/routes/user/UserRoutes');

app.use(cors({ origin: 'http://127.0.0.1:5500' }))
app.use(express.json());
app.use('/api', GeminiRoutes);
app.use('/api', UserRoutes)


app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
