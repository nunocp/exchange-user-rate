import jwt from "jsonwebtoken";

//
// Access Token
//

export function generateAccessToken(object: any) {
  return jwt.sign(object, process.env.JWT_ACCESS_SECRET as string, {
    expiresIn: process.env.JWT_ACCESS_EXPIRATION as string,
  });
}

export function authenticateAccessToken(token: string) {
  return jwt.verify(token, process.env.JWT_ACCESS_SECRET as string);
}

//
// Refresh Token
//

export function generateRefreshToken(object: any) {
  return jwt.sign(object, process.env.JWT_REFRESH_SECRET as string);
}

export function authenticateRefreshToken(token: string) {
  return jwt.verify(token, process.env.JWT_REFRESH_SECRET as string);
}
