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

it('toggles theme and navigates back to home', async () => {
  window.history.pushState({}, '', '/john-maverick')
  const user = userEvent.setup()
  render(<App />)

  const aside = await screen.findByRole('complementary')
  const backButton = screen.getByRole('button', { name: 'Back' })
  await user.click(aside)
  await user.click(backButton)

  expect(await screen.findByRole('heading', { name: 'User list', level: 1 }))
  expect(screen.getByRole('complementary')).toContainHTML('Tema dark')
})
