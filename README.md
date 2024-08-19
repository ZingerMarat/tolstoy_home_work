# Tolstoy Home Work
## Demo available at https://tolstoy-hw-8e287ddd521c.herokuapp.com/

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

## Design choices and trade-offs

#### 1. Monorepo Structure:
##### Design Choice:
I structured the application as a monorepo, where both the frontend (React) and backend (Node.js/Express) reside within the same repository.
##### Reasoning:
This simplifies deployment and version control, as the entire project can be managed in one place. It also makes it easier to deploy the frontend and backend together on Heroku.
##### Trade-off:
Monorepos can grow complex as the project scales, and separating concerns between frontend and backend might become challenging for larger projects.
#### 2. Frontend Served via Backend:
##### Design Choice: 
The frontend is served as static files from the backend Express server. When deploying, the frontend build files are generated and served by Express.
##### Reasoning: 
This approach ensures that the frontend and backend are deployed as a single application on Heroku, using one dyno. It simplifies routing and deployment.
##### Trade-off: 
Serving static files from the backend might not be as performant as using a dedicated CDN or static file hosting service. This could impact load times for large frontend applications.
#### 3. Heroku Build Process:
##### Design Choice: 
The heroku-postbuild script installs frontend dependencies and builds the React application during deployment.
##### Reasoning: 
This allows Heroku to automatically build and serve the production-ready frontend files after deploying the backend.
##### Trade-off: 
Relying on Heroku’s build process can introduce delays during deployment, especially for large frontend builds. Additionally, any issues in the frontend build will cause the entire deployment to fail.
#### 4. Node.js Version Specification:
##### Design Choice: 
I explicitly specified the Node.js version in the package.json file.
##### Reasoning: 
Heroku requires a Node.js version to ensure compatibility during deployment. Specifying the version also helps avoid unexpected issues related to differences in Node.js versions.
##### Trade-off: 
Locking in a specific version of Node.js might require additional maintenance as new versions of Node.js are released.
#### 5. Rate Limiting and CSRF Protection:
##### Design Choice: 
I implemented rate limiting to prevent abuse and CSRF protection to secure form submissions.
##### Reasoning: 
These security measures protect the server from common attack vectors, like brute force or cross-site request forgery.
##### Trade-off: 
While these measures add security, they can also introduce complexity in handling real-world use cases, such as dealing with legitimate high traffic that might be falsely flagged by rate limiting.

