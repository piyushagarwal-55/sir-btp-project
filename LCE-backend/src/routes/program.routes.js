import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { requireRole } from "../middlewares/role.middleware.js";
import {
    getPrograms,
    getProgram,
    addProgram,
    updateProgram,
    deleteProgram,
} from "../controllers/program.controller.js";

const router = Router();

// Public routes - anyone can view programs
router.get("/", getPrograms);
router.get("/:id", getProgram);

// Protected routes - require admin authentication
router.use(authMiddleware);
router.use(requireRole("admin"));

router.post("/", addProgram);
router.put("/:id", updateProgram);
router.delete("/:id", deleteProgram);

export default router;