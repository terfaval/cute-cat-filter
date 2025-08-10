# Cute Cat Filter

Chrome/Edge böngészőbővítmény, amely előre meghatározott kategóriákhoz tartozó kulcsszavak alapján elrejti a nemkívánatos tartalmakat és helyettük cuki macskás képeket jelenít meg.

## Telepítés (kicsomagolt verzió)
1. Töltsd le vagy klónozd ezt a repót.
2. Nyisd meg a böngészőben az `edge://extensions` vagy `chrome://extensions` oldalt.
3. Kapcsold be a **Fejlesztői módot**.
4. Válaszd a **Betöltés kicsomagolt bővítményként** opciót és tallózd be a repó mappáját.

## The Cat API kulcs
A bővítmény a [The Cat API](https://thecatapi.com/) szolgáltatást használja véletlenszerű macskaképekhez. A működéshez nem kötelező API kulcs, de ajánlott. Kulcs igényléséhez:
1. Regisztrálj a [The Cat API](https://thecatapi.com/) oldalon.
2. A kapott API kulcsot add meg a beállítások oldalon.

## Képszolgáltató kiválasztása
Az Opciók oldalon választhatsz:
- **The Cat API**: Adj meg API kulcsot a jobb minőségért és több képért.
- **CATAAS**: Kulcs nélkül működik.
Ha a választott szolgáltató nem érhető el, a bővítmény automatikusan megpróbálja a másikat.