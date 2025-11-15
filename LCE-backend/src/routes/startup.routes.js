import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { requireRole } from "../middlewares/role.middleware.js";
import {
    updateStartup,
    getStartupList,
    approveStartup,
    rejectStartup,
    getCurrentStartup,
} from "../controllers/startup.controller.js";

const router = Router();

// Protected routes - require authentication
router.use(authMiddleware);

// Get startup by founder email - accessible by founder and admin
router.get("/current", getCurrentStartup);

// Update startup - only by founder
router.put("/:id", requireRole("founder"), updateStartup);

// Admin only routes
router.get("/", requireRole("admin"), getStartupList);
router.put("/approve/:id", requireRole("admin"), approveStartup);
router.put("/reject/:id", requireRole("admin"), rejectStartup);

export default router;