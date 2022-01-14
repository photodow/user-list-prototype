# User List

An application/prototype that explores listing users.

## How to build and run

To get up and running we're assuming you already have [Java SDK](https://www.oracle.com/java/technologies/downloads/), [NPM and node.js](https://nodejs.org/en/) setup on your local machine.

> These examples use `yarn`, but you can replace that with `npm run`.

### Local build

The local build requires two steps, but it applies a hot reload to the front end react app so you can develop without having to continue rebuilding manually.

```
yarn server
yarn frontend:start
```

The server will run at `https://localhost:8080`, and the front end will run at `https://localhost:3000`.

### Production build

To build both frontend and backend for production use you can run the following command.

```
yarn start
```

Both frontend and backend will run at `https://localhost:8080` on your local machine.
