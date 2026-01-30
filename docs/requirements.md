# Wymagania technologiczne

## Technologia podstawowa:

React native

## System kontroli wersji (VCS) Git

Sklonowanie repozytorium
Tworzenie branchy
Rozwiązywanie konfliktów
Łączenie branchy (merge)
Podstawowe CI/CD (Continous Integration and Continous Development) przy użyciu Github actions
Pull request przy merge
(może testowanie przy commit)
(może deploy do firebase)
Figma
Projekt graficzny stworzony w Figmie
Baza danych własnego wyboru do zapisywania danych użytkowników i danych aplikacji
Połączenie z API (Rest API albo GraphQL)

## Wymagania biznesowe

API (REST)
Minimum:

GET (lista)
GET (szczegóły)
POST (tworzenie)
PUT/PATCH (aktualizacja)
DELETE (usuwanie)

## Funkcja natywna

Warianty do wyboru:

aparat (zdjęcia)
skaner kodów QR / barcode

## CI/CD

Pipeline GitHub Actions:

lint
test
build na emulator (lub flutter build apk / npx expo build)
Pipeline musi uruchamiać się:

przy PR → feature → main
przy pushu na main
Git (Github)
Każdy projekt MUSI zawierać:

branch main
branch develop
minimum 5 feature branchy:
feature/ui
feature/api
feature/native
feature/storage
feature/tests
Obowiązkowo:

co najmniej 2 Pull Requesty na develop
finalny merge develop → main
README (dokumentacja projektu)
Dokumentacja końcowa
W folderze /docs:

opis API
opis funkcji natywnej
screeny aplikacji
