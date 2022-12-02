import { ObjectId } from "mongodb";
import { choiceSchema } from "../models/choice.model.js";
import { pollCollection, choiceCollection } from "../database/db.js";

export async function choiceSchemaValidation(req, res, next) {

    let { title, pollId } = req.body;

    if (!title || !pollId) {
        res.sendStatus(422);
    }

    const choice = {
        title,
        pollId
    };
  
    const { error } = choiceSchema.validate(choice, { abortEarly: true });
    if (error) {
        const errors = error.details.map((detail) => detail.message);
        return res.status(400).send(errors);
    }

    try {
        const question = await pollCollection.findOne({ _id: new ObjectId(choice.pollId) });
        if (!question) {
            return res.sendStatus(404);
        }

        const questionHaveSameTitle = await choiceCollection.findOne({ title: choice.title });
        if (questionHaveSameTitle) {
            return res.sendStatus(409);
        }

        const dateNow = new Date();
        const expireDate = new Date(question.expireAt);
        if (dateNow.getTime() >= expireDate.getTime()) {
            return res.sendStatus(403);
        }
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
  
    res.locals.choice = choice;

    next();
}