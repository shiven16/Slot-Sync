require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(bodyParser.json());

// Authentication routes
app.post('/api/auth/register', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await prisma.user.create({
            data: { email, password }
        });
        res.json({ message: 'User registered successfully!', user });
    } catch (err) {
        res.status(500).json({ error: 'User already exists or error occurred' });
    }
});