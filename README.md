# Real-time User Registration and Management System

Objective: Develop a user registration and management system using Angular, NestJS, and MongoDB. The system should provide real-time notifications when new users register and include a user management screen with advanced features like search, sort, and infinite scroll pagination.


## About Application

There are 2 parts of the application. One is backend or api and the other is frontend or web. Api has the backend code developed with NestJs and runs the backend server while the frontend is an Angular 16 standalone based type web application. The application uses MongoDB Atlas for database.


## Running Application

To run the application, you first have to run the backend server and then the frontend application. 

### Running backend api server

For running api, follow the following steps:

1. cd ./api
2. npm install
3. npm run start

### Running frontend application

For running api, follow the following steps:

1. cd ./web
2. npm install
3. npm run start
4. Open http://localhost:4200/ in your browser and see the running application!!

## Testing Application

There are 2 Critical User Journeys in this application

### 1. User Registration

1. Opening http://localhost:4200/ on your browser redirects to http://localhost:4200/register page where you can register a new user.
2. Fill up username, email, date of birth, password and confirm password fields.
3. Once all the fields are correctly entered, Register button is enabled, clicking this button, creates a new user with given data and shows a Success message to you.
4. If you try to create a user with existing email, you would be shown an error message.


### 2. User Management (List of all registered users on application)

1. Opening http://localhost:4200/users opens a page with list of all users registered in the application in a infinite scroll type pagination
2. You can search users based on username and email.
3. You can sort users based on username, email, createdAt fields in asc and desc order.
4. When a new user is registered, you get a info message saying a new user is added without needing to refresh the page.
5. When a new user is added, the list of users is auto refreshed.

## Data security

1. When creating user, we only store masked password i.e we encrypt it before storing in db.
2. When user data is fetched for list of users, we have excluded password field from being selected as part of data returned.
3. When creating user with same email, it returns an error

## Future Improvements

1. Better UI (UI is bit basic due to time constraint)
2. JWT Token based authentication for user management page with adding a auth middleware in backend
3. Global interceptors for http requests in web app for error handling

