import express from "express";
import { getProjects, createProject } from "../controllers/projectController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.route("/")
  .get(protect, getProjects)
  .post(protect, createProject);

export default router;
