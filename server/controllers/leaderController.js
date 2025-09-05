import express from "express"
import Leaderboard from "../models/leaderboard.model.js"

const get_index = (req, res) => {
    Leaderboard.find().sort({ time: 1 })
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            res.status(500).json({ error: "Failed to fetch leaderboard", details: err });
        });
};

const create = (req, res) => {
    const leader = new Leaderboard(req.body);
    leader.save()
        .then((result) => {
            res.status(201).json(result);
        })
        .catch((err) => {
            res.status(400).json({ error: "Failed to add entry", details: err });
        });
};

const test = (req, res) => {
    const leader = new Leaderboard({
        name: "Vijay",
        time: "00:20"
    });
    leader.save()
        .then((result) => {
            res.status(201).json(result);
        })
        .catch((err) => {
            res.status(400).json({ error: "Failed to add test entry", details: err });
        });
};

export {get_index, create, test}