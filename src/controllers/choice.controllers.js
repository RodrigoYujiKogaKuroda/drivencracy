import { ObjectId } from "mongodb";
import { pollCollection, choiceCollection } from "../database/db.js";

export async function postAnswer (req, res) {

    const choice = res.locals.choice;

    try {
        await choiceCollection.insertOne(choice);
        res.sendStatus(201);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}

export async function getAnswer (req, res) {

    const pollId = req.params.id;

    try {
        const question = await pollCollection.findOne({ _id: new ObjectId(pollId) });
        if (!question) {
          return res.sendStatus(404);
        }

        const answers = await choiceCollection.find({ pollId: pollId }).toArray();
        res.status(200).send(answers);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }

}