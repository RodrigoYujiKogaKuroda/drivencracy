import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import pollRoutes from "./routes/poll.routes.js";
import choiceRoutes from "./routes/choice.routes.js";
import voteRoutes from "./routes/vote.routes.js";

const app = express();

app.use(express.json());
app.use(cors());
app.use(pollRoutes);
app.use(choiceRoutes);
app.use(voteRoutes);

app.listen(process.env.PORT, () => console.log("Server running on port " + process.env.PORT));