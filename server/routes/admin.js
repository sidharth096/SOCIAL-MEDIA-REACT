import express from "express";
import { adminLogin,getAllUser,deleteUser,blockUnblock,searchUser } from "../controllers/admincontroller/admin.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/login", adminLogin);
router.get("/userList",verifyToken,getAllUser)
router.post("/deleteUser",verifyToken,deleteUser)
router.patch("/blockUnblock",verifyToken,blockUnblock)
router.post("/searchuser",searchUser)

export default router;
