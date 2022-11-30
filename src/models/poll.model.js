import Joi from "joi";

export const pollSchema = joi.object({
    title: Joi.string().required(),
	expireAt: Joi.date().format("YYYY-MM-DD HH:mm").required()
});