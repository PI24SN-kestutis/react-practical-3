import { useEffect, useMemo, useState } from 'react'
import SearchBar from './components/SearchBar'
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
  // Dabartinis paieškos tekstas (vienintelė paieškos būsena).
  const [searchText, setSearchText] = useState('')

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

  // Paieškos teksto keitimo funkcija. SearchBar ją kviečia ir įvedant,
  // ir valant (onSearchChange('')). Optimizavimas (useCallback) – vėliau.
  function onSearchChange(text) {
    setSearchText(text)
  }

  // Filtruojame jau įkeltus duomenis pagal vardo dalį (be didžiųjų/mažųjų
  // raidžių skirtumo). Rezultatui atskiros būsenos nereikia – jis
  // išvedamas iš users ir searchText.
  // useMemo: filtravimas kartojamas tik pasikeitus users arba searchText;
  // kitų perpiešimų metu (pvz., pasikeitus loading) naudojamas
  // anksčiau apskaičiuotas rezultatas.
  const filteredUsers = useMemo(() => {
    const query = searchText.trim().toLowerCase()
    return users.filter((user) => user.name.toLowerCase().includes(query))
  }, [users, searchText])

  return (
    <main className="app">
      <h1>Naudotojų katalogas</h1>
      {loading && <p>Kraunami naudotojai…</p>}
      {error && <p className="error">{error}</p>}
      <SearchBar searchText={searchText} onSearchChange={onSearchChange} />
      {/* Sąrašas rodomas tik tada, kai duomenys sėkmingai įkelti.
          key = unikalus id, kad React teisingai atpažintų kortelę. */}
      {!loading && !error && filteredUsers.length === 0 && (
        <p>Naudotojų nerasta.</p>
      )}
      {!loading && !error && filteredUsers.length > 0 && (
        <div className="user-list">
          {filteredUsers.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      )}
    </main>
  )
}

export default App
