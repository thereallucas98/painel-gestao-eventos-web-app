// Resets the e2e json-server database from the pristine seed (run from project root).
import { copyFileSync } from 'node:fs'

copyFileSync('e2e/seed.json', 'e2e/db.json')
