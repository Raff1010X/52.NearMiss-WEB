# Near-Miss Reporting Web App

Demo: https://zpw.webdev.priv.pl/


Przy logowaniu należy użyć danych: 
- email: rafal.anonim@acme.pl
- password: test123456

Użytkownik spoza domeny @acme.pl może tylko zgłaszać zagrożenia i niebezpieczne zdarzenia.


My git repo: https://github.com/Raff1010X/01.Roadmap

# Rejestr zagrożeń i niebezpiecznych zdarzeń na terenie firmy ACME
## Założenia
A. Strona główna:
<br>- prezentacja idei zgłaszania zagrożeń i niebezpiecznych zdarzeń.

B. Strona logowania:
<br>- rejestracja użytkownika, 
<br>- logowanie do aplikacji, 
<br>- odzyskiwanie hasła przez użytkownika, 
<br>- logowanie z wykorzystaniem tokenów JWT i CRSF,
<br>- różne role/uprawnienia użytkowników:
<br> -- użytkownik wewnętrzny z domeny @acme.pl z dostępem do wszystkich funkcjonalności aplikacji,
<br> -- użytkownik zewnętrzny z innej domeny niż @acme.pl może tylko zgłaszać zagrożenia i niebezpieczne zdarzenia,

C. Strona formularza zgłoszenia:
<br>- zbieranie danych o zagrożeniu/zdarzeniu niebezpiecznym, 
<br>- przesłanie danych i plików graficznych na serwer.

D. Strona rejestru zagrożeń:
<br>- wyszukiwarka zgłoszeń wg różnych kryteriów,
<br>- tabela zgłoszeń, 
<br>- sortowanie pól tabeli, 
<br>- zmiana zakresu prezentowanych danych,
<br>- przejście do strony zgłoszenia,
<br>- paginacja tabeli,
<br>- przejście do wybranej strony rejestru i wyników wyszukiwania.

E. Strona zgłoszenia:
<br>- prezentacja danych pojedynczego zgłoszenia, 
<br>- możliwość odnotowania w rejestrze, że wykonano działania zapobiegające zagrożeniu, 
<br>- możliwość przejścia do kolejnego/poprzedniego zgłoszenia w rejestrze i wynikach wyszukiwania.

F. Strona statystyk:
<br>- prezentacja graficzna statystyk zgłoszeń.

G. Strona użytkownika:
<br>- prezentacja danych użytkownika,
<br>- zmiana danych użytkownika.

H. PWA:
<br>- aplikacja powinna działać w trybie offline,
<br>- aplikacja powinna być instalowalna na urządzeniach,
<br>- wsparcie dla zgłaszania zagrożeń i niebezpiecznych zdarzeń,
<br>- wsparcie dla zgłaszania wykonania działań zapobiegających zagrożeniom.

I. RWD:
<br>- aplikacja powinna być responsywna,
<br>- aplikacja powinna działać na urządzeniach mobilnych.

J. Przeglądarki:
<br>- aplikacja powinna działać w przeglądarkach: Chrome, Firefox, Edge.

## Technologie
Frontend: JS, CSS, React, Redux, Redux-Thunk.
Backend: JS, Node, Express, PosgreSQL

##
<p align="center">
<img src="./images/1.png" alt="example image" width="80%">
</p>

<p align="center">
<img src="./images/2.png" alt="example image" width="80%">
</p>

<p align="center">
<img src="./images/3.png" alt="example image" width="50%">
</p>

<p align="center">
<img src="./images/4.png" alt="example image" width="50%">
</p>

<p align="center">
<img src="./images/5.png" alt="example image" width="80%">
</p>

<p align="center">
<img src="./images/6.png" alt="example image" width="80%">
</p>

<p align="center">
<img src="./images/7.png" alt="example image" width="30%">
</p>

<p align="center">
<img src="./images/8.png" alt="example image" width="50%">
</p>

<p align="center">
<img src="./images/9.png" alt="example image" width="50%">
</p>

<p align="center">
<img src="./images/10.png" alt="example image" width="80%">
</p>

<p align="center">
<img src="./images/11.png" alt="example image" width="80%">
</p>

<p align="center">
<img src="./images/12.png" alt="example image" width="50%">
</p>

<p align="center">
<img src="./images/13.png" alt="example image" width="50%">
</p>

<p align="center">
<img src="./images/14.png" alt="example image" width="50%">
</p>

<p align="center">
<img src="./images/15.png" alt="example image" width="80%">
</p>

<p align="center">
<img src="./images/16.png" alt="example image" width="80%">
</p>

<p align="center">
<img src="./images/17.png" alt="example image" width="80%">
</p>

<p align="center">
<img src="./images/18.png" alt="example image" width="50%">
</p>

<p align="center">
<img src="./images/19.png" alt="example image" width="80%">
</p>

<p align="center">
<img src="./images/20.png" alt="example image" width="80%">
</p>

<p align="center">
<img src="./images/21.png" alt="example image" width="80%">
</p>

<p align="center">
<img src="./images/22.png" alt="example image" width="80%">
</p>

<p align="center">
<img src="./images/23.png" alt="example image" width="30%">
</p>

<p align="center">
<img src="./images/24.png" alt="example image" width="30%">
</p>