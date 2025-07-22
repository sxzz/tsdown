import { cp, rm } from 'node:fs/promises'
import * as typedoc from 'typedoc'

const LANGUAGES = ['zh-CN']

/**
 * Run TypeDoc with the specified tsconfig
 */
async function runTypedoc(tsconfig: string): Promise<void> {
  // Bootstrap TypeDoc with plugins
  const app = await typedoc.Application.bootstrapWithPlugins({
    tsconfig,
  })

  // May be undefined if errors are encountered.
  const project = await app.convert()

  if (project) {
    // Generate configured outputs
    await app.generateOutputs(project)
  } else {
    throw new Error('Failed to generate TypeDoc output')
  }
}

/**
 * Main function to generate API reference documentation
 */
async function generateApiReference() {
  console.log('📚 Generating reference...')

  // Generate API documentation
  await runTypedoc('tsconfig.json')
  console.log('✅ Reference generated successfully!')
  console.log('📚 Beautifying reference structure...')

  await rm('docs/reference/api/index.md', { force: true })
  await rm('docs/reference/api/_media', { recursive: true, force: true })

  for (const language of LANGUAGES) {
    await cp(`docs/reference/api`, `docs/${language}/reference/api`, {
      recursive: true,
      force: true,
    })
  }
}

// Execute the main function
await generateApiReference()
