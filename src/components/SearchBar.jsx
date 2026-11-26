import './SearchBar.css'

/**
 * Paieškos juosta: valdomas įvesties laukas ir mygtukas „Valyti paiešką“.
 * Props:
 *  - searchText: dabartinis paieškos tekstas (laukas yra valdomas)
 *  - onSearchChange(text): iškviečiama su nauju tekstu; valymas = onSearchChange('')
 */
function SearchBar({ searchText, onSearchChange }) {
  return (
    <div className="search-bar">
      <label className="search-bar__label" htmlFor="search-input">
        Ieškoti pagal vardą
      </label>
      <div className="search-bar__row">
        <input
          id="search-input"
          className="search-bar__input"
          type="text"
          value={searchText}
          onChange={(event) => onSearchChange(event.target.value)}
        />
        <button
          type="button"
          className="search-bar__clear"
          onClick={() => onSearchChange('')}
        >
          Valyti paiešką
        </button>
      </div>
    </div>
  )
}

export default SearchBar
