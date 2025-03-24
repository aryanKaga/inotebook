const express = require('express');
const router = express.Router();
const usermodel = require('../controller/model/usermodel');
const jwt = require("jsonwebtoken");
const key = require('./secretkey'); // Store your secret key securely
const bcrypt = require("bcrypt"); // For password hashing
const cookieParser = require("cookie-parser"); 
const { verify, Login } = require('./Login&verify'); // Import verification middleware and Login function

router.use(cookieParser()); // Middleware to parse cookies

// ✅ Signup Route (Register New User & Generate Token)
router.post('/Signup', async (req, res) => {
    if (req.cookies.auth_token) { 
        try {
            const decoded = jwt.verify(req.cookies.auth_token, key);
            console.log("Verified user");
            return res.status(200).json({ verified: true });
        } catch (error) {
            console.log("Invalid Token:", error.message);
            return res.status(403).json({ msg: "Invalid or expired token" });
        }
    }

    try {
        // Hash the password before storing it
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = await usermodel.create({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        });

        // Generate JWT token

        const token = jwt.sign({ username: req.body.username ,id:newUser.id}, key, { expiresIn: "2h" });

        // Send token as HttpOnly cookie
        return res
            .status(201) // 201 for created
            .cookie("auth_token", token, { httpOnly: true
                ,
                secure: false, 
                sameSite: "None", 
                domain: "192.168.137.1",
             })
            .json({ msg: "User registered successfully!" });

    } catch (error) {
        console.log(error);
        return res.status(409).json({ msg: "Duplicate data" }); // 409 for duplicate user
    }
});

// ✅ Protected Route (Requires Authentication)
router.get('/', verify, (req, res) => {
    res.json({ msg: "Protected route accessed", user: req.user });
});

// ✅ Login Route (Authenticate User & Generate Token)
router.post('/login', Login);

// ✅ Logout Route (Clearing Token)
router.post('/Logout', (req, res) => {
    return res
        .clearCookie("auth_token")
        .json({ msg: "Logged out successfully" });
});

module.exports = router;
