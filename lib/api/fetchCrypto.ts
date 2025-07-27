export async function fetchCoinbaseHistory(
  productId: string = 'BTC-USD',
  granularity = 86400
) {
  const now = new Date();
  const end = now.toISOString();
  const start = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString();

  const url = `https://api.exchange.coinbase.com/products/${productId}/candles?granularity=${granularity}&start=${start}&end=${end}`;

  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch Coinbase data');

  const data = await res.json();

  // Transform to format similar to CoinCap
  return data.map((d: number[]) => ({
    time: d[0] * 1000,
    priceUsd: d[4].toString(), // close price
  })).reverse(); // Coinbase returns latest first
}
