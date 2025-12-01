import { render, screen, within } from '@testing-library/react'
import { App } from 'App'
import { userEvent } from '@testing-library/user-event'
import { expect } from 'vitest'

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

  const toggleThemeButton = await screen.findByRole('button', {
    name: 'Tema light',
  })
  await user.click(toggleThemeButton)

  expect(toggleThemeButton).toContainHTML('Tema dark')
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

it.skip('navigates to the user`s detail page mjs', async () => {
  const user = userEvent.setup()
  render(<App />)

  const [, mjs] = await screen.findAllByRole('article')

  await user.click(within(mjs).getByRole('link', { name: 'Mery Jane Smith' }))

  expect(
    await screen.findByRole('heading', {
      name: 'Mery Jane Smith',
      level: 1,
    }),
  ).toBeInTheDocument()
  expect(
    screen.getByRole('heading', {
      name: 'slug: mery-jane-smith',
      level: 2,
    }),
  ).toBeInTheDocument()
})

it('sets dark theme, navigate to detail to check that the theme is persisted', async () => {
  const user = userEvent.setup()
  render(<App />)

  const { 2: emilyJohnson } = await screen.findAllByRole('article')

  const toggleThemeButton = screen.getByRole('button', {
    name: 'Tema light',
  })

  await user.click(toggleThemeButton)
  await user.click(
    within(emilyJohnson).getByRole('link', { name: 'Emily Johnson' }),
  )

  await screen.findByRole('heading', {
    name: 'slug: emily-johnson',
    level: 2,
  })

  const backLink = screen.getByRole('link', { name: 'Back' })
  await user.click(backLink)

  expect(
    await screen.findByRole('button', { name: 'Tema dark' }),
  ).toBeInTheDocument()
})
