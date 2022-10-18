require("dotenv-safe").config();
import { WebSocketServer } from "ws";
import {
  UPDATE_CACHE_INTERVAL,
  UPDATE_CLIENT_INTERVAL,
} from "./config/scheduling";
import * as rateController from "./controllers/rateController";
import * as userRoute from "./routes/userRoute";
import "./services/rateService";

const PORT = Number(process.env.SOCKET_PORT);

// Start server
const server = new WebSocketServer({ port: PORT });

// Set routes
userRoute.setUserRoutes(server);

// Init cache
rateController.updateReferenceRate();

// Schedule cache updates
setInterval(rateController.updateReferenceRate, UPDATE_CACHE_INTERVAL);

// Schedule client updates
setInterval(
  () => rateController.emitUserExchangeRate(server),
  UPDATE_CLIENT_INTERVAL
);

console.log(`Server is listening on //localhost:${PORT}`);
