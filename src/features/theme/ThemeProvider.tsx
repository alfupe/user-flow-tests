import { useSelector } from 'react-redux'
import { selectTheme } from 'store/slices/theme'
import { useEffect } from 'react'

const ThemeProvider = () => {
  const theme = useSelector(selectTheme)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme.toString())
  }, [theme])

  return null
}

export { ThemeProvider }
