import { Router } from "express";

// import userRoutes from "./user";
import authRoutes from "./auth";
const router = Router();

// router.use("/users", userRoutes);
router.use("/api/user", authRoutes);
export default router;
