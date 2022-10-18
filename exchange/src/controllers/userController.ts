import { WebSocket } from "ws";
import * as rateService from "../services/rateService";
import * as userService from "../services/userService";
import {
  socketData,
  socketError,
  socketMessage,
} from "../utils/socketResponses";

export async function onClientConnection(socket: WebSocket, req: any) {
  try {
    socket.send(
      socketMessage("Connected to socket. Trying to authenticate...")
    );

    const url = req.url.startsWith("/") ? req.url.slice(1) : req.url;
    const token = new URLSearchParams(url).get("token");

    if (!token) throw Error("Parameter 'token' is invalid.");

    /*
      Making this request successfully also means that the access token is valid.
      Being so, the user is authorized to keep connected to the socket.
    */
    const spread = await userService.getExternalUserExchangeSpread(
      `Bearer ${token}`
    );

    // Store user's spread locally.
    userService.updateCachedUserExchangeSpread(socket, spread);

    socket.send(socketMessage("User connected successfully."));
    socket.send(
      socketData({
        exchangeRate: await rateService.calculateUserExchangeRate(socket),
      })
    );
  } catch (err: any) {
    socket.send(socketError(err.message));
    socket.close();
  }
}
