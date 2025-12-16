# Node.js Servers Project

This repository contains **two Node.js servers**:

1. **Basic HTTP Server** running on **port 3000**  
2. **Student REST API** running on **port 4000**  

Both servers use Node.js's built-in `http` module and handle JSON data.


## Part 1: Basic HTTP Server (Port 3000)

A simple HTTP server with three routes.

### Routes

| Method | Route     | Response |
|--------|-----------|----------|
| GET    | `/`       | `{ "message": "Welcome to the Home Page" }` |
| GET    | `/info`   | `{ "message": "This is the information page" }` |
| POST   | `/submit` | Accepts JSON and returns the same JSON |

### Example POST Request

**Request Body**
json
{
  "name": "Elsa",
  "age": 22
}
