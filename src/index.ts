import { Mill, IMill, InitFn } from '@open-oracle-origami/origami-js-sdk'

import main from './main'
import { CoinGeckoMillConfig } from './types'

const CoinGeckoMill = ({
  id = 'coingecko',
  ...rest
}: CoinGeckoMillConfig): IMill => {
  const init: InitFn = ({ press }: IMill) => main({ press, ...rest })

  return Mill.create({ id, init })
}

export default CoinGeckoMill
