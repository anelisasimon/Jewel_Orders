# Jurnal AI, Etapa 8: navigare și stilizare pe componente

**Instrument folosit:** Claude (Anthropic), în conversație.

## Ce am cerut
Am dat ghidul etapei și fișierele mele din Etapa 7 și am cerut adaptarea la
JewelOrders: React Router, pagină de detaliu pe `/comenzi/:id`, pagină Despre,
pagină 404 și mutarea stilurilor în CSS Modules. Ulterior am cerut un catalog
de produse prestabilite, cu imagini, o opțiune de piesă personalizată și
alegerea între ridicare din magazin și livrare la adresă.

## Ce a produs instrumentul
`Layout` cu `NavLink` și `Outlet`, `ComenziPage` (conținutul vechi din
`App.jsx`), `ComandaDetaliuPage` cu `useParams` și `fetchComanda`, `DesprePage`,
`NotFoundPage`, `constants.js`, `index.css` doar cu stiluri comune și câte un
`.module.css` pentru fiecare componentă și pagină. Notificările și tema au fost
mutate în `Layout`, ca să funcționeze pe toate paginile. Pentru catalog:
`catalog.js`, `CatalogPicker`, `ProductImage` (ilustrații SVG, nu fotografii) și
câmpurile noi din `OrderForm` (produs, descriere, primirea comenzii, adresă).

## Probleme întâmpinate și cum le-am rezolvat
- După copierea fișierelor a apărut eroarea `Failed to resolve import
  "react-router-dom"`: pachetul nu era instalat. Am rulat
  `npm install react-router-dom` în folderul `frontend`.
- [Adaugă alte probleme reale, de exemplu fișiere copiate în locul greșit, sau
  scrie doar ce ți s-a întâmplat cu adevărat.]

## Ce am verificat eu
[Completează cu ce ai testat efectiv: click pe titlu, butonul Înapoi,
reîncărcare pe /comenzi/1, /comenzi/999, /ceva, fila Network fără cereri de
document HTML, comenzile din consolă pentru data-testid, adăugarea unei comenzi
din catalog și a uneia cu livrare la adresă, npm run build fără erori.]

## Ce am înțeles / ce am învățat
[Completează cu cuvintele tale: ce face Outlet, de ce NavLink are `end`, de ce
useParams întoarce text, de ce efectul din detaliu depinde de [id], ce rezolvă
CSS Modules, de ce formularul așteaptă serverul înainte să modifice state-ul.]

## Modificări făcute de mine peste codul generat
[Completează sau scrie „niciuna”. De exemplu: am schimbat prețurile din
catalog, textele, datele de contact din subsol.]