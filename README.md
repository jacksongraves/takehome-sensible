# takehome-sensible

Take home assessment for Sensible Weather Co based on Google's Nearby Search API.

# Architecture

The project built as a React + TypeScript client which interacts with an Express + TypeScript server, to interrogate the Google Nearby Places API. The project is a single directory containing:

- `express-server`
- `react-client`

Note, though both server and client are in the same repo, this is **not managed as a monorepo**. They are stored together for convenience.

This documentation assumes that you have Node, Yarn, and other basic JavaScript-ecosystem CLI and developer tools installed on your machine.

# Running the Server

The Express server has a single endpoint, `GET /api/places` which routes parameters to the Google Places API, and routes successful responses back to the requesting client.

The server is intended to be run on `localhost` at port `8081`.

To set it up, first create a `.env` file under `express-server` and add:

```sh
GOOGLE_MAPS_API_KEY=your_api_key_here
PORT=8081
```

Then, on your local machine, open a terminal window from the repo. Run the following commands:

```sh
cd express-server
yarn
yarn start
```

The commands change into the directory, installs `node_modules`, then builds the project into a `./build` directory using `tsc`, and runs it using `node`. Watch and other hot-loading capabilities are not implemented.

Note, tests are not included, but would leverage `jest` to mock the Google NodeJS API and validate that the express routes are called and effectively proxy the data.

# Running the Client

The client is built using `create-react-app` and Material UI version 5, and displays a simple UI to set up a search request and display results.

To set it up, the `.env` specifying the `localhost` port for the server is already included.

On your local machine, open a terminal window from the repo. Run the following commands:

```sh
cd react-client
yarn
yarn start
```

The commands change into the directory, installs `node_modules`, then runs the project in a watch mode using `react-scripts`. Navigate to `http://localhost:3000/` in the browser to view and interact with the application.

Note, tests are not included, but would leverage `jest` and `@testing-library/react` or `enzyme` to test that the various UI components render, change and manage state appropriately, and can successfully call the API via mocking and load results.
