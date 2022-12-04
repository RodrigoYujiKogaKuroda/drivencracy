import Joi from "joi";

export const voteSchema = Joi.object({
    createdAt: Joi.date().required(), 
	choiceId: Joi.string().min(24).max(24).required()
});