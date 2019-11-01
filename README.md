# :rocket: TopFlop :rocket:

Topflop is an open-source realtime application to top, flop or quote your friends

## Getting Started

### Server side

#### Setup docker

```bash
$ cd server/
$ make init-database
$ make start
```

-   API is available on http://localhost:3000/
-   API doc is available on http://localhost:3000/_doc
-   Mercure hub available on http://localhost:1337

### App side

```bash
$ cd client/
$ make start
```

-   App available on http://localhost:3001

## Technical stack

TopFlop depends on the following technologies:

### Backend stack

-   [Node.js](https://nodejs.org)
-   [Nestjs](https://nestjs.com/)
-   [Typescript](https://www.typescriptlang.org/)
-   [Docker](https://www.docker.com/)
-   [PostgreSQL](https://www.postgresql.org/)
-   [Mercure](https://mercure.rocks)

### App stack

-   [React.js](https://fr.reactjs.org/)
-   [Redux](https://redux.js.org/)
-   [Axios](https://github.com/axios/axios)

# License

TopFlop is an open-sourced application licensed under the [MIT license](https://opensource.org/licenses/MIT).
