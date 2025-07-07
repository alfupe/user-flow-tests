import { selectTheme, setTheme } from 'store/slices/theme'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { useEffect, useState } from 'react'
import type { User } from 'features/user'
import { Link } from 'react-router-dom'

const Home = () => {
  const [users, setUsers] = useState<User[]>([])
  const theme = useAppSelector(selectTheme)
  const dispatch = useAppDispatch()

  useEffect(() => {
    getUsers()
  }, [])

  const getUsers = async () => {
    const usersRequest = await fetch('https://example.com/users/')
    const users = await usersRequest.json()
    setUsers(users)
  }

  return (
    <>
      <section>
        <header>
          <h1>User list</h1>
        </header>
        {users?.map((user) => (
          <article key={user.id}>
            <Link to={`${user.slug}`}>
              <h2>
                {user.firstName} {user.lastName}
              </h2>
            </Link>
          </article>
        ))}
      </section>
      <aside onClick={() => dispatch(setTheme('dark'))}>Tema {theme}</aside>
    </>
  )
}

export { Home }
