import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { requireRole } from "../middlewares/role.middleware.js";
import {
    getRegistrations,
    registerEvent,
    getRegistrationsByEmail,
} from "../controllers/eventRegistrations.controller.js";

const router = Router();

// Public route - register for events
router.post("/", registerEvent);

// Route to get registrations by email
router.get("/email/:email", getRegistrationsByEmail);

// Protected routes - require admin authentication to view registrations
router.use(authMiddleware);
router.use(requireRole("admin"));

router.get("/:eventId", getRegistrations);

export default router;