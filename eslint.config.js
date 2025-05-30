import { sxzz } from '@sxzz/eslint-config'

export default sxzz({
  pnpm: true,
}).append({
  files: ['examples/**'],
  rules: {
    'pnpm/json-enforce-catalog': 'off',
  },
})
