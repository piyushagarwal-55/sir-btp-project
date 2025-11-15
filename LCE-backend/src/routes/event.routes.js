import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { requireRole } from "../middlewares/role.middleware.js";
import {
    getEvents,
    addEvent,
    updateEvent,
} from "../controllers/event.controller.js";

const router = Router();

// Public route - anyone can view events
router.get("/", getEvents);

// Protected routes - require admin authentication
router.use(authMiddleware);
router.use(requireRole("admin"));

router.post("/", addEvent);
router.put("/:id", updateEvent);

export default router;