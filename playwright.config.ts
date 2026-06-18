import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './e2e',
  globalSetup: './e2e/global-setup.ts',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 0,
  reporter: 'list',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: [
    {
      // Sempre sobe o próprio json-server (db de teste); não reusa o api do db dev.
      command: 'pnpm api:e2e',
      port: 3001,
      reuseExistingServer: false,
      timeout: 60_000,
    },
    {
      command: 'pnpm dev',
      port: 3000,
      reuseExistingServer: true,
      timeout: 120_000,
    },
  ],
})
