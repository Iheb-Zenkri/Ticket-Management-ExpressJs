# Ticket Management Backend  
A robust backend system built with Express.js and TypeScript for managing tickets. This project helps users identify their roles and permissions while receiving tickets and notifications about priority, response dates, and resolution deadlines.

## Features  

- **Role-Based Access Control**: Assign and manage user roles with specific permissions to ensure secure and structured access.  
- **Ticket Management**: Create, view, update, and delete tickets with a streamlined interface.  
- **Priority Notifications**: Notify users about ticket priority levels to ensure timely action.  
- **Deadline Tracking**: Track response and resolution dates to improve ticket resolution efficiency.  
- **Customizable Roles and Permissions**: Flexibility to define and adjust user roles and their permissions.  
- **Real-Time Notifications**: Immediate alerts for changes in ticket status or approaching deadlines.  
- **TypeScript Integration**: Ensures type safety and robust code structure.  
- **Comprehensive API**: Well-documented API endpoints for seamless integration with other systems.  

## Class diagram
![Blank diagram](https://github.com/user-attachments/assets/152dcc46-668c-4dcb-8d07-b9b271443226)

## Installation  
Follow these steps to set up and run the project locally :  
### Prerequisites  
Ensure you have the following installed on your machine :  
- [Node.js](https://nodejs.org/) (v16+ recommended)  
- [MySQL](https://www.mysql.com/) (Ensure the MySQL server is running)  
- [npm](https://www.npmjs.com/) 

### Steps  

1. **Clone the Repository**  
   ```bash  
   git clone https://github.com/Iheb-Zenkri/Ticket-Management-ExpressJs.git
   cd ticket-management
   ```
2. **Install Dependencies**  
   ```bash
   npm install
   ```
3. **Set Up Environment Variables**
Create a .env file in the root directory and add the following variables:
   ```env
    DB_HOST=your-database-host  
    DB_USER=your-database-username  
    DB_PASSWORD=your-database-password  
    DB_NAME=your-database-name  
    JWT_SECRET=your-secret-key
    NODE_ENV=development
   ```

4. **Database Migration (if applicable)**
Run Sequelize CLI commands to set up the database:
   ```bash
    npx sequelize-cli db:migrate
   ```
5. **Build the Project and Run it**
Run Sequelize CLI commands to set up the database:
   ```bash
   npm run build  #for converting Typescript to Javascript
   npm run dev  #for development
   npm run start  #for production
   ```

## Usage  
The API is organized into multiple routes for handling different functionalities
## Base URL
     http://localhost:<port>/ #for exemple http://localhost:3000/
     
## Available Endpoints
   ```bash
   http://localhost:3000/users              #User Management
   http://localhost:3000/tickets            #Ticket Management
   http://localhost:3000/teams              #Teams Management
   http://localhost:3000/roles              #Roles Management
   http://localhost:3000/permissions        #Permissions Management
   http://localhost:3000/sla                #SLA Management
   http://localhost:3000/notifications      #Notifications Management
  ```

## Technologies

- **Backend Framework: Express.js** : Web framework for Node.js that simplifies building APIs and web applications.

- **TypeScript**  : A typed superset of JavaScript that compiles to plain JavaScript, enabling better tooling and type safety.

- **MySQL** : A relational database for storing ticket and user information. It helps organize and manage data efficiently.

- **Sequelize** : An ORM (Object-Relational Mapping) for Node.js that allows interacting with MySQL databases using JavaScript objects instead of raw SQL queries.

- **JWT (JSON Web Tokens)** : A compact, URL-safe means of representing claims to be transferred between two parties. It's used for secure user authentication and role-based authorization.

- **Bcrypt.js**  : A library to hash and compare passwords securely, ensuring that sensitive data is stored in a secure format.

- **Nodemon**  : A development tool that automatically restarts the server whenever file changes are detected, improving development speed and productivity.

- **Concurrently** : A package that allows running multiple npm scripts simultaneously (e.g., for running the server and frontend build in development mode at the same time).

## Contributing
1. **Fork the repository:**
  Click on the "Fork" button at the top right of the repository page.

2. **Clone the repository**
   ```bash
    git clone https://github.com/Iheb-Zenkri/Ticket-Management-ExpressJs.git  
    cd ticket-management  
   ```
   
3. **Create a new branch**
   ```bash
    git checkout -b feature/your-feature-name  
   ```
   
4. **Make your changes**
  Ensure your changes follow the project's coding style and standards.

5. **Commit your changes**
   ```bash
    git add .  
    git commit -m "Add meaningful commit message"   
   ```
   
6. **Push your changes**
   ```bash
    git push origin feature/your-feature-name    
   ```
7. **Create a pull request**
  Go to the repository’s "Pull Requests" tab and submit your PR.
