import { Mill, IMill, InitFn } from '@open-oracle-origami/origami-js-sdk'

import main from './main'
import { CoinGeckoMillConfig } from './types'

const CoinGeckoMill = ({
  id = 'coingecko',
  ...rest
}: CoinGeckoMillConfig): IMill => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  const init: InitFn = ({ press }: IMill) => main({ press, ...rest })

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  return new Mill({ id, init }) as IMill
}

export default CoinGeckoMill
