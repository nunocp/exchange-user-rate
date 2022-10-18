import { PrismaClient, user } from "@prisma/client";
import { apiError, apiSuccess } from "../utils/apiResponses";
import {
  authenticateRefreshToken,
  generateAccessToken,
  generateRefreshToken,
} from "../utils/auth";

const prisma = new PrismaClient();

// Create user
export async function createUser({ username, password }: user) {
  try {
    await prisma.user.create({
      data: {
        username,
        password,
      },
    });
  } catch (err: any) {
    return apiError(err.message);
  }

  return apiSuccess("User created.");
}

// Login user
export async function loginUser({ username, password }: user) {
  // Check username and password
  const foundUser: any = await prisma.user.findFirst({
    where: {
      username,
      password,
    },
  });

  if (!foundUser) return apiError("Username and/or password doesn't match.");

  const { id } = foundUser;

  // If success, generate auth tokens
  const token = generateAccessToken({ id });

  const refreshToken = foundUser.refreshToken || generateRefreshToken({ id });

  // Update tokens on DB
  await prisma.user.update({
    where: { id },
    data: {
      refreshToken,
    },
  });

  return apiSuccess(undefined, {
    id,
    username,
    token,
    refreshToken,
  });
}

// Logout user
export async function logoutUser({ refreshToken }: any) {
  try {
    await prisma.user.update({
      where: { refreshToken },
      data: { refreshToken: null },
    });
  } catch (err: any) {
    return apiError(err.message);
  }

  return apiSuccess("User logged out.");
}

// Get some user info
export async function getUser({ decodedToken }: any) {
  const user = await prisma.user.findUnique({ where: { id: decodedToken.id } });

  if (!user) return apiError("User not found.");

  // Return without some sensible fields, for safety reasons.
  return apiSuccess(undefined, {
    ...user,
    password: undefined,
    refreshToken: undefined,
  });
}

// Update user info
export async function updateUser({
  decodedToken,
  username,
  password,
  exchangeSpread,
}: any) {
  await prisma.user.update({
    where: { id: decodedToken.id },
    data: { username, password, exchangeSpread },
  });

  // Return without some sensible fields, for safety reasons.
  return apiSuccess("User udpated.", {
    id: decodedToken.id,
    username,
    password,
    exchangeSpread,
  });
}

// Get new access token to keep user connected
export async function refreshAccessToken({ refreshToken }: any) {
  const foundToken = await prisma.user.findUnique({ where: { refreshToken } });

  if (!foundToken) return apiError("Refresh token not found.");

  try {
    const decodedToken: any = authenticateRefreshToken(refreshToken);

    const accessToken = generateAccessToken({ id: decodedToken.id });

    return apiSuccess("New access token generated.", {
      token: accessToken,
    });
  } catch (err: any) {
    return apiError(err.message);
  }
}

export async function deleteUser({ decodedToken }: any) {
  await prisma.user.delete({ where: { id: decodedToken.id } });
  return apiSuccess("User deleted.");
}
