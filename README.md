# 📋 Task Management API

A simple RESTful Task Management API built for managing user tasks with full CRUD functionality.

---

## 🚀 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/tasks/v1` | Create a new task |
| `GET` | `/api/tasks/v1` | Get all user tasks |
| `GET` | `/api/tasks/v1/:id` | Get a single task |
| `PUT` | `/api/tasks/v1/:id` | Update a task |
| `DELETE` | `/api/tasks/v1/:id` | Delete a task |

---

## 🛠️ Installation & Setup

### 1️⃣ Apply Database Migrations & Generate Prisma Client

```bash
npm run db:migrate
npm run db:generate
npm run build
npm start

👥 Group Members
Alcantara, Kent Jeced L.
Andales, Rochelle B.
Caayohan, Kenji Agustine O.