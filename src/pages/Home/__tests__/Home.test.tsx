import { render, screen, within } from '@testing-library/react'
import { App } from 'App'
import { userEvent } from '@testing-library/user-event'
import {
  goBackToHome,
  navigateToEmilyJohnsonDetail,
  navigateToJohnMaverickDetail,
  toggleTheme,
} from 'pages/__tests__/helpers'

it('renders the Home page', () => {
  render(<App />)

  expect(screen.getByRole('heading', { name: 'User list', level: 1 }))
  expect(
    screen.getByRole('button', {
      name: 'Tema light',
    }),
  ).toBeInTheDocument()
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

it('toggles theme', async () => {
  const user = userEvent.setup()
  render(<App />)

  await toggleTheme(user)

  expect(
    await screen.findByRole('button', {
      name: 'Tema dark',
    }),
  ).toBeInTheDocument()
})

it('navigates to the user`s detail page', async () => {
  const user = userEvent.setup()
  render(<App />)

  await screen.findAllByRole('article')

  await navigateToJohnMaverickDetail(user)

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

it('sets dark theme, navigate to detail to check that the theme is persisted', async () => {
  const user = userEvent.setup()
  render(<App />)

  await screen.findAllByRole('article')

  await toggleTheme(user)
  await navigateToEmilyJohnsonDetail(user)

  await screen.findByRole('heading', {
    name: 'slug: emily-johnson',
    level: 2,
  })

  await goBackToHome(user)

  expect(
    await screen.findByRole('button', { name: 'Tema dark' }),
  ).toBeInTheDocument()
})
