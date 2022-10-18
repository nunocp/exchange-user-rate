import express from "express";
import * as userController from "../controllers/userController";
import { authenticateRequest } from "../middlewares/authentication";

const router = express.Router();

// === User CRUD ===

// Create user
router.post("/", userController.createUser);

// Get user info
router.get("/", authenticateRequest, userController.getUser);

// Update user info
router.put("/", authenticateRequest, userController.updateUser);

// Delete user
router.delete("/", authenticateRequest, userController.deleteUser);

// === Login / Logout ===

// Login user
router.post("/login", userController.loginUser);

router.post("/token", userController.refreshAccessToken);

// logout DELETE
router.delete("/logout", userController.logoutUser);

export default router;
