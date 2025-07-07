import { render, screen, within } from '@testing-library/react'
import { App } from 'App'
import { userEvent } from '@testing-library/user-event'

it('renders the Home page', () => {
  render(<App />)

  const aside = screen.getByRole('complementary')

  expect(screen.getByRole('heading', { name: 'User list', level: 1 }))
  expect(aside).toContainHTML('Tema light')
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

it('set dark theme and navigates to the user`s detail page', async () => {
  const user = userEvent.setup()
  render(<App />)

  const [john] = await screen.findAllByRole('article')
  const aside = screen.getByRole('complementary')

  await user.click(within(john).getByRole('link', { name: 'John Maverick' }))
  await user.click(aside)

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
  expect(aside).toContainHTML('Tema light')
})
