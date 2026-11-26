import './UserCard.css'

/**
 * Naudotojo kortelė: rodo vardą, el. paštą ir miestą.
 * Props:
 *  - user: naudotojo objektas { id, name, email, city }
 * (React.memo bus pridėtas vėlesniame žingsnyje.)
 */
function UserCard({ user }) {
  return (
    <article className="user-card">
      <h2 className="user-card__name">{user.name}</h2>
      <p className="user-card__line">{user.email}</p>
      <p className="user-card__line">{user.city}</p>
    </article>
  )
}

export default UserCard
