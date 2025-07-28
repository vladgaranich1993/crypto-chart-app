import { useFetch } from "nuxt/app"

type CoincapPricePoint = {
  priceUsd: string
  time: number
}

export type CryptoPricesResponse = {
  "BTC-USD": CoincapPricePoint[]
  "ETH-USD": CoincapPricePoint[]
}

export function useCryptoPrices() {
  return useFetch(`/api/cryptoPrices?assets=BTC-USD,ETH-USD`);
}