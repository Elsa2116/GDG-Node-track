const http = require("http");

const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "application/json");

  // ROUTE: GET /
  if (req.method === "GET" && req.url === "/") {
    res.end(JSON.stringify({ message: "Welcome to the Home Page" }));
  }

  // ROUTE: GET /info
  else if (req.method === "GET" && req.url === "/info") {
    res.end(JSON.stringify({ message: "This is the information page" }));
  }

  // ROUTE: POST /submit
  else if (req.method === "POST" && req.url === "/submit") {
    let body = "";

    // collect data chunks
    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    // when data finished
    req.on("end", () => {
      const data = JSON.parse(body); // convert to JSON
      res.end(JSON.stringify(data)); // send same data back
    });
  }

  // if no route matched
  else {
    res.statusCode = 404;
    res.end(JSON.stringify({ error: "Route not found" }));
  }
});

// Start server on port 3000
server.listen(3000, () => {
  console.log("Server running on port 3000");
});
