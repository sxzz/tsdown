import process from 'node:process'
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
