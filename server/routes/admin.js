import express from "express";
import { adminLogin,getAllUser,deleteUser,blockUnblock,searchUser } from "../controllers/admincontroller/admin.js";

const router = express.Router();

router.post("/login", adminLogin);
router.get("/userList",getAllUser)
router.post("/deleteUser", deleteUser)
router.patch("/blockUnblock", blockUnblock)
router.post("/searchuser",searchUser)

export default router;
