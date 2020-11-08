# Założenia projektu

Celem projektu jest stworzenie platformy do zarządzania wydarzeniami.
Każdy użytkownik może stać się wydawcą wydarzenia a użytkownicy mogą takie wydarzenia przeglądać oraz się do nich zapisywać

## Użytkownicy (users)

- mogą się zarejestrować
- następnie mogą się zalogować przy pomocy maila i hasła
- mogą usunąć swoje konto
- mają możliwość sprawdzenia do jakich wydarzeń są zapisani
- hasło musi być przechowywane w bezpieczny sposób

## Wydawcy (publishers)

- użytkownik może stworzyć wydawcę
- założyciel może zapraszać inne osoby
- wydawca może mieć wielu użytkowników przypisanych do siebie
- wydawca może tworzyć wydarzenia (użytkownik nie ma takiej możliwości)

## Wydarzenia (events)

- wydarzenia mogą być przeglądane przez niezalogowane osoby
- wydarzenie ma jednego wydawcę
- do wydarzenia może się zapisać każdy zalogowany użytkownik
- jedynie sam użytkownik może się wycofać z wydarzenia, nikt inny nie może tego zrobić za niego

# Struktura

```
src/
    controllers/
    services/
    repositories/
    middlewares/
    helpers/
    exceptions/
    index.js
```
