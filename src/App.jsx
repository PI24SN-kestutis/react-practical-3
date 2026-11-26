import { useEffect, useState } from 'react'
import UserCard from './components/UserCard'
import './App.css'

/**
 * Pagrindinis komponentas: įkelia naudotojų duomenis ir valdo
 * įkėlimo būseną (kraunama / klaida / paruošta).
 */
function App() {
  // Visi įkelti naudotojai (šaltinis, kurio vėliau nekeičiame).
  const [users, setUsers] = useState([])
  // true, kol laukiame atsakymo iš /users.json.
  const [loading, setLoading] = useState(true)
  // Klaidos pranešimas naudotojui arba null, jei klaidos nėra.
  const [error, setError] = useState(null)

  // Duomenys įkeliami vieną kartą, komponentui pirmą kartą atsiradus ekrane.
  useEffect(() => {
    // Leidžia nutraukti užklausą, jei komponentas pašalinamas
    // (pvz., dvigubas efekto paleidimas StrictMode režime).
    const controller = new AbortController()

    async function loadUsers() {
      try {
        const response = await fetch('/users.json', {
          signal: controller.signal,
        })
        // fetch nemeta klaidos esant 404/500, todėl tikriname patys.
        if (!response.ok) {
          throw new Error(`Serverio klaida: ${response.status}`)
        }
        const data = await response.json()
        setUsers(data)
      } catch (err) {
        // Nutraukta užklausa nėra tikra klaida – nieko nerodome.
        if (err.name === 'AbortError') return
        setError('Nepavyko įkelti naudotojų. Bandykite dar kartą vėliau.')
      } finally {
        // Nutrauktos užklausos atveju būsenos neliečiame.
        if (!controller.signal.aborted) setLoading(false)
      }
    }

    loadUsers()
    // Valymas: nutraukiame vykstančią užklausą.
    return () => controller.abort()
  }, [])

  return (
    <main className="app">
      <h1>Naudotojų katalogas</h1>
      {loading && <p>Kraunami naudotojai…</p>}
      {error && <p className="error">{error}</p>}
      {/* Sąrašas rodomas tik tada, kai duomenys sėkmingai įkelti.
          key = unikalus id, kad React teisingai atpažintų kortelę. */}
      {!loading && !error && (
        <div className="user-list">
          {users.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      )}
    </main>
  )
}

export default App
