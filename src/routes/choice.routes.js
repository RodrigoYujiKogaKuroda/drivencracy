import { Router } from "express";
import { postAnswer, getAnswer } from "../controllers/choice.controllers.js";
import { choiceSchemaValidation } from "../middlewares/choiceSchemaValidation.middleware.js";

const router = Router();

router.post("/choice", choiceSchemaValidation, postAnswer);
router.get("/poll/:id/choice", getAnswer);

export default router;