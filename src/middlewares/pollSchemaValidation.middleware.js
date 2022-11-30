import { pollSchema } from "../models/poll.model.js";

export function pollSchemaValidation(req, res, next) {

    const now = new Date;

    const { title, expireAt } = req.body;

    if (!title) {
        res.sendStatus(422);
    }

    if (!expireAt) {
        dateNow = now.getDate();
        monthNow = now.getMonth() + 1;
        yearNow = now.getFullYear();

        if (monthNow > 13) {
            monthNow = monthNow - 12;
            yearNow++;
        }

        expireAt = `${yearNow}-${MonthNow}-${dateNow} ${now.getHours()}:${now.getMinutes()}`;
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
  
    next();
}