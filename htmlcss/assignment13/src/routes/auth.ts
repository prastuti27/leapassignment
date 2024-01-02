import { Router } from "express";

import { logIn, signUp } from "../controller/auth";
const router = Router();
router.post("/signUp", signUp);
router.post("/login", logIn);
export default router;
