## Simple Ruby + React/Redux based app

## Description
Private Job

## Development Stacks

- PostgreSQL for Database
- Ruby On Rails for API backend
- React/Redux/Saga/Recompose for Front End
- With AirBNB ESLint,
- frontend Boilerplate with create-react-app

## Installation

### Database

Install postgres

```
createdb timemgmt-development
createdb timemgmt-test
createdb timemgmt
```

### backend

```
rvm install 2.4.1
rvm use 2.4.1

bundle install
bundle exec rake db:migrate
bundle exec rake db:seed

rails s
```

### FrontEnd

```
NVM
nvm install 8.5.0
nvm use 8.5.0

npm install && npm start
```

Open any browser and visit http://localhost:3000
