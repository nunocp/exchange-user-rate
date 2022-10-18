import axios from "axios";
import { WebSocket } from "ws";
import * as userService from "./userService";

let cachedReferenceRate: number = 0;

export async function getExternalReferenceRate({ coinId }: any) {
  const { data } = await axios.get(
    "https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest",
    {
      headers: {
        "X-CMC_PRO_API_KEY": process.env.COINMARKETCAP_KEY as string,
      },
      params: {
        id: coinId,
      },
    }
  );

  const USD = data.data[String(coinId)].quote.USD.price;

  return { USD };
}

export async function getCachedReferenceRate() {
  return cachedReferenceRate;
}

export async function updateCachedReferenceRate(value: number) {
  cachedReferenceRate = value;
}

export async function calculateUserExchangeRate(socket: WebSocket) {
  return (
    cachedReferenceRate *
    ((await userService.getCachedUserExchangeSpread(socket)) + 1)
  );
}
