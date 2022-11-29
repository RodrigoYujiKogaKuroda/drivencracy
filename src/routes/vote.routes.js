import { Router } from "express";
import { postVote, getVotes } from "../controllers/vote.controllers.js";
import { voteSchemaValidation } from "../middlewares/voteSchemaValidation.middleware.js";

const router = Router();

router.post("/choice/:id/vote", voteSchemaValidation, postVote);
router.get("/poll/:id/result", getVotes);

export default router;