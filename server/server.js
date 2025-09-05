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

const dbURI = process.env.DB_URI;
mongoose.connect(dbURI).then((result) => {
    app.listen(PORT);
    console.log("Connected");
}).catch((err) => {
    console.log("Chud gaye guru: ", err);
})


app.get('/', (req, res) => {
    res.send({success:"true"});
})

app.use('/', routes);

app.use((req, res) => {
    res.send({success:"false", message:"Im going back to 505"});
});