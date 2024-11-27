# Blogging App

I have developed a feature-rich blogging application using **Node.js** and **MongoDB**. This application offers comprehensive functionalities for managing users and blogs, providing a seamless experience through a well-structured and intuitive RESTful API.

For detailed API documentation and usage examples, visit this two Postman documentations [Blog documetation link](https://documenter.getpostman.com/view/39916636/2sAYBViXQV) and [Userdocumetation link](https://documenter.getpostman.com/view/39916636/2sAYBViXQU)
## Features

### **User Features**
1. **Sign Up User**: Create a new user account.
2. **Login User**: Authenticate an existing user.
3. **Update User**: Edit user profile information.
4. **Delete User**: Permanently remove a user account.
5. **Get All Users**: Retrieve a list of all registered users.
6. **Get Specific User**: Fetch details of a single user by their unique ID.

### **Blog Features**
1. **Create a Blog**: Add a new blog post with a title, content, and metadata.
2. **Delete a Blog**: Remove a blog post permanently.
3. **Update a Blog**: Edit an existing blog post's details.
4. **Get Specific Blog**: Retrieve a single blog post using its unique ID.
5. **Get All Blogs**: Fetch all blog posts with optional filtering and sorting.

---

## Tech Stack

- **Backend**: Node.js (Express.js)
- **Database**: MongoDB (Mongoose)
- **API Format**: RESTful API
- **Authentication**: JSON Web Tokens (JWT)

---

  ## Installation
  
  1. Clone the repository:
  ```bash
  git clone https://github.com/eyoaab/Bloging-App-Backend
  cd Bloging-App-Backend
  ```
  2. Install dependencies:
  ```bash
  
  npm instal
  
  ```
  3.Set up environment variables:
  - Create a .env file in the root directory.
  - Add the following variable
  ```bash
  PORT=3000
  MONGO_URI=your_mongodb_connection_string
  JWT_SECRET=your_secret_key
  
  ```
  4.start the server
  ```bash
  
  npm start
  
  ```
## Folder Structure
```bash
Bloging-App-Backend/
├── controllers/        # API logic for users and blogs
├── models/             # Mongoose schemas
├── routes/             # Route handlers for the API
├── middleware/         # Custom middleware (e.g., auth)
├── config/             # Configuration files (e.g., database connection)
├── .env                # Environment variables
├── app.js              # Configuration with middlewares
├── server.js           # Main application entry point
├── package.json        # Dependencies and scripts

```
---

## Using the Deployed Backend

If you prefer to use the already deployed version of the backend, follow these steps:

1. **Base URL**:  
   Use the deployed API base URL for all requests: "https://bloging-app-backend.onrender.com/"
   
2. **Authentication**:  
- Most endpoints require authentication. Ensure you obtain a valid JSON Web Token (JWT) by logging in via the `/api/users/login` endpoint.
- Include the token in the `Authorization` header for subsequent requests:
  ```json
  {
    "Authorization": "Bearer your_token_here"
  }
  ```

3. **Available Endpoints**:  

### **User Endpoints**
| Method | Endpoint                  | Description                       |
|--------|---------------------------|-----------------------------------|
| POST   | `/api/users/register`     | Sign up a new user                |
| POST   | `/api/users/login`        | Log in an existing user           |
| GET    | `/api/users`              | Retrieve all users (admin only)   |
| GET    | `/api/users/:id`          | Retrieve detail of a specific user|
| PUT    | `/api/users/:id`          | Update a user's information       |
| DELETE | `/api/users/:id`          | Delete a user's account           |

### **Blog Endpoints**
| Method | Endpoint                  | Description                       |
|--------|---------------------------|-----------------------------------|
| POST   | `/api/blogs`              | Create a new blog                 |
| GET    | `/api/blogs`              | Retrieve all blogs                |
| GET    | `/api/blogs/:id`          | Retrieve a specific blog          |
| PUT    | `/api/blogs/:id`          | Update a blog                     |
| DELETE | `/api/blogs/:id`          | Delete a blog                     |

4. **Testing the API**:  
- Use tools like **Postman**, **cURL**, or any API testing tool to interact with the backend.  
- For example, to fetch all blogs:  
  ```bash
  curl -X GET https://bloging-app-backend.onrender.com/
  ```

5. **Error Handling**:  
- If an error occurs, the response will include a status code and a descriptive message. For example:
  ```json
  {
    "error": "Unauthorized access"
  }
  ```

---

This section is for users who want to interact with the backend without setting it up locally.

   





