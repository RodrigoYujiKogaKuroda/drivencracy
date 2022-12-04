import { ObjectId } from "mongodb";
import { voteSchema } from "../models/vote.model.js";
import { choiceCollection, pollCollection } from "../database/db.js";

export async function voteSchemaValidation(req, res, next) {

    const choiceId = req.params.id;

    try {
        const choice = await choiceCollection.findOne({ _id: new ObjectId(choiceId) });

        if (!choice) {
            return res.sendStatus(404);
        }

        const dateNow = new Date();
        const question = await pollCollection.findOne({ _id: new ObjectId(choice.pollId) });
        const expireDate = new Date(question.expireAt);
        if (dateNow.getTime() >= expireDate.getTime()) {
            return res.sendStatus(403);
        }

        const vote = {
            createdAt: dateNow,
            choiceId: choice
        }

        const { error } = voteSchema.validate(vote, { abortEarly: true });
        if (error) {
            const errors = error.details.map((detail) => detail.message);
            return res.status(400).send(errors);
        }

        res.locals.vote = vote;
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }

    next();
}