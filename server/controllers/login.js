const bcrypt = require("bcrypt");
const client = require("../configs/database");
const jwt = require("jsonwebtoken");

// Login Controller Function
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Step 1: Check if user exists
        const data = await client.query(`SELECT * FROM users WHERE email= $1;`, [email]);
        const user = data.rows[0];

        if (!user) {
            return res.status(400).json({
                error: "User not registered. Please sign up."
            });
        }

        // Step 2: Compare password hash
        bcrypt.compare(password, user.password, (err, result) => {
            if (err) {
                return res.status(500).json({
                    error: "Server error during password comparison"
                });
            }

            if (result) {
                // Step 3: Generate JWT token
                const token = jwt.sign({ email: email }, process.env.SECRET_KEY);

                return res.status(200).json({
                    message: "User logged in successfully",
                    token: token
                });
            } else {
                return res.status(400).json({
                    error: "Incorrect password"
                });
            }
        });
    } catch (err) {
        res.status(500).json({
            error: "Database error during login"
        });
    }
};
