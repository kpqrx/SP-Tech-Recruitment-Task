# SP Tech - zadanie rekrutacyjne

## Konfigurator ofert dla firmy świadczącej usługi telekomunikacyjne

### Wprowadzenie

Konfigurator przeprowadza uzytkownika przez dwa kroki w których ten wybiera interesujące go usługi i okres trwania umowy.

Algorytm na podstawie zebranych informacji przygotowuje najkorzystniejszą ofertę, którą w trzecim kroku przedstawia uzytkownikowi prezentując miesięcznie koszta abonamentu na dla wybranych lat.

Uzytkownik moze w dowolnej chwili powrócić do poprzednich kroków dopasowując kryteria oferty. Wówczas algorytm przetworzy informacje ponownie i zaproponuje nową ofertę uwzględniającą aktualne kryteria.

[Szczegóły zadania](https://www.sptech.pl/_files/ugd/764a63_50328068d6fd4a6e9f581c79eb90b7e9.pdf)

### Wykorzystane technologie

- React
- Vite
- TypeScript
- Styled Components
- Redux
- Framer Motion
- Mock Service Worker
- Storybook

### Roadmap

- 5 maja:
  - [x] analiza problemu
  - [x] przygotowanie makiet - [Figma](https://www.figma.com/file/2kv37BvNj3hucj2qLP23fn)
  - [x] przygotowanie projektu: instalacja bibliotek i konfiguracja
  - [x] przygotowanie zestawu danych
- 6 maja:
  - [x] przygotowanie komponentów
- 7 - 10 maja
  - [ ] rozwój aplikacji
- 11 maja:
  - [ ] testy
  - [ ] poprawki

### Algorytm odnajdowania najkorzystniejszej oferty

1. Na podstawie wybranych usług skomponuj wszystkie mozliwe oferty:
   - z samych usług,
   - z kombinacji pakietów i usług.
2. Dla kazdej oferty w puli zsumuj miesięczne koszta abonamentu w skali wybranych lat.
3. Zsumuj miesięczne koszta w skali lat. <br />
   Uzyskane sumy stanowią **kryterium w ocenie korzystności** danej oferty.
4. Wybierz minimum spośród uzyskanych kryterów. <br />
   Oferta reprezentowana przez **najmniejsze kryterium** jest **najkorzystniejszą ofertą**.
