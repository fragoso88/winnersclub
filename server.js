const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

const PORT = process.env.PORT || 2700; // Use 5000 as a fallback for local testing
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection string
const mongoURI = 'mongodb+srv://fragoso:888888@cluster0.mongodb.net/betting?retryWrites=true&w=majority';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Define Bet Schema
const betSchema = new mongoose.Schema({
    date: String,
    event: String,
    match: String,
    selection: String,
    stake: String,
    odds: String,
    profitLoss: String,
    result: String,
});

const Bet = mongoose.model('Bet', betSchema);

// API Endpoints
app.get('/', (req, res) => {
    res.send('Welcome to the Betting Dashboard API!');
});

app.get('/api/bets', async (req, res) => {
    const bets = await Bet.find();
    res.json(bets);
});

app.post('/api/bets', async (req, res) => {
    const newBet = new Bet(req.body);
    await newBet.save();
    res.json(newBet);
});

app.post('/api/bets', async (req, res) => {
    try {
        const newBet = new Bet(req.body); // Parse and save incoming data
        await newBet.save();
        res.json(newBet); // Respond with the saved data as JSON
    } catch (error) {
        console.error('Error saving bet:', error);
        res.status(500).json({ error: 'Failed to save bet' });
    }
});
