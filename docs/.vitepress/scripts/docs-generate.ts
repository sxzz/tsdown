import {
  copyFileSync,
  cpSync,
  existsSync,
  mkdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from 'node:fs'
import { dirname } from 'node:path'
import * as typedoc from 'typedoc'

/**
 * Run TypeDoc with the specified tsconfig
 */
async function runTypedoc(tsconfigPath: string): Promise<void> {
  // Bootstrap TypeDoc with plugins
  const app = await typedoc.Application.bootstrapWithPlugins({
    tsconfig: tsconfigPath,
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
 * Type definitions for file operations
 */
type FileOperation = {
  type: 'delete-lines' | 'replace'
  lineStart?: number
  lineEnd?: number
  pattern?: string | RegExp
  replacement?: string
}

type FileMapping =
  | {
      type: 'file'
      source: string
      destination: string
      modifications?: FileOperation[]
    }
  | {
      type: 'folder'
      sourceDir: string
      destDir: string
      files: string[]
      modifications?: FileOperation[]
    }

/**
 * Class to handle file operations based on mapping configurations
 */
class FileMapper {
  private mappings: FileMapping[]

  constructor(mappings: FileMapping[]) {
    this.mappings = mappings
  }

  /**
   * Modify file content with various operations
   */
  private modifyFile(filePath: string, operations: FileOperation[]): void {
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
        content = content.replaceAll(
          new RegExp(op.pattern, 'g'),
          op.replacement,
        )
      }
    }

    writeFileSync(filePath, content)
  }

  /**
   * Ensure a directory exists, creating it if necessary
   */
  private ensureDir(dirPath: string): void {
    if (!existsSync(dirPath)) {
      mkdirSync(dirPath, { recursive: true })
    }
  }

  /**
   * Remove a file or directory if it exists
   */
  private remove(
    path: string,
    options = { recursive: true, force: true },
  ): void {
    if (existsSync(path)) {
      rmSync(path, options)
    }
  }

  /**
   * Move a file from source to destination
   * Creates destination directory if it doesn't exist
   */
  private moveFile(source: string, destination: string): void {
    this.ensureDir(dirname(destination))
    copyFileSync(source, destination)
  }

  /**
   * Copy a directory recursively
   */
  private copyDir(source: string, destination: string): void {
    this.remove(destination)
    this.ensureDir(destination)
    cpSync(source, destination, { recursive: true })
  }

  /**
   * Apply standard modifications to markdown files
   */
  private standardizeMarkdown(
    filePath: string,
    additionalOps: FileOperation[] = [],
  ): void {
    // Common operation: remove first 6 lines
    const operations = [
      { type: 'delete-lines' as const, lineStart: 1, lineEnd: 6 },
      ...additionalOps,
    ]
    this.modifyFile(filePath, operations)
  }

  /**
   * Process a single file mapping
   */
  private processFileMapping(mapping: FileMapping): void {
    if (mapping.type === 'file') {
      this.moveFile(mapping.source, mapping.destination)
      this.standardizeMarkdown(mapping.destination, mapping.modifications)
    } else if (mapping.type === 'folder') {
      this.ensureDir(mapping.destDir)
      for (const file of mapping.files) {
        const source = `${mapping.sourceDir}/${file}.md`
        const destination = `${mapping.destDir}/${file}.md`
        this.moveFile(source, destination)
        this.standardizeMarkdown(destination, mapping.modifications)
      }
    }
  }

  /**
   * Copy all processed files to locale directories
   */
  private copyToLocales(locales: string[]): void {
    for (const locale of locales) {
      const localeRefDir = `./docs/${locale}/reference`
      this.ensureDir(localeRefDir)

      // Copy all files to each locale
      for (const mapping of this.mappings) {
        if (mapping.type === 'file') {
          const destFile = `${localeRefDir}/${mapping.destination.split('/').pop()}`
          this.moveFile(mapping.destination, destFile)
        } else if (mapping.type === 'folder') {
          const localeDestDir = `${localeRefDir}/${mapping.destDir.split('/').pop()}`
          this.copyDir(mapping.destDir, localeDestDir)
        }
      }
    }
  }

  /**
   * Process all file mappings
   */
  process(locales: string[] = []): void {
    // Process each mapping
    for (const mapping of this.mappings) {
      this.processFileMapping(mapping)
    }

    // Remove the original api folder
    this.remove('./docs/reference/api')

    // Copy to locales if specified
    if (locales.length > 0) {
      this.copyToLocales(locales)
    }
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

  // Define file mappings
  const fileMappings: FileMapping[] = [
    {
      type: 'file',
      source: './docs/reference/api/interfaces/Options.md',
      destination: './docs/reference/config-options.md',
      modifications: [
        {
          type: 'replace',
          pattern: String.raw`\.\.\/type-aliases`,
          replacement: './type-aliases',
        },
        {
          type: 'replace',
          pattern: `Workspace.md`,
          replacement: 'workspace.md',
        },
        {
          type: 'replace',
          pattern: `ExportsOptions.md`,
          replacement: 'exports-options.md',
        },
      ],
    },
    {
      type: 'file',
      source: './docs/reference/api/interfaces/Workspace.md',
      destination: './docs/reference/workspace.md',
    },
    {
      type: 'file',
      source: './docs/reference/api/interfaces/ExportsOptions.md',
      destination: './docs/reference/exports-options.md',
    },
    {
      type: 'folder',
      sourceDir: './docs/reference/api/type-aliases',
      destDir: './docs/reference/type-aliases',
      files: ['Sourcemap', 'Format', 'ModuleTypes'],
    },
  ]

  // Create a file mapper and process all mappings
  const fileMapper = new FileMapper(fileMappings)
  fileMapper.process(['zh-CN'])

  console.log('✅ Reference structure beautified successfully!')
}

// Execute the main function
await generateApiReference()
