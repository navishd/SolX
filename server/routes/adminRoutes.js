import express from "express";
import { protect, admin } from "../middleware/auth.js";
import {
  getStats,
  getAllUsers,
  deleteUser,
  getAllProjects,
  updateProjectStatus,
  createSolution,
  updateSolution,
  deleteSolution,
} from "../controllers/adminController.js";

const router = express.Router();

router.use(protect, admin); // All admin routes are protected

router.get("/stats", getStats);
router.get("/users", getAllUsers);
router.delete("/users/:id", deleteUser);
router.get("/projects", getAllProjects);
router.put("/projects/:id/status", updateProjectStatus);

// Solutions CRUD
router.post("/solutions", createSolution);
router.put("/solutions/:id", updateSolution);
router.delete("/solutions/:id", deleteSolution);

export default router;
