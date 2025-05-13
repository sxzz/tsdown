import { bgRed, bgYellow, blue, green, rgb, yellow, type Ansis } from 'ansis'
import { noop } from './general'
import type { InternalModuleFormat } from 'rolldown'

export class Logger {
  silent: boolean = false

  setSilent(value: boolean): void {
    this.silent = value
  }

  filter(...args: any[]): any[] {
    return args.filter((arg) => arg !== undefined && arg !== false)
  }

  info(...args: any[]): void {
    if (!this.silent) {
      console.info(blue`ℹ`, ...this.filter(...args))
    }
  }

  warn(...args: any[]): void {
    if (!this.silent) {
      console.warn('\n', bgYellow` WARN `, ...this.filter(...args), '\n')
    }
  }

  error(...args: any[]): void {
    if (!this.silent) {
      console.error('\n', bgRed` ERROR `, ...this.filter(...args), '\n')
    }
  }

  success(...args: any[]): void {
    if (!this.silent) {
      console.info(green`✔`, ...this.filter(...args))
    }
  }
}

export const logger: Logger = new Logger()

export function prettyName(name?: string): string | undefined {
  if (!name) return undefined
  return generateColor(name)(`[${name}]`)
}

export function prettyFormat(format: InternalModuleFormat): string {
  const formatColor = format === 'es' ? blue : format === 'cjs' ? yellow : noop

  let formatText: string
  switch (format) {
    case 'es':
      formatText = 'ESM'
      break
    default:
      formatText = format.toUpperCase()
      break
  }

  return formatColor(`[${formatText}]`)
}

const colors = new Map<string, Ansis>()
export function generateColor(name: string = 'default'): Ansis {
  if (colors.has(name)) {
    return colors.get(name)!
  }
  let color: Ansis
  if (name === 'default') {
    color = blue
  } else {
    let hash = 0
    for (let i = 0; i < name.length; i++)
      hash = name.charCodeAt(i) + ((hash << 5) - hash)
    const hue = hash % 360
    const saturation = 35
    const lightness = 55
    color = rgb(...hslToRgb(hue, saturation, lightness))
  }
  colors.set(name, color)
  return color
}

function hslToRgb(
  h: number,
  s: number,
  l: number,
): [r: number, g: number, b: number] {
  h = h % 360
  h /= 360
  s /= 100
  l /= 100
  let r, g, b

  if (s === 0) {
    r = g = b = l // achromatic
  } else {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s
    const p = 2 * l - q
    r = hue2rgb(p, q, h + 1 / 3)
    g = hue2rgb(p, q, h)
    b = hue2rgb(p, q, h - 1 / 3)
  }

  return [
    Math.max(0, Math.round(r * 255)),
    Math.max(0, Math.round(g * 255)),
    Math.max(0, Math.round(b * 255)),
  ]
}

function hue2rgb(p: number, q: number, t: number) {
  if (t < 0) t += 1
  if (t > 1) t -= 1
  if (t < 1 / 6) return p + (q - p) * 6 * t
  if (t < 1 / 2) return q
  if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
  return p
}
