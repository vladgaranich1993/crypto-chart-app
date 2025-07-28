export async function fetchCoinbaseHistory(productId: string): Promise<{ time: number; price: number }[]> {
  const url = `https://api.exchange.coinbase.com/products/${productId}/candles?granularity=86400`;

  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch Coinbase candles");

  const json = await res.json();

  return json
    .map((candle: number[]) => ({
      time: candle[0] * 1000,
      price: candle[4],
    }))
    .sort((a: { time: number; }, b: { time: number; }) => a.time - b.time); // ascending order
}
