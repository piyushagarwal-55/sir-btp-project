import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { requireRole } from "../middlewares/role.middleware.js";
import {
    addStartup,
    getStartups,
    updateStartup,
    deleteStartup,
} from "../controllers/portfolio.controller.js";

const router = Router();

// Public route - view portfolio
router.get("/", getStartups);

// Protected routes - require admin authentication
router.use(authMiddleware);
router.use(requireRole("admin"));

router.post("/", addStartup);
router.put("/:id", updateStartup);
router.delete("/:id", deleteStartup);

export default router;