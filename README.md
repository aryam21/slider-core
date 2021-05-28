# Documentation

This is the documentation for the Slider Club codebase of backend part.

## Getting the code

Checkout the code from this repository hosted on GitHub.

```
$ git@github.com:appz-coder/slider-core.git
```

## Environment variables

Now specify the environment you want to run the application on by editing the
environment variables. These settings are read from the `.env` that may or may
not exist in your base folder. To create one if copy the `.env.example` file and
edit it to match your preference.

```
$ cp .env.example .env
```

## Install dependencies

Run command below inside this project folder to install all dependencies.

```
$ npm install
```

## Create DB and run migrations

 Create database specified by configuration.

```
$ npx sequelize-cli db:create
```

Run pending migrations.

```
$ npx sequelize-cli db:migrate
```

## Run server

 After all that, just run.

```
$ DEBUG=myapp:* npm start

or

$ npm start
```


