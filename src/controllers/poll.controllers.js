import { pollCollection } from "../database/db.js";
import { ObjectId } from "mongodb";

export async function postQuestion (req, res) {
    try {

    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}

export async function getQuestions (req, res) {
    try {
        
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}