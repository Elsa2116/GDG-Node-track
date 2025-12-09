const http = require("http");

let students = [];
let nextId = 1;

const server = http.createServer((req, res) => {
  // Always respond with JSON
  res.setHeader("Content-Type", "application/json");

  const url = req.url;
  const method = req.method;

  // -----------------------------
  // GET /students → return all students
  // -----------------------------
  if (method === "GET" && url === "/students") {
    res.statusCode = 200;
    return res.end(JSON.stringify(students));
  }

  // -----------------------------
  // POST /students → create a new student
  // -----------------------------
  else if (method === "POST" && url === "/students") {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", () => {
      // parse body
      try {
        const data = JSON.parse(body);
        if (!data.name) {
          res.statusCode = 400;
          return res.end(
            JSON.stringify({ error: "Missing 'name' in request body" })
          );
        }

        const newStudent = {
          id: nextId++,
          name: data.name,
        };

        students.push(newStudent);

        res.statusCode = 201; // created
        return res.end(JSON.stringify(newStudent));
      } catch (err) {
        res.statusCode = 400;
        return res.end(JSON.stringify({ error: "Invalid JSON" }));
      }
    });
  }

  // -----------------------------
  // PUT /students/:id → update student name
  // -----------------------------
  else if (method === "PUT" && url.startsWith("/students/")) {
    const id = parseInt(url.split("/")[2], 10);
    if (isNaN(id)) {
      res.statusCode = 400;
      return res.end(JSON.stringify({ error: "Invalid student id" }));
    }

    let body = "";

    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", () => {
      try {
        const data = JSON.parse(body);
        if (!data.name) {
          res.statusCode = 400;
          return res.end(
            JSON.stringify({ error: "Missing 'name' in request body" })
          );
        }

        const student = students.find((s) => s.id === id);
        if (!student) {
          res.statusCode = 404;
          return res.end(JSON.stringify({ error: "Student not found" }));
        }

        student.name = data.name;
        return res.end(JSON.stringify(student));
      } catch (err) {
        res.statusCode = 400;
        return res.end(JSON.stringify({ error: "Invalid JSON" }));
      }
    });
  }

  // -----------------------------
  // DELETE /students/:id → delete student
  // -----------------------------
  else if (method === "DELETE" && url.startsWith("/students/")) {
    const id = parseInt(url.split("/")[2], 10);
    if (isNaN(id)) {
      res.statusCode = 400;
      return res.end(JSON.stringify({ error: "Invalid student id" }));
    }

    const index = students.findIndex((s) => s.id === id);
    if (index === -1) {
      res.statusCode = 404;
      return res.end(JSON.stringify({ error: "Student not found" }));
    }

    // remove from array
    students.splice(index, 1);
    return res.end(
      JSON.stringify({ message: `Student ${id} deleted successfully` })
    );
  }

  // -----------------------------
  // If no route matches → 404
  // -----------------------------
  else {
    res.statusCode = 404;
    return res.end(JSON.stringify({ error: "Route not found" }));
  }
});
// Start server on port 4000
const PORT = 4000;
server.listen(PORT, () => {
  console.log(`Student API running on port ${PORT}`);
});
