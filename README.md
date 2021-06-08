# Wstęp

## Jak zacząć korzystać z tego repozytorium?
Na początek zainstaluj program git lub skorzystaj z klientów które Ci to ułatwią, jak np. [GitHub Desktop](https://desktop.github.com/) (preferowane) czy [SourceTree](https://www.sourcetreeapp.com/). 

Następnie, w zależności od wybranego rozwiązania sklonuj to repozytorium na swój dysk lokalny - w klientach można to wyklikać, przy korzystaniu z "czystego" gita [sprawdź ten tutorial](https://docs.github.com/en/github/creating-cloning-and-archiving-repositories/cloning-a-repository-from-github/cloning-a-repository).

## Poruszanie się po wersjach kodu
Każda lekcja która kontrybuuje jakąś funkcjonalność do tego kodu jest osobnym commitem, oraz są też wyróżnione dwie ważne części - ukończenie boilerplate'a ([tag boilerplate](https://github.com/sdomagala/events-platform-api/tree/boilerplate)) oraz sfinalizowanie wyglądu naszej bazy danych ([tag database-final-model](https://github.com/sdomagala/events-platform-api/tree/database-final-model)).

Zachęcam do samodzielnego pisania kodu razem ze mną, a jedynie porównywanie tego co się zmieniło między lekcjami.

### [Lista commitów](https://github.com/sdomagala/events-platform-api/commits/master)

![image](https://user-images.githubusercontent.com/6019897/121243002-81523080-c89d-11eb-920d-e8ed3149603a.png)

Po kliknięciu w (1) zostaniesz przekierowany na wersję kodu taką jak wyglądała po tym commicie.

Po kliknięciu w (2) zobaczysz deltę zmian które zostały dodane w tym commicie względem poprzedniego.


-----------------------

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

# Instalacja bazy danych

```sh
sudo apt-get update
sudo apt-get install curl ca-certificates gnupg
curl https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo apt-key add -
sudo apt install postgresql-common
sudo sh /usr/share/postgresql-common/pgdg/apt.postgresql.org.sh
sudo apt-get install postgresql-11

sudo service postgresql start

sudo -u postgres psql
CREATE DATABASE events

sudo -u postgres psql events

\password postgres
admin
admin
```


## Zachęcam do pozostawiania uwag/potencjalnych ulepszeń w tym repozytorium (odpowiednio zakładki Issues i Pull Requests) czy też poprzez stronę kursu! 
