# CeliaCare Management

CeliaCare Management is an Angular and TypeScript project that allows CeliaCare admins to access the news and places databases using Firebase login. Read access is granted to all users, while edit access is restricted to logged-in users. The project utilizes Angular Material, Bootstrap, and ngx-cookies to maintain the user session even after closing the program. The purpose of this application is to serve as a data management tool for the CeliaCare Android application. This Angular project is specifically designed for viewing and modifying the data displayed in the CeliaCare mobile app.

## Features

- Firebase login for authentication and authorization
- Read access to the news and places databases for all users
- Edit access to the databases restricted to logged-in users
- Integration with Angular Material for enhanced UI components
- Utilization of Bootstrap for responsive and mobile-friendly design
- Integration of ngx-cookies for session persistence

## Prerequisites

Before running the project, make sure you have the following prerequisites installed:

- Node.js and npm
- Angular CLI
- Firebase account and project configuration

## Getting Started

1. Clone the repository: `git clone https://github.com/ferreiracorderomiguel/CeliaCareManagement.git`
2. Navigate to the project directory: `cd celiacaremanagement`
3. Install the dependencies: `npm install`
4. Configure Firebase: Provide your Firebase project credentials in the appropriate configuration files.
5. Run the project: `ng serve`
6. Open your browser and navigate to `http://localhost:4200` to access the CeliaCare Management application.

## Usage

- Sign in with your Firebase credentials to gain access to edit functionality.
- Navigate to the News and Places sections to view the respective databases.
- Edit, add, or delete news and places entries as necessary.
- Ensure to log out or close the browser tab to terminate the session and protect user privacy.

## Screenshots
<div align="center">
  <img src="app/src/assets/inicio_celiacaremanagement.jpg" alt="Home screen" width="400px">
</div>
<div align="center">
  <img src="src/assets/lista_establecimientos_celiacaremanagement.jpg" alt="Establishments screen" width="400px">
</div>

## Technologies Used

- Angular
- TypeScript
- Firebase
- Angular Material
- Bootstrap
- ngx-cookies
