import express from 'express';
const app = express();
const PORT = 3000;

import cors from 'cors';
app.use(cors());
app.use(express.json());

import dotenv from 'dotenv';
dotenv.config({
    path: "../.env",
})

import mongoose from 'mongoose';
import routes from './routes/leaderRoutes.js'
import { errorHandler } from './middleware/responseHandlers.js';

const dbURI = process.env.DB_URI;
mongoose.connect(dbURI).then((result) => {
    app.listen(PORT);
    console.log("Connected");
}).catch((err) => {
    console.log("Error: ", err);
})


app.get('/', (req, res) => {
    res.send({success:"true"});
})

app.use('/', routes);


// 404 handler
app.use((req, res) => {
    res.status(404).json({ success: false, message: "Not Found" });
});

// Common error handler
app.use(errorHandler);
