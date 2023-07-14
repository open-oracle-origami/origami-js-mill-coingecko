import { CoinGeckoClient } from 'coingecko-api-v3'

import { BaseMill } from '@open-oracle-origami/origami-js-sdk'
import { poll } from 'poll'

type SimplePriceParams = {
  vs_currencies: string
  ids: string
  include_market_cap?: boolean
  include_24hr_vol?: boolean
  include_24hr_change?: boolean
  include_last_updated_at?: boolean
}

export class CoinGeckoMill extends BaseMill {
  private readonly client: CoinGeckoClient
  private readonly pollIntervalMs: number
  simplePriceParams: SimplePriceParams

  constructor({
    id = 'mill.coingecko',
    // @ts-ignore
    simplePriceParams,
    pollIntervalMs = 5000,
  }) {
    super()

    if (id) this.setId(`mill.${id.replace('mill.', '')}`)
    this.pollIntervalMs = pollIntervalMs
    this.simplePriceParams = simplePriceParams
    this.client = new CoinGeckoClient({
      timeout: 10000,
      autoRetry: true,
    })
  }

  private getSimplePrice = async () => {
    return this.client.simplePrice(this.simplePriceParams).then((data: any) => {
      const paper = {
        data,
        created: new Date(),
      }

      this.emitter.publish(`${this.id}`, paper)
    })
  }

  start = () => {
    super.start()

    if (!this.simplePriceParams) {
      throw new Error('simplePriceParams is required in constructor')
    }

    void poll(this.getSimplePrice, this.pollIntervalMs)
  }
}

export default CoinGeckoMill
