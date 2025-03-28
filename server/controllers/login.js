const bcrypt = require("bcrypt");
const client = require("../configs/database");
const jwt = require("jsonwebtoken");

// Login Controller Function
exports.login = async (req, res) => {
  // Destructure username and password from the request body
  const { username, password } = req.body;

  try {
    // Query the database for a user with the provided username
    const data = await client.query(`SELECT * FROM users WHERE username = $1;`, [username]);
    const user = data.rows[0];

    if (!user) {
      // If no user is found, return an error response
      return res.status(400).json({ error: "User not registered. Please sign up." });
    }

    // Compare the provided password with the stored hashed password
    bcrypt.compare(password, user.password, (err, result) => {
      if (err) {
        return res.status(500).json({ error: "Server error during password comparison" });
      }

      if (result) {
        // Generate a JWT token with the username as payload
        const token = jwt.sign({ username: username }, process.env.SECRET_KEY);
        return res.status(200).json({
          message: "User logged in successfully",
          token: token
        });
      } else {
        return res.status(400).json({ error: "Incorrect password" });
      }
    });
  } catch (err) {
    res.status(500).json({ error: "Database error during login" });
  }
};
