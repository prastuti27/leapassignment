import { Router } from "express";

import { signUp } from "../controller/auth";
const router = Router();
router.post("/signUp", signUp);
export default router;