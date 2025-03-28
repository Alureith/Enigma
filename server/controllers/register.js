const bcrypt = require("bcrypt");
const client = require("../configs/database");
const jwt = require("jsonwebtoken");

// Registration Controller Function
exports.register = async (req, res) => {
  // Destructure user details from the request body using "username"
  const { username, email, password } = req.body;

  try {
    // Check if a user with the provided email already exists
    const data = await client.query(`SELECT * FROM users WHERE email = $1;`, [email]);
    const arr = data.rows;

    if (arr.length !== 0) {
      return res.status(400).json({ error: "Email already exists. Please login instead." });
    } else {
      // Hash the password using bcrypt (with 10 salt rounds)
      bcrypt.hash(password, 10, async (err, hash) => {
        if (err) {
          return res.status(500).json({ error: "Server error" });
        }

        try {
          // Insert the new user into the database using the "username" field
          await client.query(
            `INSERT INTO users (username, email, password) VALUES ($1, $2, $3);`,
            [username, email, hash]
          );

          // Generate a JWT token with the user's username as payload
          const token = jwt.sign({ username: username }, process.env.SECRET_KEY);

          // Send a success response with the token
          res.status(200).json({
            message: "User registered successfully",
            token: token
          });
        } catch (dbErr) {
          console.error("Database insertion error:", dbErr);
          return res.status(500).json({ error: dbErr.message });
        }
      });
    }
  } catch (err) {
    console.error("Registration process error:", err);
    res.status(500).json({ error: "Database error while registering user" });
  }
};
