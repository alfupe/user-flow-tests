import { render, screen } from '@testing-library/react'
import { App } from 'App'
import { expect } from 'vitest'

describe('App', () => {
  it('renders the App component', () => {
    render(<App />)

    expect(screen.getAllByRole('heading', { name: 'Hello World!', level: 1 }))
  })
})
