import { IMill } from '@open-oracle-origami/origami-js-sdk'

export type SimplePriceParamsOptional = {
  include_market_cap?: boolean
  include_24hr_vol?: boolean
  include_24hr_change?: boolean
  include_last_updated_at?: boolean
}

export type SimplePriceParamsAdvanced = SimplePriceParamsOptional & {
  ids: string | string[]
  vs_currencies: string | string[]
}

export type SimplePriceParams = SimplePriceParamsOptional & {
  ids: string
  vs_currencies: string
}

export type MainConfigDefaults = {
  simplePriceParams: SimplePriceParamsAdvanced
  interval?: number
  timeout?: number
  autoRetry?: boolean
  apiKey?: string
}

export type MainConfig = MainConfigDefaults & {
  press: (sku: string, data: any, timestamp?: number) => IMill
}

export type CoinGeckoMillConfig = MainConfigDefaults & {
  id?: string
}
