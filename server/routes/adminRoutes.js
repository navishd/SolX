import express from "express";
import { protect, admin } from "../middleware/auth.js";
import {
  getStats,
  getAllUsers,
  deleteUser,
  getAllProjects,
  updateProjectStatus,
} from "../controllers/adminController.js";

const router = express.Router();

router.use(protect, admin); // All admin routes are protected

router.get("/stats", getStats);
router.get("/users", getAllUsers);
router.delete("/users/:id", deleteUser);
router.get("/projects", getAllProjects);
router.put("/projects/:id/status", updateProjectStatus);

export default router;
