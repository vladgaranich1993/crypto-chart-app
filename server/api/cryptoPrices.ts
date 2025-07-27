import { fetchCoinbaseHistory } from '../../lib/api/fetchCrypto'
import { getQuery } from 'h3'
import { defineEventHandler } from 'h3'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const assets = ['BTC-USD', 'ETH-USD']
  // const interval = (query.interval as string) ?? 'd1'

  const results = await Promise.all(
    assets.map(async (id) => {
      try {
        const data = await fetchCoinbaseHistory(id, 86400) // 86400 seconds = 1 day
        return { id, data }
      } catch {
        return { id, error: true }
      }
    })
  )

  return results.reduce((acc, cur) => {
    acc[cur.id] = cur.data ?? { error: true }
    return acc
  }, {} as Record<string, any>)
})
