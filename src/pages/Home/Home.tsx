import { selectTheme, toggleTheme } from 'store/slices/theme'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { useEffect, useState } from 'react'
import type { User } from 'features/user'
import { UserCard } from 'features/user/UiComponents'

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
        <UserCard user={user} key={user.id} />
      ))}
    </section>
  )
}

export { Home }
