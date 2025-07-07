import { render, screen } from '@testing-library/react'
import { App } from 'App'
import { expect } from 'vitest'
import { userEvent } from '@testing-library/user-event'

it('renders the user`s detail page', async () => {
  window.history.pushState({}, '', '/john-maverick')
  render(<App />)

  expect(
    await screen.findByRole('heading', {
      name: 'John Maverick',
      level: 1,
    }),
  ).toBeInTheDocument()
  expect(
    screen.getByRole('heading', {
      name: 'slug: john-maverick',
      level: 2,
    }),
  ).toBeInTheDocument()
  expect(screen.getByRole('complementary')).toContainHTML('Tema light')
})

it('cannot render the user detail page since the user due to 404', async () => {
  window.history.pushState({}, '', '/unknown-user-slug')
  render(<App />)

  expect(
    await screen.findByRole('heading', {
      name: 'Usuario no encontrado',
      level: 3,
    }),
  )
})

it('toggles theme and navigates back to home', async () => {
  window.history.pushState({}, '', '/john-maverick')
  const user = userEvent.setup()
  render(<App />)

  const aside = await screen.findByRole('complementary')
  const backButton = screen.getByRole('button', { name: 'Back' })
  await user.click(aside)
  await user.click(backButton)

  expect(
    await screen.findByRole('heading', { name: 'User list', level: 1 }),
  ).toBeVisible()
  expect(screen.getByRole('complementary')).toContainHTML('Tema dark')
})
