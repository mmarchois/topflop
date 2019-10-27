# :rocket: TopFlop :rocket:

Topflop is an open-source application to top, flop or quote your friends

## Getting Started

### Server side

#### Setup docker

```bash
$ cd server/
$ make start
```

-   API is available on https://api.topflop.local/
-   API doc is available on https://api.topflop.local/_doc

/!\ Don't forget to update your /etc/hosts

#### Setup database

```bash
$ cd server/
$ make init-database
```

### App side

```bash
$ cd client
$ yarn start
```

-   App available on http://localhost:3000

## Technical stack

TopFlop depends on the following technologies:

### Backend stack

-   Node.js
-   Nestjs
-   Typescript
-   Docker
-   PostgreSQL

### App stack

-   React.js
-   Redux
-   Axios

# License

TopFlop is an open-sourced application licensed under the [MIT license](https://opensource.org/licenses/MIT).
