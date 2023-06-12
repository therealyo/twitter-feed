# Twitter Feed

---

## Overview

This project contains simulation of twitter feed using http streaming to send existing messages and write newly created ones.

## Starting the Project

You can start the project using one of the following methods:

### Using Shell Script

Run the following command in your terminal:

```sh
sh start.sh
```

### Using Makefile

```sh
make run
```

## API Routes

### Create a Message

**POST /feed**

This endpoint is used to create a message.

#### Body Parameters:

- `text`: This is a string that contains the text of the message to be created.

#### Example

```sh
curl -X POST -H "Content-Type: application/json" -d '{"text":"message"}' http://localhost:5000/feed
```

### Get Feed

**GET /feed**
This endpoint gets all messages. It uses http streaming to add newly created message to response

#### Example

```sh
curl -N -H "Connection: keep-alive" http://localhost:5000/feed
```

### Start testing

**POST /bot/start**

This endpoint is used to start load testing.

#### Query Parameters:

- `rate`: This is a number that determines how many requests per second will be produced.
- `duration`: This is a number representing the duration in seconds for which the test will run.
- `requests`: This is a number representing the total number of requests to perform.

#### Example

```sh
curl -X POST "http://localhost:5000/bot/start?rate=10&duration=10&requests=1000"
```

## Environment

### `COCKROACH_HOST`

Cockroach cluster host. Default is cockroach-node-1

### `COCKROACH_PORT`

Cockroach cluster port. Default is 26257

### `COCKROACH_USER`

Cockroach cluster user. Default is root

### `COCKROACH_PASSWORD`

Cockroach cluster password. Default is ''

### `COCKROACH_DATABASE`

Cockroach cluster database. Default is postgres

### `PORT`

Port your application is running on. Default is 5000;
