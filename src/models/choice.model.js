import Joi from "joi";

export const choiceSchema = joi.object({
    title: Joi.string().required(),
	pollId: Joi.string().required()
});