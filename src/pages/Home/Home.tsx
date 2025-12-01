import { selectTheme, toggleTheme } from 'store/slices/theme'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { useEffect, useState } from 'react'
import type { User } from 'features/user'
import { Link } from 'react-router-dom'

const Home = () => {
  const [users, setUsers] = useState<User[]>([])
  const theme = useAppSelector(selectTheme)
  const dispatch = useAppDispatch()

  useEffect(() => {
    void getUsers()
  }, [])

  const getUsers = async () => {
    const usersRequest = await fetch('https://example.com/users/')
    const users = await usersRequest.json()
    setUsers(users)
  }

  return (
    <section>
      <header>
        <h1>User list</h1>
        <button onClick={() => dispatch(toggleTheme())}>Tema {theme}</button>
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
  )
}

export { Home }
