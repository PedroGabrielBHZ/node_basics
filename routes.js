const fs = require("fs");

const requestHandler = (req, res) => {
  const method = req.method;
  const url = req.url;

  if (url === "/") {
    res.write("<html>");
    res.write("<head><title>Enter Message</title></head>");
    res.write(
      /*
      !     Watch out for name="message" stuff    !
      !     I am not quite sure what it does.     !
      */
      `
      <body>
      <form action="/message" method="POST">
      <input type="text" name="message">
      <button type="submit">Send</button>
      </form>
      </body>
      `
    );
    res.write("</html>");
    return res.end();
  }

  if (url === "/message" && method === "POST") {
    const body = [];

    req.on("data", (chunk) => {
      console.log(chunk);
      body.push(chunk);
    });

    req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split("=")[1];

      // Execute stuff synchronously.
      fs.writeFileSync("message.txt", message, (e) => {
        res.statusCode = 302;
        res.setHeader("Location", "/");
        return res.end();
      });
    });
  }

  res.setHeader("Content-Type", "text/html");

  res.write("<html>");
  res.write("<head><title>My First Page</title></head>");
  res.write("<body><h1>Hello from my NodeJS server!</h1></body>");
  res.write("</html>");

  res.end();
};

module.exports = requestHandler;