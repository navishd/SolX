import express from "express";
import {
  getUsers, deleteUser,
  getAdminProjects, updateProjectStatus,
  createSolution, updateSolution, deleteSolution
} from "../controllers/adminController.js";
import { protect, admin } from "../middleware/auth.js";

const router = express.Router();

router.use(protect, admin);

router.route("/users").get(getUsers);
router.route("/users/:id").delete(deleteUser);

router.route("/projects").get(getAdminProjects);
router.route("/projects/:id").put(updateProjectStatus);

router.route("/solutions").post(createSolution);
router.route("/solutions/:id").put(updateSolution).delete(deleteSolution);

export default router;
