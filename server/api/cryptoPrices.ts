import { fetchCoinbaseHistory } from "../../lib/api/fetchCrypto";
import { defineEventHandler, getQuery } from "h3";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const assets = (query.assets as string)?.split(",") ?? ["BTC-USD", "ETH-USD"];

  const results = await Promise.all(
    assets.map(async (id) => {
      try {
        const data = await fetchCoinbaseHistory(id);
        return { id, data };
      } catch {
        return { id, error: true };
      }
    })
  );

  return results.reduce((acc, cur) => {
    acc[cur.id] = cur.data ?? [];
    return acc;
  }, {} as Record<string, { time: number; price: number }[]>);
});
