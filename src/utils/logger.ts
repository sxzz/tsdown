import { bgRed, bgYellow, blue, green } from 'ansis'

export class Logger {
  silent: boolean = false

  setSilent(value: boolean): void {
    this.silent = value
  }

  info(...args: any[]): void {
    if (!this.silent) {
      console.info(blue`ℹ`, ...args)
    }
  }

  warn(...args: any[]): void {
    if (!this.silent) {
      console.warn('\n', bgYellow` WARN `, ...args, '\n')
    }
  }

  error(...args: any[]): void {
    if (!this.silent) {
      console.error('\n', bgRed` ERROR `, ...args, '\n')
    }
  }

  success(...args: any[]): void {
    if (!this.silent) {
      console.info(green`✔`, ...args)
    }
  }
}

export const logger: Logger = new Logger()
