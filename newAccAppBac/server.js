const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const { USERFRONT_PUBLIC_KEY } = require("./environment");

const app = express();
app.use(cors());

const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      message: "Authorization header missing or token not provided",
    });
  }

  try {
    const auth = await jwt.verify(token, USERFRONT_PUBLIC_KEY);
    req.auth = auth;
    next();
  } catch (error) {
    return res.status(403).json({
      message: "Invalid token",
      error: error.message, // Include the error message for more clarity in the response.
    });
  }
};

app.get("/data", authenticateToken, (req, res) => {
  return res.json({
    someSecretData: "shhh!!",
  });
});

app.listen(3010, () => console.log("Server listening on port 3010"));
