import { type CallbackFn } from '@/types'

export class AsyncInterval {
  active: boolean
  interval: number
  constructor(interval: number) {
    this.active = true
    this.interval = interval
  }

  private runAsyncInterval = async (callback: CallbackFn) => {
    if (this.active) {
      await callback()
      setTimeout(() => this.runAsyncInterval(callback), this.interval)
    }
  }

  public setAsyncInterval = (callback: CallbackFn) => {
    this.active = true
    this.runAsyncInterval(callback)
  }

  public clearAsyncInterval = () => {
    if (this.active) {
      this.active = false
    }
  }
}
