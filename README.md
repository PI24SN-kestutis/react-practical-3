# Naudotojų katalogas

Mokymosi užduotis nr. 3 (React): `useMemo`, `useCallback` ir `React.memo`.

Tikslas – suprasti, kada reikia iš naujo filtruoti sąrašą, kada galima pakartotinai naudoti tą pačią įvykio funkciją ir kada nereikia iš naujo atvaizduoti naudotojo kortelės.

## Paleidimas

```
npm install
npm run dev
```

Kitos komandos: `npm run build`, `npm run lint`, `npm run preview`.

## Funkcionalumas

- Naudotojų duomenys įkeliami iš `/users.json` (`useEffect` komponente `App`).
- Įkėlimo metu rodoma „Kraunami naudotojai…“, nepavykus – klaidos pranešimas.
- Paieška pagal vardą (valdomas įvesties laukas), filtruojama įvedant kiekvieną simbolį.
- Kortelėje rodomas vardas, el. paštas ir miestas.
- Nesant atitikmenų – „Naudotojų nerasta.“
- Mygtukas „Valyti paiešką“ grąžina visą sąrašą.

## Duomenys

`public/users.json` – 100 naudotojų (`id`, `name`, `email`, `city`):
pirmi 10 paimti iš [JSONPlaceholder](https://jsonplaceholder.typicode.com/users), likę 90 – išgalvoti.

## Optimizavimas

| Įrankis | Kur naudojamas |
| --- | --- |
| `useMemo` | `App` – filtruotas sąrašas (priklauso nuo `users` ir paieškos teksto) |
| `useCallback` | `App` – `onSearchChange`, perduodama į `SearchBar` |
| `React.memo` | `UserCard` – nesikartoja, jei `user` objektas nepasikeitė |

## Struktūra

```
public/users.json      duomenys
src/App.jsx            duomenų įkėlimas, būsena, filtravimas
src/App.css, index.css stiliai
```

Struktūra bus papildyta pridedant komponentus `SearchBar` ir `UserCard`.
