import { render, screen, within } from '@testing-library/react'
import { App } from 'App'
import { userEvent } from '@testing-library/user-event'

it('renders the Home page', () => {
  render(<App />)

  const setLightThemeButton = screen.getByRole('button', {
    name: 'Cambiar a tema light',
  })
  const setDarkThemeButton = screen.getByRole('button', {
    name: 'Cambiar a tema light',
  })

  expect(screen.getByRole('heading', { name: 'User list', level: 1 }))
  expect(setLightThemeButton).toBeInTheDocument()
  expect(setDarkThemeButton).toBeInTheDocument()
})

it('renders the user list', async () => {
  render(<App />)

  const users = await screen.findAllByRole('article')

  expect(screen.getByRole('heading', { name: 'User list', level: 1 }))
  expect(users).toHaveLength(3)
})

it('renders the user card contents', async () => {
  render(<App />)

  const [john] = await screen.findAllByRole('article')

  expect(
    within(john).getByRole('heading', { name: 'John Maverick', level: 2 }),
  ).toBeInTheDocument()
})

it('set dark theme', async () => {
  const user = userEvent.setup()
  render(<App />)

  const setDarkThemeButton = screen.getByRole('button', {
    name: 'Cambiar a tema dark',
  })

  await user.click(setDarkThemeButton)

  expect(
    await screen.findByRole('heading', { name: 'Tema dark' }),
  ).toBeInTheDocument()
})

it('set light theme', async () => {
  const user = userEvent.setup()
  render(<App />)

  await screen.findAllByRole('article')

  const setLightThemeButton = screen.getByRole('button', {
    name: 'Cambiar a tema light',
  })
  screen.debug()
  await user.click(setLightThemeButton)

  expect(
    await screen.findByRole('heading', { name: 'Tema light' }),
  ).toBeInTheDocument()
})

it('navigates to the user`s detail page', async () => {
  const user = userEvent.setup()
  render(<App />)

  const [john] = await screen.findAllByRole('article')

  await user.click(within(john).getByRole('link', { name: 'John Maverick' }))

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
})
