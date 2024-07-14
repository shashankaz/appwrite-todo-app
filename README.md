# Todo App with Appwrite

This is a simple Todo application built with React and Appwrite. The application allows users to register, log in, and manage their todos.

## Features

- User registration and login
- Create, read, update, and delete todos
- User authentication and authorization
- Persistent data storage using Appwrite

## Folder Structure

```plaintext
src/
|-- components/
|   |-- Auth.jsx
|   |-- Todo.jsx
|-- App.jsx
|-- appwriteConfig.js
|-- index.css
|-- main.jsx
.env
public/
|-- index.html
```

## Setup

### 1. Clone the repository

```bash
git clone https://github.com/shashankaz/appwrite-todo-app.git
cd appwrite-todo-app
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the root of your project and add your Appwrite credentials:

```plaintext
VITE_PROJECT_ID=[YOUR_PROJECT_ID]
VITE_API_ENDPOINT=https://[YOUR_API_ENDPOINT]
VITE_DATABASE_ID=[YOUR_DATABASE_ID]
VITE_COLLECTION_ID=[YOUR_COLLECTION_ID]
```

### 4. Run the application

```bash
npm run dev
```

## Usage

### Authentication

Users can register and log in using their email and password.

### Managing Todos

Once logged in, users can create, view, update, and delete their todos. Todos are stored in Appwrite and are only accessible by the logged-in user.

## Project Structure

### `src/components/Auth.js`

Handles user authentication (registration and login) using Appwrite.

### `src/components/Todo.js`

Manages the todo functionality (creating, reading, updating, and deleting todos) using Appwrite.

### `src/App.js`

Main application component that handles user state and renders either the `Auth` component or `Todo` component based on the user's authentication state.

### `src/appwriteConfig.js`

Configures and initializes the Appwrite SDK.

### `src/index.css`

Contains the styling for the application.

### `src/main.jsx`

Entry point of the application.
