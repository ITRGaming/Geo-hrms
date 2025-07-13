// geohrms-monorepo/hrms-backend/index.js

const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client'); // Import Prisma Client

const app = express();
const prisma = new PrismaClient(); // Initialize Prisma Client

// Middleware to parse JSON request bodies
app.use(express.json());
app.use(cors());

// Basic route for testing the backend
app.get('/', (req, res) => {
    res.send('Hello from the HRMS Backend!');
});

// Example route to fetch some data using Prisma
// (You'll need to have a model defined in prisma/schema.prisma and some data)
app.get('/users', async (req, res) => {
    try {
    const users = await prisma.user.findMany(); // Assuming you have a 'User' model
    res.json(users);
} catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).send('Error fetching users');
}
});

// Define the port your server will listen on
// Use process.env.PORT to allow Docker to inject it, or default to 5000
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
    console.log(`HRMS Backend server running on http://localhost:${PORT}`);
    console.log('Press Ctrl+C to stop');
});

// Handle graceful shutdown (optional but good practice for Docker)
process.on('SIGTERM', async () => {
    console.log('SIGTERM signal received: closing HTTP server');
    await prisma.$disconnect(); // Disconnect Prisma Client gracefully
    process.exit(0);
});

process.on('SIGINT', async () => {
    console.log('SIGINT signal received: closing HTTP server');
    await prisma.$disconnect(); // Disconnect Prisma Client gracefully
    process.exit(0);
});