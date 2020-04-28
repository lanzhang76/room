### Guestbook Prototype

Git clone/download and run
```
$ npm install
```

Install [PostgreSQL](https://devcenter.heroku.com/articles/heroku-postgresql#local-setup)

create table before use:
```
$ CREATE TABLE log (id serial primary key not null, time timestamptz not null, text text not null);
```

To run locally:
```
$ node index.js
```
#### Deployed prototype tester:
[DT Guestbook prototype](https://logprototype.herokuapp.com/)

<hr>

#### Master Branch Update log:
- Apr6: User IP, server and client setup
- Apr11: Opt-in buttons, user object, client connects/disconnects
