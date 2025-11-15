import { Router } from "express";
import {
    registerStartup,
} from "../controllers/register.controller.js";

const router = Router();

// Public registration endpoint
router.post("/", registerStartup);

export default router;