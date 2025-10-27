# E-commerce Project

This project is a full-stack e-commerce application built with React for the frontend and Node.js/Express with MongoDB for the backend.

## Available Scripts

### Frontend

In the frontend directory, you can run:

#### `npm start`

Runs the React app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

#### `npm test`

Launches the test runner for frontend components.

#### `npm run build`

Builds the React app for production to the `build` folder.

### Backend

In the backend directory, you can run:

#### `npm run dev`

Runs the backend server with nodemon for development.

#### `npm test`

Runs backend tests using Jest and Supertest.

## Environment Variables

Create a `.env` file in the backend directory with the following variables:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000
```

Create a `.env` file in the frontend directory with:

```
REACT_APP_API_BASE_URL=http://localhost:5000
REACT_APP_IMAGE_BASE_URL=http://localhost:3000
```

## Features

- User authentication with JWT
- Product listing, adding, updating, and deleting (admin)
- Shopping cart management
- Order processing
- Responsive UI with React Context API
- Backend input validation and security middlewares
- Error boundaries and loading states in frontend
- Unit and integration tests for backend

## Learn More

- [React documentation](https://reactjs.org/)
- [Express documentation](https://expressjs.com/)
- [MongoDB documentation](https://docs.mongodb.com/)
- [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started)

