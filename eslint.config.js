import { sxzz } from '@sxzz/eslint-config'

export default sxzz({
  pnpm: true,
})
  .append({
    files: ['examples/**'],
    rules: {
      'pnpm/json-enforce-catalog': 'off',
    },
  })
  .append({
    files: ['docs/**/*.md/**'],
    rules: {
      'unicorn/prefer-node-protocol': 'off',
    },
  })
