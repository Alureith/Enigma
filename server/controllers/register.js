const bcrypt = require("bcrypt");
const client = require("../configs/database");
const jwt = require("jsonwebtoken");

// Registration Controller Function
exports.register = async (req, res) => {
    const { name, email, phonenumber, password } = req.body;

    try {
        // Check if user already exists in the database
        const data = await client.query(`SELECT * FROM users WHERE email= $1;`, [email]);
        const arr = data.rows;

        if (arr.length !== 0) {
            return res.status(400).json({
                error: "Email already exists. Please login instead."
            });
        } else {
            // Hash the password
            bcrypt.hash(password, 10, async (err, hash) => {
                if (err) {
                    return res.status(500).json({
                        error: "Server error"
                    });
                }

                // Insert user into the database
                try {
                    await client.query(
                        `INSERT INTO users (name, email, phonenumber, password) VALUES ($1, $2, $3, $4);`,
                        [name, email, phonenumber, hash]
                    );

                    // Generate a JWT token (optional)
                    const token = jwt.sign({ email: email }, process.env.SECRET_KEY);

                    res.status(200).json({
                        message: "User registered successfully",
                        token: token
                    });
                } catch (dbErr) {
                    return res.status(500).json({
                        error: "Database insertion error"
                    });
                }
            });
        }
    } catch (err) {
        res.status(500).json({
            error: "Database error while registering user"
        });
    }
};
