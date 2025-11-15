import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors"
import authRoutes from "./routes/auth.routes.js";
import startupRoutes from "./routes/startup.routes.js";
import eventRoutes from "./routes/event.routes.js";
import programRoutes from "./routes/program.routes.js";
import registerRoutes from "./routes/register.routes.js";
import portfolioRoutes from "./routes/portfolio.routes.js";
import eventRegistrationRoutes from "./routes/eventRegistration.routes.js";

const app = express();

app.use(
    cors({
        origin: process.env.CORS_ORIGIN,
        credentials: true,
    })
);

app.use(express.json({ limit: "20kb" })); // Helps in preventing DOS attacks
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser()); 

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/startups", startupRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/programs", programRoutes);
app.use("/api/register", registerRoutes);
app.use("/api/portfolio", portfolioRoutes);
app.use("/api/event-registrations", eventRegistrationRoutes); 

export { app };
