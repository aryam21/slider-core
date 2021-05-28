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

## PostgreSql

Visit the offical page for postgresql installation.

```
https://www.postgresql.org
```

## Create DB and run migrations

 After postgresql installation create database specified by configuration.

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

## Nginx configuration

Put this code into file /etc/nginx/sites-available/default

```
server {
    listen 80;
    listen [::]:80;
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    ssl_certificate /etc/ssl/certs/localhost.crt;
    ssl_certificate_key /etc/ssl/private/localhost.key;
    ssl_protocols TLSv1.2 TLSv1.1 TLSv1;
    client_max_body_size 100M;
    server_name _;
    root /var/www/html/slider-web/build;
    index index.html;
    location /api/ {
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header Host $http_host;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection "upgrade";
            proxy_pass http://127.0.0.1:4000/;
            proxy_redirect off;
            proxy_read_timeout 240s;
        }
}
```



