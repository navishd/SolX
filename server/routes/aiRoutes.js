import express from "express";
import { suggestSolution } from "../controllers/aiController.js";

const router = express.Router();

router.post("/suggest", suggestSolution);

export default router;
