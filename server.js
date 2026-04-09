require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');

const chatRoutes = require('./routes/chat');

const app = express();
const PORT = process.env.PORT || 3000

app.use(morgan('dev'));
app.use(express.json());
app.use(cors());
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100, 
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: 'Too many requests, please try again later.' }
});

app.use('/api', limiter);
app.use('/api', chatRoutes);

app.get('/', (req, res) => {
    res.json({ 
        message: 'Personality-Driven Career Chatbot is running.'
    });
});

app.use((req, res, next) => {
    res.status(404).json({ error: 'Route not found' });
});
app.use((err, req, res, next) => {
    console.error('Unhandled Server Error:', err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(PORT, () => {
    console.log(` Chatbot Backend Initialized at port ${PORT}`);
});
