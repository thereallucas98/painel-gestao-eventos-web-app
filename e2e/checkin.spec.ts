import { expect, test } from '@playwright/test'

// Roda contra o json-server de teste (e2e/seed.json, resetado a cada run).
test.describe('check-in', () => {
  test('confirma o check-in de um Normal e atualiza o estado', async ({
    page,
  }) => {
    await page.goto('/eventos/EVT-TEST')
    await page
      .getByRole('button', { name: 'Abrir credencial de Ana Normal' })
      .click()

    const dialog = page.getByRole('dialog')
    await expect(dialog).toBeVisible()
    await dialog
      .getByRole('button', { name: 'Deslize para confirmar check-in' })
      .press('Enter')

    // Feedback de sucesso vem por modal (não toast).
    await expect(page.getByText('Check-in confirmado')).toBeVisible()
    await page.getByRole('button', { name: 'Concluir' }).click()

    await expect(
      page
        .getByRole('row')
        .filter({ hasText: 'Ana Normal' })
        .getByText('Dentro'),
    ).toBeVisible()
  })

  test('bloqueia o 2º check-in de um Normal com motivo', async ({ page }) => {
    await page.goto('/eventos/EVT-TEST')
    await page
      .getByRole('button', { name: 'Abrir credencial de Bea Repetida' })
      .click()

    const dialog = page.getByRole('dialog')
    await expect(
      dialog.getByText('Participante já realizou check-in'),
    ).toBeVisible()
    await expect(
      dialog.getByRole('button', { name: /Deslize para confirmar/ }),
    ).toHaveCount(0)
  })
})
