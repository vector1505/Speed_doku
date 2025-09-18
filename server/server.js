import express from 'express';
const app = express();

import cors from 'cors';
app.use(cors());
app.use(express.json());

import dotenv from 'dotenv';
dotenv.config({ path: "../.env" });

// Allow overriding port via env, default to 3000
const PORT = process.env.PORT || 3000;

import mongoose from 'mongoose';
import routes from './routes/leaderRoutes.js'
import { errorHandler } from './middleware/responseHandlers.js';

const dbURI = process.env.DB_URI;
mongoose
    .connect(dbURI)
    .then(() => {
        const server = app.listen(PORT, () => {
            console.log(`Connected. Server listening on port ${PORT}`);
        });

        // Graceful shutdown to free the port on Ctrl+C / SIGTERM
        const graceful = (signal) => {
            console.log(`\nReceived ${signal}. Shutting down gracefully...`);
            server.close(() => {
                console.log('HTTP server closed.');
                process.exit(0);
            });
        };
        process.on('SIGINT', graceful.bind(null, 'SIGINT'));
        process.on('SIGTERM', graceful.bind(null, 'SIGTERM'));
    })
    .catch((err) => {
        console.log("Error connecting to DB:", err);
    });


app.get('/', (req, res) => {
    res.send({success:"true"});
})

app.use('/', routes);

// security middleware
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';

app.use(helmet());
app.use(mongoSanitize());


// 404 handler
app.use((req, res) => {
    res.status(404).json({ success: false, message: "Not Found" });
});

// Common error handler
app.use(errorHandler);
