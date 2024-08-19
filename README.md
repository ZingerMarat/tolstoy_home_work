# Tolstoy Home Work

This is a full-stack web application that fetches metadata from provided URLs.
The project consists of a frontend built with React and a backend built with Node.js and Express.
The application is deployed on Heroku.

## Prerequisites

Make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (version 16.x or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [Git](https://git-scm.com/)
- [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli)

## Setup and Installation

### 1. Clone the Repository

First, clone the repository to your local machine:

```bash
git clone https://github.com/ZingerMarat/tolstoy_home_work.git
cd tolstoy_home_work
```

### 2. Install Backend Dependencies

Navigate to the backend directory and install the required dependencies:

```bash
cd backend
npm install
```

### 3. Install Frontend Dependencies

Navigate to the frontend directory and install the required dependencies:

```bash
cd ../frontend
npm install
```

### 4. Run the Application Locally

To run the application locally:

1. Start the backend server:
```bash
   cd backend
   npm start
```

2. Start the frontend development server:
```bash
   cd ../frontend
   npm start
```

The backend will be running on `http://localhost:5000`, and the frontend on `http://localhost:3000`.

### 5. Running Tests

You can run tests for both the frontend and backend using the following commands:

- **Backend tests:**
```bash
  cd backend
  npm test
```
- **Frontend tests:**
```bash
  cd ../frontend
  npm test
```
### 6. Deploying to Heroku

To deploy the application to Heroku, follow these steps:

1. Log in to Heroku:
```bash
   heroku login
```
2. Create a new Heroku app:
```bash
   heroku create your-app-name
```
3. Set the buildpack for Node.js:
```bash
   heroku buildpacks:set heroku/nodejs
```
4. Push your code to Heroku:
```bash
   git push heroku master
```
5. Open your deployed app:
```bash
   heroku open
```
### 7. Troubleshooting

- If you encounter any issues with the build process, make sure that the necessary build scripts are present in the `package.json` files for both the backend and frontend.
- Ensure that your environment variables are properly configured in the Heroku environment.

## License

This project is licensed under the MIT License.

