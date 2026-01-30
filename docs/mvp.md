# Zapasio - Zarządzaj zasobami

## Cel Projektu

Wyeliminowanie marnowania żywności i stresu związanego z brakiem produktów poprzez cyfrowe zarządzanie zapasami w trybie offline.

## Specyfikacja Techniczna (MVP)

• Framework: React Native (Expo)

• Baza danych: SQLite (`expo-sqlite`) - przechowywanie lokalne

• Skanowanie: `expo-barcode-scanner`

## Funkcje MVP:

### 1. Zarządzanie Produktami (CRUD)

• Dodawanie: Formularz (nazwa, ilość, kategoria, data ważności).

• Podgląd: Lista produktów z automatycznym sortowaniem według najkrótszej daty ważności.

• Edycja: Szybka zmiana ilości (przyciski +/-) na głównym widoku.

• Usuwanie: Pozbywanie się produktów z bazy po ich zużyciu.

### 2. Inteligentny Skaner

• Integracja z aparatem w celu pobrania numeru kodu kreskowego.

• Automatyczne uzupełnianie pola kodu w formularzu dodawania produktu.

### 3. Logika Danych

• Lokalna trwałość danych (dane nie znikają po zamknięciu aplikacji).

• System priorytetyzacji: produkty psujące się najszybciej na górze listy.

### Struktura Bazy Danych

| Pole        | Typ                 | Opis                                       |
| :---------- | :------------------ | :----------------------------------------- |
| id          | INTEGER PRIMARY KEY | Unikalny identyfikator                     |
| barcode     | TEXT                | Numer kodu kreskowego (może być NULL)      |
| name        | TEXT                | Nazwa produktu (np. "Mleko")               |
| quantity    | REAL                | Ilość (obsługa ułamków, np. 0.5 kg)        |
| unit        | TEXT                | Jednostka (szt, kg, l)                     |
| expiry_date | TEXT                | Data w formacie ISO8601 (łatwe sortowanie) |
| category    | TEXT                | Tagowanie (np. "Nabiał", "Spiżarnia")      |
