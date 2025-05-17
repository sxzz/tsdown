import { execSync } from 'node:child_process'
import {
  copyFileSync,
  cpSync,
  existsSync,
  mkdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from 'node:fs'
import { join } from 'node:path'

/**
 * Execute a shell command and return the output
 */
function executeCommand(
  command: string,
  options: { cwd?: string } = {},
): string {
  try {
    return execSync(command, {
      stdio: ['pipe', 'pipe', 'pipe'],
      encoding: 'utf-8',
      ...options,
    }).toString()
  } catch (error) {
    console.error(`Error executing command: ${command}`)
    throw error
  }
}

/**
 * Run TypeDoc with the specified tsconfig
 */
function runTypedoc(tsconfigPath: string): void {
  const typedocPath = join('./node_modules/.bin/typedoc')
  console.log(`Executing: ${typedocPath} --tsconfig ${tsconfigPath}`)
  executeCommand(`${typedocPath} --tsconfig ${tsconfigPath}`, {
    // eslint-disable-next-line node/prefer-global/process
    cwd: process.cwd(),
  })
}

/**
 * Modify file content (sed replacement)
 */
function modifyFile(
  filePath: string,
  operations: Array<{
    type: 'delete-lines' | 'replace'
    lineStart?: number
    lineEnd?: number
    pattern?: string | RegExp
    replacement?: string
  }>,
): void {
  let content = readFileSync(filePath, 'utf-8')

  for (const op of operations) {
    if (
      op.type === 'delete-lines' &&
      op.lineStart !== undefined &&
      op.lineEnd !== undefined
    ) {
      const lines = content.split('\n')
      const newLines = [
        ...lines.slice(0, op.lineStart - 1),
        ...lines.slice(op.lineEnd),
      ]
      content = newLines.join('\n')
    } else if (
      op.type === 'replace' &&
      op.pattern &&
      op.replacement !== undefined
    ) {
      content = content.replaceAll(new RegExp(op.pattern, 'g'), op.replacement)
    }
  }

  writeFileSync(filePath, content)
}

/**
 * Main function to generate API reference documentation
 */
function generateApiReference(): void {
  console.log('📚 Generating reference...')

  // Generate API documentation
  runTypedoc('tsconfig.json')

  console.log('✅ Reference generated successfully!')
  console.log('📚 Beautifying reference structure...')

  // Move Options.md to ./docs/reference/config-options.md
  copyFileSync(
    './docs/reference/api/interfaces/Options.md',
    './docs/reference/config-options.md',
  )

  // Move Workspace.md to ./docs/reference/workspace.md
  copyFileSync(
    './docs/reference/api/interfaces/Workspace.md',
    './docs/reference/workspace.md',
  )

  // Handle type-aliases folder
  if (existsSync('./docs/reference/type-aliases')) {
    rmSync('./docs/reference/type-aliases', { recursive: true, force: true })
  }

  // Create the type-aliases folder
  mkdirSync('./docs/reference/type-aliases', { recursive: true })

  // Move type-aliases files
  const typeAliasFiles = ['Sourcemap', 'Format', 'ModuleTypes']
  for (const file of typeAliasFiles) {
    copyFileSync(
      `./docs/reference/api/type-aliases/${file}.md`,
      `./docs/reference/type-aliases/${file}.md`,
    )
  }

  // Remove the api folder
  rmSync('./docs/reference/api', { recursive: true, force: true })

  // In config-options.md, remove 6 first lines
  modifyFile('./docs/reference/config-options.md', [
    { type: 'delete-lines', lineStart: 1, lineEnd: 6 },
    {
      type: 'replace',
      pattern: String.raw`\.\.\/type-aliases`,
      replacement: './type-aliases',
    },
  ])

  // In workspace.md, remove 6 first lines
  modifyFile('./docs/reference/workspace.md', [
    { type: 'delete-lines', lineStart: 1, lineEnd: 6 },
  ])

  // In type-aliases files, remove 6 first lines
  for (const file of typeAliasFiles) {
    modifyFile(`./docs/reference/type-aliases/${file}.md`, [
      { type: 'delete-lines', lineStart: 1, lineEnd: 6 },
    ])
  }

  // Initialize an array of all locales
  const locales = ['zh-CN']

  // Copy the config-options.md file and the type-aliases folder to each locale
  for (const locale of locales) {
    const localeRefDir = `./docs/${locale}/reference`

    // Make sure the locale reference directory exists
    mkdirSync(localeRefDir, { recursive: true })

    // Copy config-options.md
    copyFileSync(
      './docs/reference/config-options.md',
      `${localeRefDir}/config-options.md`,
    )

    // Copy workspace.md
    copyFileSync(
      './docs/reference/workspace.md',
      `${localeRefDir}/workspace.md`,
    )

    // Remove the type-aliases folder if it exists
    if (existsSync(`${localeRefDir}/type-aliases`)) {
      rmSync(`${localeRefDir}/type-aliases`, { recursive: true, force: true })
    }

    // Copy the type-aliases folder
    cpSync('./docs/reference/type-aliases', `${localeRefDir}/type-aliases`, {
      recursive: true,
    })
  }

  console.log('✅ Reference structure beautified successfully!')
}

// Execute the main function
generateApiReference()
