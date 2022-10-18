import { NextFunction, Request, Response } from "express";
import { authenticateAccessToken } from "../utils/auth";

export async function authenticateRequest(
  req: Request | any,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  // Unauthorized
  if (!token) return res.sendStatus(401);

  try {
    const decodedToken = await authenticateAccessToken(token);
    req.body.decodedToken = decodedToken;
    next();
  } catch (err) {
    return res.sendStatus(403);
  }
}
