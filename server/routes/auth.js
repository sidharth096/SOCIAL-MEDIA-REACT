import express from "express";
import { login } from "../controllers/usercontroller/auth.js";

const router = express.Router();

router.post("/login", login);

export default router;
