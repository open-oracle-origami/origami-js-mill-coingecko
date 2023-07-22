import { SyncOrAsyncFn } from '@open-oracle-origami/origami-js-sdk'

// Copied from: https://github.com/kleinfreund/pollexport because it did not work with loader
// TODO: Make this a package later

export default async (
  fn: SyncOrAsyncFn<any>,
  delayOrDelayCallback: number | SyncOrAsyncFn<number> = 5000,
  shouldStopPolling: SyncOrAsyncFn<any> = () => false
): Promise<void> => {
  do {
    await fn()

    if (await shouldStopPolling()) break

    const delay: number =
      typeof delayOrDelayCallback === 'number'
        ? delayOrDelayCallback
        : await delayOrDelayCallback()

    await new Promise(resolve => setTimeout(resolve, Math.max(0, delay)))
  } while (!(await shouldStopPolling()))
}
