import { expect, test } from '@playwright/test'

test('mostra "Nenhum resultado" para busca sem correspondência', async ({
  page,
}) => {
  await page.goto('/eventos')
  await page.getByRole('textbox', { name: 'Buscar' }).fill('zzzxxx-inexistente')
  await expect(page.getByText('Nenhum resultado')).toBeVisible()
})

test('mostra erro e "Tentar novamente" quando a API falha', async ({
  page,
}) => {
  await page.route('**/events', (route) => route.abort())
  await page.goto('/eventos')
  await expect(
    page.getByText('Não foi possível carregar os eventos.'),
  ).toBeVisible()
  await expect(
    page.getByRole('button', { name: 'Tentar novamente' }),
  ).toBeVisible()
})
