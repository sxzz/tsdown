import process from 'node:process'
import { green, underline } from 'ansis'
import consola from 'consola'
import { migrateTsup } from './tsup'
import { migrateUnbuild } from './unbuild'

export async function migrate({
  cwd,
  dryRun,
  from,
}: {
  cwd?: string
  dryRun?: boolean
  from?: 'tsup' | 'unbuild'
}): Promise<void> {
  if (dryRun) {
    consola.info('Dry run enabled. No changes were made.')
  } else {
    const confirm = await consola.prompt(
      `Before proceeding, review the migration guide at ${underline`https://tsdown.dev/guide/migrate-from-tsup`}, as this process will modify your files.\n` +
        `Uncommitted changes will be lost. Use the ${green`--dry-run`} flag to preview changes without applying them.\n\n` +
        'Continue?',
      { type: 'confirm' },
    )
    if (!confirm) {
      consola.error('Migration cancelled.')
      process.exitCode = 1
      return
    }
  }

  if (cwd) process.chdir(cwd)

  if (from === 'unbuild') {
    return migrateUnbuild(dryRun)
  }
  // Default to tsup migration
  return migrateTsup(dryRun)
}

// rename key but keep order
export function renameKey(
  obj: Record<string, any>,
  oldKey: string,
  newKey: string,
  newValue?: any,
): Record<string, any> {
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
