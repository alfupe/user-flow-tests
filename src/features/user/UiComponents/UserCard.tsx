import { Link } from 'react-router-dom'
import type { User } from 'features/user/Domain'

interface UserCardProps {
  user: User
}

const UserCard = ({ user }: UserCardProps) => (
  <article>
    <Link to={`${user.slug}`}>
      <h2>
        {user.firstName} {user.lastName}
      </h2>
    </Link>
  </article>
)

export { UserCard }
