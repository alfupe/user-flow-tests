import type { User } from 'features/user'
import { useEffect, useState } from 'react'
import { selectTheme, toggleTheme } from 'store/slices/theme'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { Link, useParams } from 'react-router-dom'

const UserDetail = () => {
  const { slug } = useParams()
  const [user, setUser] = useState<User | null>(null)
  const [error, setError] = useState(false)
  const theme = useAppSelector(selectTheme)
  const dispatch = useAppDispatch()

  useEffect(() => {
    void getUserBySlug(slug as string)
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
    <section>
      <header>
        <nav>
          <Link to="/">Back</Link>
        </nav>
        <button onClick={() => dispatch(toggleTheme())}>Tema {theme}</button>
      </header>
      <article>
        <h1>
          {user.firstName} {user.lastName}
        </h1>
        <h2>slug: {user.slug}</h2>
      </article>
    </section>
  )
}

export { UserDetail }
