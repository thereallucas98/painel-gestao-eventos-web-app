import { copyFileSync } from 'node:fs'

/**
 * Resets the e2e database from the seed before every run. The json-server is
 * started with `--watch`, so it reloads the fresh data even when reused.
 */
export default function globalSetup() {
  copyFileSync('e2e/seed.json', 'e2e/db.json')
}
