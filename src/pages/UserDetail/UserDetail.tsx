import type { User } from 'features/user'
import { useEffect, useState } from 'react'
import { selectTheme, toggleTheme } from 'store/slices/theme'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { useNavigate, useParams } from 'react-router-dom'

const UserDetail = () => {
  const { slug } = useParams()
  const [user, setUser] = useState<User | null>(null)
  const [error, setError] = useState(false)
  const theme = useAppSelector(selectTheme)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!slug) return
    void getUserBySlug(slug)
  }, [slug])

  const getUserBySlug = async (slug: string) => {
    try {
      setError(false)
      const userRequest = await fetch(`https://example.com/users/${slug}`)
      const user = await userRequest.json()
      setUser(user)
    } catch {
      setError(true)
    }
  }

  if (error) return <h3>Usuario no encontrado</h3>
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
