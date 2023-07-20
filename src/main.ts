import { poll } from 'poll'
import { CoinGeckoClient } from 'coingecko-api-v3'
import { CallbackFn } from '@open-oracle-origami/origami-js-sdk'

import { MainConfig, SimplePriceParams } from './types'

export default ({
  press,
  interval = 5000,
  timeout = 10000,
  autoRetry = true,
  simplePriceParams,
  apiKey,
}: MainConfig): CallbackFn<void> => {
  let stop = false

  const client = new CoinGeckoClient(
    {
      timeout,
      autoRetry,
    },
    apiKey
  )

  const params: SimplePriceParams = {
    ...simplePriceParams,
    ids: Array.isArray(simplePriceParams.ids)
      ? simplePriceParams.ids.join(',')
      : simplePriceParams.ids,
    vs_currencies: Array.isArray(simplePriceParams.vs_currencies)
      ? simplePriceParams.vs_currencies.join(',')
      : simplePriceParams.vs_currencies,
  }

  const pressAllIds = async (): Promise<void> => {
    const res = await client.simplePrice(params)

    Object.entries(res).forEach(([sku, data]) => {
      press(sku, data)
    })
  }

  void poll(pressAllIds, interval, () => stop)

  return (): void => {
    stop = true
  }
}
