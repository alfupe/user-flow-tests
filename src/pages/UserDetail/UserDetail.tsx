import type { User } from 'features/user'
import { useEffect, useState } from 'react'
import { selectTheme, toggleTheme } from 'store/slices/theme'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { useNavigate } from 'react-router-dom'

const UserDetail = () => {
  const slug = 'john-maverick'
  const [user, setUser] = useState<User | null>(null)
  const theme = useAppSelector(selectTheme)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  useEffect(() => {
    getUserBySlug(slug)
  }, [])

  const getUserBySlug = async (slug: string) => {
    const userRequest = await fetch(`https://example.com/users/${slug}`)
    const user = await userRequest.json()
    setUser(user)
  }

  if (!user) return null

  return (
    <>
      <article>
        <h1>
          {user.firstName} {user.lastName}
        </h1>
        <h2>slug: {user.slug}</h2>
      </article>
      <aside onClick={() => dispatch(toggleTheme())}>Tema {theme}</aside>
      <button onClick={() => navigate('/')}>Back</button>
    </>
  )
}

export { UserDetail }
