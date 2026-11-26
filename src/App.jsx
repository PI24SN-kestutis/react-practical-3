import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const controller = new AbortController()

    async function loadUsers() {
      try {
        const response = await fetch('/users.json', {
          signal: controller.signal,
        })
        if (!response.ok) {
          throw new Error(`Serverio klaida: ${response.status}`)
        }
        const data = await response.json()
        setUsers(data)
      } catch (err) {
        if (err.name === 'AbortError') return
        setError('Nepavyko įkelti naudotojų. Bandykite dar kartą vėliau.')
      } finally {
        if (!controller.signal.aborted) setLoading(false)
      }
    }

    loadUsers()
    return () => controller.abort()
  }, [])

  return (
    <main className="app">
      <h1>Naudotojų katalogas</h1>
      {loading && <p>Kraunami naudotojai…</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && <p>Įkelta naudotojų: {users.length}</p>}
    </main>
  )
}

export default App
