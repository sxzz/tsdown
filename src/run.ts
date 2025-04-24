#!/usr/bin/env node
import process from 'node:process'

const debugIndex: number = process.argv.findIndex((arg) =>
  /^--debug$/.test(arg),
)

if (debugIndex > 0) {
  let value = process.argv[debugIndex + 1]
  if (!value || value.startsWith('-')) {
    value = 'tsdown:*'
  } else {
    // support debugging multiple flags with comma-separated list
    value = value
      .split(',')
      .map((v) => `tsdown:${v}`)
      .join(',')
  }
  process.env.DEBUG = `${
    process.env.DEBUG ? `${process.env.DEBUG},` : ''
  }${value}`
}

function start(): void {
  import('./cli').then(({ runCLI }) => {
    return runCLI()
  })
}
start()
