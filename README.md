

**Project Documentation**

**Overview**

This project is a to-do list application built using React for the frontend and Express.js for the backend. The application allows users to add new tasks and view existing tasks.

**Frontend Progress**

The frontend is built using React and is currently hosted on `http://localhost:3001`. The following components have been implemented:

* `Home.tsx`: This is the main component of the application, responsible for rendering the task list and providing a form to add new tasks.
* `Header.tsx`: This component is responsible for rendering the header of the application.
* `BackendTest.tsx`: This component is currently not being used.

The application uses the following libraries and tools:

* `axios` for making HTTP requests to the backend API.
* `react-router` for client-side routing.
* `tailwindcss` for styling.

**Backend Progress**

The backend is built using Express.js and is currently hosted on `http://localhost:3001`. The following endpoints have been implemented:

* `GET /tasklist`: Returns a list of tasks.
* `POST /addtask`: Creates a new task.

The backend uses the following libraries and tools:

* `express` as the web framework.
* `body-parser` for parsing JSON request bodies.
* `multer` for handling multipart/form-data requests.
* `mongoose` for interacting with the MongoDB database.
* `dotenv` for loading environment variables.

**Database Schema**

The application uses a MongoDB database with the following schema:

* `tasks` collection:
	+ `task`: string (the task text)
	+ `isCompleted`: boolean (whether the task is completed)
	+ `createdAt`: date (the date the task was created)

**Environment Variables**

The application uses the following environment variables:

* `MONGO_URI`: the connection string for the MongoDB database.

**Future Work**

* Implement task completion functionality.
* Add user authentication and authorization.
* Implement task deletion functionality.

**Code Organization**

The code is organized into the following directories:

* `frontend`: contains the React application code.
* `backend`: contains the Express.js application code.
* `models`: contains the MongoDB schema definitions.
* `schemas`: contains the MongoDB schema definitions.
* `utils`: contains utility functions.

**Files**

* `frontend/src/Home.tsx`: the main component of the application.
* `frontend/src/Header.tsx`: the header component.
* `frontend/src/BackendTest.tsx`: a currently unused component.
* `backend/index.js`: the main entry point of the Express.js application.
* `backend/models/ToDoTaskModel.js`: the MongoDB schema definition for the tasks collection.
* `backend/schemas/ToDoTaskSchema.js`: the MongoDB schema definition for the tasks collection.
* `backend/utils/db.ts`: a utility function for connecting to the MongoDB database.
* `backend/.env`: contains environment variables for the application.
