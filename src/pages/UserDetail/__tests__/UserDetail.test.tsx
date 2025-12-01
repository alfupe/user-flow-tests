import { render, screen } from '@testing-library/react'
import { App } from 'App'
import { userEvent } from '@testing-library/user-event'
import { goBackToHome, toggleTheme } from 'pages/__tests__/helpers'

it('renders the user`s detail page', async () => {
  window.history.pushState({}, '', '/john-maverick')
  render(<App />)

  const toggleThemeButton = await screen.findByRole('button', {
    name: 'Tema light',
  })

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
  expect(toggleThemeButton).toBeInTheDocument()
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

  const toggleThemeButton = await screen.findByRole('button', {
    name: 'Tema light',
  })

  await toggleTheme(user)
  expect(toggleThemeButton).toContainHTML('Tema dark')

  await toggleTheme(user, 'dark')
  expect(toggleThemeButton).toContainHTML('Tema light')

  await goBackToHome(user)
  expect(
    await screen.findByRole('heading', { name: 'User list', level: 1 }),
  ).toBeVisible()
})
