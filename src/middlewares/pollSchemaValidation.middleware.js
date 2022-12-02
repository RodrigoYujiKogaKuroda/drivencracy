import { pollSchema } from "../models/poll.model.js";

export function pollSchemaValidation(req, res, next) {

    let { title, expireAt } = req.body;

    if (!title) {
        res.sendStatus(422);
    }

    if (!expireAt) {
        const date = new Date();
        console.log(date);
        date.setDate(date.getDate() + 30);

        console.log(date);
        expireAt = date;
    }

    const question = {
        title,
        expireAt
    };
  
    const { error } = pollSchema.validate(question, { abortEarly: true });
  
    if (error) {
        const errors = error.details.map((detail) => detail.message);
        return res.status(400).send(errors);
    }
  
    res.locals.question = question;

    next();
}