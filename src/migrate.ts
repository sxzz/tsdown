import { existsSync } from 'node:fs'
import { readFile, unlink, writeFile } from 'node:fs/promises'
import process from 'node:process'
import consola from 'consola'
import { version } from '../package.json'

export async function migrate({
  cwd,
  dryRun,
}: {
  cwd?: string
  dryRun?: boolean
}): Promise<void> {
  if (dryRun) {
    consola.info('Dry run enabled. No changes were made.')
  } else {
    const confirm = await consola.prompt(
      'Please make sure to commit your changes before migrating. Continue?',
      { type: 'confirm' },
    )
    if (!confirm) {
      consola.error('Migration cancelled.')
      process.exitCode = 1
      return
    }
  }

  if (cwd) process.chdir(cwd)

  let migrated = await migratePackageJson(dryRun)
  if (await migrateTsupConfig(dryRun)) {
    migrated = true
  }
  if (migrated) {
    consola.success(
      'Migration completed. Remember to run install command with your package manager.',
    )
  } else {
    consola.error('No migration performed.')
    process.exitCode = 1
  }
}

async function migratePackageJson(dryRun?: boolean): Promise<boolean> {
  if (!existsSync('package.json')) {
    consola.error('No package.json found')
    return false
  }

  const pkgRaw = await readFile('package.json', 'utf-8')
  let pkg = JSON.parse(pkgRaw)
  const semver = `^${version}`
  let found = false
  if (pkg.dependencies?.tsup) {
    consola.info('Migrating `dependencies` to tsdown.')
    found = true
    pkg.dependencies = renameKey(pkg.dependencies, 'tsup', 'tsdown', semver)
  }
  if (pkg.devDependencies?.tsup) {
    consola.info('Migrating `devDependencies` to tsdown.')
    found = true
    pkg.devDependencies = renameKey(
      pkg.devDependencies,
      'tsup',
      'tsdown',
      semver,
    )
  }
  if (pkg.peerDependencies?.tsup) {
    consola.info('Migrating `peerDependencies` to tsdown.')
    found = true
    pkg.peerDependencies = renameKey(
      pkg.peerDependencies,
      'tsup',
      'tsdown',
      '*',
    )
  }
  if (pkg.scripts) {
    for (const key of Object.keys(pkg.scripts)) {
      if (pkg.scripts[key].includes('tsup')) {
        consola.info(`Migrating \`${key}\` script to tsdown`)
        found = true
        pkg.scripts[key] = pkg.scripts[key].replaceAll(
          /tsup(?:-node)?/g,
          'tsdown',
        )
      }
    }
  }
  if (pkg.tsup) {
    consola.info('Migrating `tsup` field in package.json to `tsdown`.')
    found = true
    pkg = renameKey(pkg, 'tsup', 'tsdown')
  }

  if (!found) {
    consola.warn('No tsup-related fields found in package.json')
    return false
  }

  const pkgStr = `${JSON.stringify(pkg, null, 2)}\n`
  if (dryRun) {
    const { createPatch } = await import('diff')
    consola.info('[dry-run] package.json:')
    console.info(createPatch('package.json', pkgRaw, pkgStr))
  } else {
    await writeFile('package.json', pkgStr)
    consola.success('Migrated `package.json`')
  }
  return true
}

const TSUP_FILES = [
  'tsup.config.ts',
  'tsup.config.cts',
  'tsup.config.mts',
  'tsup.config.js',
  'tsup.config.cjs',
  'tsup.config.mjs',
  'tsup.config.json',
]
async function migrateTsupConfig(dryRun?: boolean): Promise<boolean> {
  let found = false

  for (const file of TSUP_FILES) {
    if (!existsSync(file)) continue
    consola.info(`Found \`${file}\``)
    found = true

    const tsupConfigRaw = await readFile(file, 'utf-8')
    const tsupConfig = tsupConfigRaw
      .replaceAll(/\btsup\b/g, 'tsdown')
      .replaceAll(/\bTSUP\b/g, 'TSDOWN')

    const renamed = file.replaceAll('tsup', 'tsdown')
    if (dryRun) {
      const { createTwoFilesPatch } = await import('diff')
      consola.info(`[dry-run] ${file} -> ${renamed}:`)
      console.info(
        createTwoFilesPatch(file, renamed, tsupConfigRaw, tsupConfig),
      )
    } else {
      await writeFile(renamed, tsupConfig, 'utf8')
      await unlink(file)
      consola.success(`Migrated \`${file}\` to \`${renamed}\``)
    }
  }

  if (!found) {
    consola.warn('No tsup config found')
  }

  return found
}

// rename key but keep order
function renameKey(
  obj: Record<string, any>,
  oldKey: string,
  newKey: string,
  newValue?: any,
) {
  const newObj: Record<string, any> = {}
  for (const key of Object.keys(obj)) {
    if (key === oldKey) {
      newObj[newKey] = newValue || obj[oldKey]
    } else {
      newObj[key] = obj[key]
    }
  }
  return newObj
}
