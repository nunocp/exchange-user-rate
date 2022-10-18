import axios from "axios";
import { WebSocket } from "ws";
import {
  getInjectedCachedData,
  injectCachedData,
} from "../utils/socketHelpers";

export async function getExternalUserExchangeSpread(
  authorizationHeader: string
) {
  const res = await axios.get(`${process.env.USER_API_URL as string}/user`, {
    headers: { ["authorization"]: authorizationHeader },
  });

  return Number(res.data.data.exchangeSpread);
}

export async function updateCachedUserExchangeSpread(
  socket: WebSocket,
  spread: number
) {
  injectCachedData(socket, { exchangeSpread: spread });
}

export async function getCachedUserExchangeSpread(socket: WebSocket) {
  return getInjectedCachedData(socket).exchangeSpread;
}
