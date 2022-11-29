import { voteCollection } from "../database/db.js";
import { ObjectId } from "mongodb";

export async function postVote (req, res) {
    try {

    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}

export async function getVotes (req, res) {
    try {
        
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}