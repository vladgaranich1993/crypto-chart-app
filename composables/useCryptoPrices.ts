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
  const { data, pending, error } = useFetch<CryptoPricesResponse>(
    '/api/cryptoPrices?assets=bitcoin,ethereum&interval=d1'
  )
  return { data, pending, error }
}