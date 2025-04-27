import { existsSync } from 'node:fs'
import { readFile, unlink, writeFile } from 'node:fs/promises'
import process from 'node:process'
import consola from 'consola'
import { version } from '../package.json'

export async function migrateFromUnbuild({
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
  if (await migrateUnbuildConfig(dryRun)) {
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
  if (pkg.dependencies?.unbuild) {
    consola.info('Migrating `dependencies` to tsdown.')
    found = true
    pkg.dependencies = renameKey(pkg.dependencies, 'unbuild', 'tsdown', semver)
  }
  if (pkg.devDependencies?.unbuild) {
    consola.info('Migrating `devDependencies` to tsdown.')
    found = true
    pkg.devDependencies = renameKey(
      pkg.devDependencies,
      'unbuild',
      'tsdown',
      semver,
    )
  }
  if (pkg.peerDependencies?.unbuild) {
    consola.info('Migrating `peerDependencies` to tsdown.')
    found = true
    pkg.peerDependencies = renameKey(
      pkg.peerDependencies,
      'unbuild',
      'tsdown',
      '*',
    )
  }
  if (pkg.scripts) {
    for (const key of Object.keys(pkg.scripts)) {
      if (pkg.scripts[key].includes('unbuild')) {
        consola.info(`Migrating \`${key}\` script to tsdown`)
        found = true
        pkg.scripts[key] = pkg.scripts[key].replaceAll(
          /unbuild(?:-node)?/g,
          'tsdown',
        )
      }
    }
  }
  if (pkg.unbuild) {
    consola.info('Migrating `unbuild` field in package.json to `tsdown`.')
    found = true
    pkg = renameKey(pkg, 'unbuild', 'tsdown')
  }

  if (!found) {
    consola.warn('No unbuild-related fields found in package.json')
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

const UNBUILD_CONFIG_FILES = [
  'build.config.ts',
  'build.config.cts',
  'build.config.mts',
  'build.config.js',
  'build.config.cjs',
  'build.config.mjs',
  'build.config.json',
]

async function migrateUnbuildConfig(dryRun?: boolean): Promise<boolean> {
  let found = false

  for (const file of UNBUILD_CONFIG_FILES) {
    if (!existsSync(file)) continue
    consola.info(`Found \`${file}\``)
    found = true

    const unbuildConfigRaw = await readFile(file, 'utf-8')
    
    // Replace unbuild imports with tsdown
    let tsdownConfig = unbuildConfigRaw
      .replace(/from ["']unbuild["']/g, 'from "tsdown"')
      .replace(/import\s*{\s*defineBuildConfig\s*}/g, 'import { defineConfig }')
      .replace(/defineBuildConfig\(/g, 'defineConfig(')

    // Replace unbuild specific options with tsdown equivalents
    // This is a simplified approach - might need to be expanded based on actual options mapping
    tsdownConfig = tsdownConfig
      .replace(/builder:\s*["']mkdist["']/g, 'builder: "dts"')
      .replace(/rollup:/g, 'rolldown:')
    
    const tsdownFileName = file.replace('build.config', 'tsdown.config');
    
    if (dryRun) {
      const { createTwoFilesPatch } = await import('diff')
      consola.info(`[dry-run] ${file} -> ${tsdownFileName}:`)
      console.info(
        createTwoFilesPatch(file, tsdownFileName, unbuildConfigRaw, tsdownConfig),
      )
    } else {
      await writeFile(tsdownFileName, tsdownConfig, 'utf8')
      await unlink(file)
      consola.success(`Migrated \`${file}\` to \`${tsdownFileName}\``)
    }
  }

  if (!found) {
    consola.warn('No unbuild config found')
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
