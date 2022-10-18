import ms from "ms";

export const UPDATE_CACHE_INTERVAL = ms(
  process.env.UPDATE_CACHE_INTERVAL as string
);

export const UPDATE_CLIENT_INTERVAL = ms(
  process.env.UPDATE_CLIENT_INTERVAL as string
);
