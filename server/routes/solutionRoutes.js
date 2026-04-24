import express from "express";
import { getSolutions, getSolutionById } from "../controllers/solutionController.js";

const router = express.Router();

router.route("/").get(getSolutions);
router.route("/:id").get(getSolutionById);

export default router;
