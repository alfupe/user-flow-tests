import { screen, within } from '@testing-library/react'
import type { UserEvent } from '@testing-library/user-event'

const toggleTheme = (user: UserEvent, currentTheme = 'light') => {
  const toggleThemeButton = screen.getByRole('button', {
    name: `Tema ${currentTheme}`,
  })

  return user.click(toggleThemeButton)
}

const navigateToJohnMaverickDetail = (user: UserEvent) => {
  const [john] = screen.getAllByRole('article')

  return user.click(within(john).getByRole('link', { name: 'John Maverick' }))
}

const navigateToEmilyJohnsonDetail = (user: UserEvent) => {
  const { 2: emilyJohnson } = screen.getAllByRole('article')

  return user.click(
    within(emilyJohnson).getByRole('link', { name: 'Emily Johnson' }),
  )
}

const goBackToHome = (user: UserEvent) => {
  const backLink = screen.getByRole('link', { name: 'Back' })
  return user.click(backLink)
}

export {
  toggleTheme,
  navigateToJohnMaverickDetail,
  navigateToEmilyJohnsonDetail,
  goBackToHome,
}
