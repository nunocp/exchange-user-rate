import { WebSocket, WebSocketServer } from "ws";
import * as rateService from "../services/rateService";
import { socketData } from "../utils/socketResponses";

// Emit to all connected users their respective exchange rate
export function emitUserExchangeRate(server: WebSocketServer) {
  try {
    server.clients.forEach(async (socket) => {
      const userRate = await rateService.calculateUserExchangeRate(socket);

      if (socket.readyState === WebSocket.OPEN)
        socket.send(socketData({ exchangeRate: userRate }));
    });
  } catch (err: any) {
    console.error(err.message);
  }
}

// Polls the external service and caches the updated rate
export async function updateReferenceRate() {
  try {
    // Get rate from external provider
    const { USD } = await rateService.getExternalReferenceRate({
      coinId: 1,
    });

    // Update local cache
    await rateService.updateCachedReferenceRate(USD);
  } catch (err: any) {
    console.error(err.message);
  }
}
