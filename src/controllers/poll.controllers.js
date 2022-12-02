import { pollCollection } from "../database/db.js";

export async function postQuestion (req, res) {

    const question = res.locals.question;

    try {
        await pollCollection.insertOne(question);
        res.sendStatus(201);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}

export async function getQuestions (req, res) {

    try {
        const questions = await pollCollection.find().toArray();
        res.send({ questions });
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }

}