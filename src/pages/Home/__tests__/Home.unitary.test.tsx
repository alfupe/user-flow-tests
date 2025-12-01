import { render, screen } from '@testing-library/react'
import { UserCard } from 'features/user/UiComponents'
import { MemoryRouter } from 'react-router-dom'

it('renders the UserCard component', () => {
  render(
    <MemoryRouter>
      <UserCard
        user={{
          id: 'a8b1bafa-939f-4c1f-b2f8-da2737a84e72',
          slug: 'mery-jane-smith',
          firstName: 'Mery Jane',
          lastName: 'Smith',
        }}
      />
    </MemoryRouter>,
  )

  expect(
    screen.getByRole('heading', { name: 'Mery Jane Smith', level: 2 }),
  ).toBeInTheDocument()
})
