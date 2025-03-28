# To-Do App

## 1. Introduction
The **To-Do App** is a task management application that allows users to efficiently organize and manage their tasks. The app provides seamless task management features for both guests and registered users.

### Key Features:
- Add, edit, and delete tasks.
- Store tasks temporarily for guests.
- Register/Login to persist tasks across sessions.
- Categorize tasks (e.g., Work, Home, School).
- Update task progress through a simple UI.

### Target Users:
Anyone who needs an easy-to-use task management application.

---

## 2. Technologies Used

### Backend:
- **Express.js** - Backend framework for Node.js
- **MongoDB Atlas** - Cloud database for storing user tasks
- **Redis** - Caching system for guest tasks
- **Nginx** - Reverse proxy for handling requests efficiently

### Frontend:
- **React Vite** - Frontend framework for building the UI

### Deployment:
- **Docker & Docker Swarm** - Containerization and orchestration for scalability

### Why Docker & Docker Swarm?
- **Scalability:** Docker Swarm allows easy horizontal scaling of services.
- **Portability:** Applications run consistently across different environments.
- **Simplified Deployment:** Automates deployment, networking, and load balancing.
- **Fault Tolerance:** If a container crashes, another one takes over automatically.

---

## 3. Installation and Running the Project

### Prerequisites:
- **Node.js** (for local development)
- **MongoDB Atlas** (for database storage)
- **Docker & Docker Swarm** (for deployment)
- **Redis** (for caching guest tasks)

### Steps to Install & Run Locally:
### Running with Docker Swarm:
1. Initialize Docker Swarm (if not already initialized):
   ```sh
   docker swarm init
   ```
2. Buid the application:
   ```sh
   docker compose build
   ```
3. Deploy the application:
   ```sh
   docker stack deploy -c docker-compose.yml todo-app
   ```
4. Check the running services:
   ```sh
   docker service ls
   ```

---

## 4. Usage

### User Authentication:
- Click **Login** to sign in or register.

### Task Management:
- **Add Task:** Fill in the form and click **Add Task**.
- **Edit Task:** Hover over the task card to edit name, category (e.g., Work, Home, School).
- **Update Progress:** Click the round button on the right side of the task card.
- **Delete Task:** Click the delete icon on a task.

### Special Configurations:
- No special setup is required after installation.

---

## 5. Deployment
### Deploying with Docker Swarm:
- Follow the [Running with Docker Swarm](#running-with-docker-swarm) steps above.

---

## 6. API Endpoints

### Base URL: `http://localhost:5000/api`

#### **Authentication**
| Method | Endpoint       | Description |
|--------|--------------|-------------|
| POST   | `/auth/signup` | Register a new user |
| POST   | `/auth/signin` | Login user |

#### **Tasks**
| Method | Endpoint       | Description |
|--------|--------------|-------------|
| GET    | `/api/:id`    | Get all tasks for a user |
| POST   | `/api/`       | Add a new task |
| PUT    | `/api/:id`    | Update a task |
| DELETE | `/api/:id`    | Delete a task |

### Request & Response Examples:
#### **Register User**
**Request:**
```json
POST /auth/signup
{
  "username": "john_doe",
  "password": "securepassword",
  "userId": "guest-123-456-789"
}
```
**Response:**
```json
{
  "message": "Register successfully",
  "user": {
    "_id": "65123456789",
    "username": "john_doe"
  }
}
```

#### **Login User**
**Request:**
```json
POST /auth/signin
{
  "username": "john_doe",
  "password": "securepassword",
  "userId": "guest-123-456-789"
}
```
**Response:**
```json
{
  "message": "Login successfully",
  "user": {
    "_id": "65123456789",
    "username": "john_doe"
  }
}
```

#### **Add Task**
**Request:**
```json
POST /api/
{
  "name": "Buy groceries",
  "categories": ["Home"],
  "process": "To-Do",
  "userID": "65123456789"
}
```
**Response:**
```json
{
  "message": "Post task successfully",
  "task": {
    "_id": "66123456789",
    "name": "Buy groceries",
    "categories": ["Home"],
    "process": "To-Do",
    "userID": "65123456789"
  }
}
```

#### **Get Tasks**
**Request:**
```json
GET /api/65123456789
```
**Response:**
```json
{
  "message": "Get tasks successfully",
  "task": [
    {
      "_id": "66123456789",
      "name": "Buy groceries",
      "categories": ["Home"],
      "process": "To-Do",
      "userID": "65123456789"
    }
  ]
}
```

#### **Update Task**
**Request:**
```json
PUT /api/66123456789
{
  "name": "Buy groceries",
  "categories": ["Home"],
  "process": "Completed"
}
```
**Response:**
```json
{
  "message": "Task updated successfully",
  "task": {
    "_id": "66123456789",
    "name": "Buy groceries",
    "categories": ["Home"],
    "process": "Completed"
  }
}
```

#### **Delete Task**
**Request:**
```json
DELETE /api/66123456789
```
**Response:**
```json
{
  "message": "Task deleted successfully"
}
```

---

## 7. Future Improvements
- Cloud deployment support.
- Enhanced authentication with JWT.
- Real-time task updates using WebSockets.

---

## 8. License
This project is open-source and available under the MIT License.

