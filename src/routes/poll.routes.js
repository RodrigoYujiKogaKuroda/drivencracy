import { Router } from "express";
import { postQuestion, getQuestions } from "../controllers/poll.controllers.js";
import { pollSchemaValidation } from "../middlewares/pollSchemaValidation.middleware.js";

const router = Router();

router.post("/poll", pollSchemaValidation, postQuestion);
router.get("/poll", getQuestions);

export default router;