# Jurnal AI, Etapa 7: formular și validare

**Instrument folosit:** Claude (Anthropic), în conversație.

## Ce am cerut
Am dat ghidul etapei și am cerut adaptarea la formularul meu existent: validare, cereri POST/PATCH/DELETE, prevenirea trimiterii duble, `tw.json` și atributele `data-testid`.

## Ce a produs instrumentul
`api.js` cu funcția comună `request` și funcțiile CRUD, `OrderForm.jsx` ca formular controlat și validat (cu `noValidate`, mesaj de eroare în pagină, buton dezactivat cât se trimite), actualizările din `App.jsx` care așteaptă serverul înainte să modifice state-ul, `tw.json` și atributele `data-testid` pe formular și pe cardurile de comenzi.

## Probleme întâmpinate și cum le-am rezolvat
[Completează cu problemele pe care le-ai avut la această etapă, dacă au existat, sau scrie „nu au apărut probleme”.]

## Ce am verificat eu
[Completează: am trimis formularul gol și am văzut mesajul, am adăugat o comandă și a rămas după reîncărcare, am oprit API-ul și textul a rămas în câmpuri, am rulat comanda din consolă pentru data-testid.]

## Ce am înțeles / ce am învățat
[Completează cu cuvintele tale: ce înseamnă formular controlat, de ce se așteaptă serverul înainte să se modifice state-ul, de ce handleAdd nu prinde eroarea.]

## Modificări făcute de mine peste codul generat
[Completează sau scrie „niciuna”, dacă e cazul.]