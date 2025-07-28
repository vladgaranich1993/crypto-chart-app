import { useFetch } from "nuxt/app"
import { Ref } from "vue"

type CoincapPricePoint = {
  priceUsd: string
  time: number
}

export type CryptoPricesResponse = {
  "BTC-USD": CoincapPricePoint[]
  "ETH-USD": CoincapPricePoint[]
}

export type PricePoint = { time: number; price: number };
export type CryptoPrices = Record<string, PricePoint[]>;

export function useCryptoPrices(assets: string[]) {
  const assetParam = assets.join(",");
  return useFetch<CryptoPrices>(`/api/cryptoPrices?assets=${assetParam}`);
}
