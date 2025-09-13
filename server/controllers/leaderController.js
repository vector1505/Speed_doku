
import express from "express";
import Leaderboard from "../models/leaderboard.model.js";
import { sendResponse } from "../middleware/responseHandlers.js";

const get_index = (req, res) => {
    Leaderboard.find()
        .then((result) => {
            sendResponse(res, result, "Leaderboard fetched");
        })
        .catch((err) => {
            // Pass error to error handler
            err.message = "Failed to fetch leaderboard";
            err.status = 500;
            next(err);
        });
};

const create = (req, res) => {
    const leader = new Leaderboard(req.body);
    leader.save()
        .then((result) => {
            sendResponse(res, result, "Entry added", 201);
        })
        .catch((err) => {
            err.message = "Failed to add entry";
            err.status = 400;
            next(err);
        });
};

const test = (req, res) => {
    const leader = new Leaderboard({
        name: "Vijay",
        time: "00:20"
    });
    leader.save()
        .then((result) => {
            sendResponse(res, result, "Test entry added", 201);
        })
        .catch((err) => {
            err.message = "Failed to add test entry";
            err.status = 400;
            next(err);
        });
};

export {get_index, create, test}