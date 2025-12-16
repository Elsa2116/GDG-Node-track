// Import Express using ES6 syntax
import express from "express";

// Create an Express application
const app = express();

// Define the port number
const port = 3000;

/*
  Route: GET /home
  Description: Returns an HTML welcome message styled in green
*/
app.get("/home", (req, res) => {
  res.send('<h1 style="color: green;">Welcome to the Home Page!</h1>');
});

/*
  Route: GET /about
  Description: Returns plain text mimicking an About page
*/
app.get("/about", (req, res) => {
  res.send("This is the About page. Here you can learn more about us.");
});

/*
  Route: GET /students/:studentId
  Description:
    - Uses route parameter (:studentId)
    - Returns student details as JSON
  */
app.get("/students/:studentId", (req, res) => {
  // Get studentId from URL parameter
  const studentId = req.params.studentId;

  // Get department from query string (optional)
  const department = req.query.department || "Not specified";

  // Create student object
  const student = {
    id: studentId,
    name: `Student ${studentId}`,
    department: department,
  };

  // Send JSON response
  res.json(student);
});

/*
  Start the server and listen on the specified port
*/
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
