import { NextFunction, Request, Response } from "express";
import * as userService from "../services/userService";

// Register user
export async function createUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    res.json(await userService.createUser(req.body));
  } catch (err: any) {
    console.error("Error while creating user:\n", err.message);
    next(err);
  }
}

// Login user
export async function loginUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    res.json(await userService.loginUser(req.body));
  } catch (err: any) {
    console.error("Error while logging user:\n", err.message);
    next(err);
  }
}

// Logout user
export async function logoutUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    res.json(await userService.logoutUser(req.body));
  } catch (err: any) {
    console.error("Error while logging out user:\n", err.message);
    next(err);
  }
}

// Get info about user
export async function getUser(req: Request, res: Response, next: NextFunction) {
  try {
    res.json(await userService.getUser(req.body));
  } catch (err: any) {
    console.error("Error while getting user info:\n", err.message);
    next(err);
  }
}

// Update user info
export async function updateUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    res.json(await userService.updateUser(req.body));
  } catch (err: any) {
    console.error("Error while updating user info:\n", err.message);
    next(err);
  }
}

// Get new jwt token to keep user connected
export async function refreshAccessToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    res.json(await userService.refreshAccessToken(req.body));
  } catch (err: any) {
    console.error("Error while refreshing access token:\n", err.message);
    next(err);
  }
}

export async function deleteUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    res.json(await userService.deleteUser(req.body));
  } catch (err: any) {
    console.error("Error while deleting user:\n", err.message);
    next(err);
  }
}
