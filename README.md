# CRUD Exchange User Rate

This backend provides a JWT-based user registering/login REST API intended to be consumed by a frontend admin CRUD panel. After registering and logging in, users can configure their own private rate for the BTC/USD pair by setting a relative spread value over the pair's current market rate. The backend uses CoinMarketCap's rate for BTC/USD as the basis to calculate the user's total pair private rate and provides it through a websocket for constant updates.

It contains 2 dockerized microservices:

- `/user`: provides the User REST API with CRUD functions + rate spread
- `/exchange`: provides the Exchange Rate websocket

Main techs used: Typescript, Express.js, JsonWebToken, Prisma, MySQL, CoinMarketCap API, Node.js, Docker

Index:

- [How It Works](#how-it-works)
- [API](#api)
- [Building and Running](#building-and-running)

---

## How It Works

> To make bootstraping easier, both services have default `.env` files with all required fields already set.\
> These files were also removed from the `.gitignore` file.

**Warning: The default values are set based on the limits of CoinMarketCap's free plan, so take a look at `.env` for what can be easily customized.**

The **User** service provides a 100% independent API to make CRUD operations on user records and handles JWT authentication. It stores data in a MySQL container.

- By default, the JWT auth process generates a new access token when the user logs in. These tokens expire in 15 minutes. To keep the user connected, the front end needs to request a new access token to the service (by sending the refreshToken at "token" endpoint).

- All endpoints that expect a logged user must be requested with an Authorization header providing the access token.

- To change a user's exchange rate spread, update the exchangeSpread using the Update User endpoint.

The **Exchange** service provides a websocket endpoint where users can connect to periodically receive exchange rates for the pair BTC/USD based on their specific spread configuration stored in the User service.

- The service polls CoinMarketCap's API periodically every 4.5 minutes by default (because of the request limit of the current free plan's API key provided on `.env`) to get the reference exchange rate for the coin pair but sends data to connected users much faster (10 seconds by default). The polling frequency to the external provider can be faster if used with a paid plan's API key.

- Given the volatility of the data handled by this microservice, when the user connects to the Exchange, the service requests to the User service their spread value and caches it in memory only, using it to make the calculation necessary to send the final rate value to the user.

- This means that in the current implementation with the provided defaults, it will take 4.5 minutes to update the cached value after changing the user spread through the User Service's API because the final (calculated) user's exchange rate provided by the websocket is updated only when the service gets reference data from CoinMarketCap.

---

## API

> Note: sorry, no Postman collection is provided yet. For now, experimenting with the endpoints is done manually.\
> Tip: for the REST API, one could use the "REST Client" extension for VS Code to interact with the file [/user/requests.rest](./user/requests.rest), or use any REST client browser extension to make requests to the running service. Similar extensions exist for interacting with the websocket.

### **User Endpoints**

The file [/user/requests.rest](./user/requests.rest) lists the endpoints of this service, along with example requests.

### **Exchange Endpoints**

The default endpoint for the websocket is `ws://localhost:3001`.

To make a valid connection, the user must pass their JWT access token via the `token` parameter in the URL when connecting, like: `ws://localhost:3001/?token=JWT_ACCESS_TOKEN_HERE`

If authenticated, the user will start receiving updates for their calculated individual exchange rate.

---

## Building and Running

Dependencies:

- Node.js
- Docker (Compose)

First, to allow the Exchange service to communicate with the User service, we need to first create a shared Docker network. The "docker-compose.yml" files expect one network called `exchange-user-rate`, so do:

```
docker network create exchange-user-rate
```

Then, **in each microservice folder** just do:

```
docker-compose build
docker-compose up
```

After all services are built and sucessfully running, the following endpoints will be available:

User REST API: http://localhost:3000

Exchange Rate websocket: ws://localhost:3001
