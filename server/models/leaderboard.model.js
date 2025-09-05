import mongoose from "mongoose";

const Schema = mongoose.Schema;

const leaderboardSchema = new Schema({
    name:{
        type: String,
        required: true,
    },
    time:{
        type: String,
        required: true,
    },
});

const Leaderboard = mongoose.model("Leaderboard",leaderboardSchema);

export default Leaderboard;