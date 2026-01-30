# UX/UI

## 1. Architektura Informacji (Mapa Ekranów)

Układ Tab Bar (dolne menu) z 3 głównymi sekcjami:

Ekran Główny (Dashboard): Lista produktów posortowana według daty ważności. To tu dzieje się 90% interakcji.

Skaner / Dodaj: Szybki dostęp do aparatu i formularza (najlepiej jako wyróżniony przycisk na środku).

Ustawienia / Kategorie: Zarządzanie słownikiem jednostek (kg, szt, l) lub kategoriami.

## 2. User Flow (Ścieżka Użytkownika)

Najważniejszym procesem w Twojej aplikacji jest dodawanie produktu. Wygląda to tak:

Start: Użytkownik klika ikonę "+" (lub skanera).

Akcja: Skanuje kod kreskowy.

Logika: \* Jeśli kod jest nowy: Otwiera się formularz z uzupełnionym ID, użytkownik wpisuje tylko nazwę i datę.

Jeśli kod już był w bazie: Aplikacja pyta: "Czy chcesz dodać kolejną sztukę [Nazwa]?", co skraca proces do jednego kliknięcia.

Koniec: Produkt pojawia się na górze listy (jeśli ma krótką datę).

## 3. Wireframe (Szkic Interfejsu)

Wyobraźmy sobie główny ekran (Dashboard):

Góra: Wyszukiwarka i filtr (np. "Tylko kończące się").

Środek (Lista): Karty produktów.

Lewa strona: Kolorowy wskaźnik (Zielony -> Dobry, Żółty -> Kończy się, Czerwony -> Przeterminowany).

Centrum: Nazwa, kategoria i data.

Prawa strona: Duże przyciski + i - oraz aktualna ilość.

Dół: Menu nawigacyjne.

## 4. Wytyczne UI dla React Native Expo

Jako że budujesz to w React Native, warto trzymać się kilku zasad, by uniknąć problemów technicznych:

Safe Area View: Musimy pamiętać o "notchu" w iPhone'ach i pasku systemowym w Androidzie.

Native Feedback: Przy klikaniu przycisków + / - warto dodać delikatne wibracje (expo-haptics), co daje poczucie "fizyczności" zarządzania zapasami.

Date Picker: Użyjemy systemowego kalendarza, aby wprowadzanie daty było szybkie.
