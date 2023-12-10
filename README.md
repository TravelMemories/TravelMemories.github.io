# travel-memories

mvn spring-boot:run odpala server backend, npm start odpalany z ./frontend odpala front
Przy pierwszym uruchomieniu należy zainstlalować react scripts, albo wykonać tą komendę żeby sprawdzić czy jest zainstalowane (bo może już to naprawiłem)

### First run
mvn spring-boot:run
cd frontend
npm install react-scripts --save 

### Every next run
mvn spring-boot:run
cd frontend
npm start

Prawidłowe uruchomienie powinno wyświetlić aktualny czas zaciągniety z backendu
