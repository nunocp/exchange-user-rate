import { WebSocketServer } from "ws";
import * as userController from "../controllers/userController";

export function setUserRoutes(server: WebSocketServer) {
  // On client connection
  server.on("connection", userController.onClientConnection);
}
