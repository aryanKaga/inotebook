const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const usermodel = require("../controller/model/usermodel");
const key = require("./secretkey");

// ✅ Middleware for verifying JWT token
const verify = async (req, res, next) => {
    console.log("Middleware executed");
    //if(req.)
    if(req.originalUrl==='/auth/Signup' || req.originalUrl==='/auth/login'){console.log('logging');return next();}//calling next if its signup route
    if (!req.cookies?.auth_token) {
        try{
            console.log('yeah');
            return Login(req,res);
        }
        catch(err){console.log(err)}
    }

    try {
        const decoded = jwt.verify(req.cookies.auth_token, key);
        req.user = decoded; // Attach user info to `req`
        console.log("User verified:", decoded);
        console.log(req.originalUrl);
        if(req.originalUrl==='/verify' ){return res.status(200).json({user:"user verified"});}
        else{next();}

    } catch (error) {
        console.log("Invalid Token:", error.message);
        return res.status(403).json({ msg: "Invalid or expired token" });
    }
};

// ✅ Login Function (Authenticate User & Generate Token)
const Login = async (req, res) => {
   
    try {
        if(!req.body.username){return res.status(403).json({msg:"user not logged in"});}
        const user = await usermodel.findOne({ username: req.body.username });

        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }

        // Check password
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch) {
            return res.status(401).json({ msg: "Invalid password" });
        }

        // Generate JWT token
        const token = jwt.sign({ username: user.username }, key, { expiresIn: "2h" });

        // Send token as HttpOnly cookie
        console.log('user found');
        return res
            .status(200)
            .cookie("auth_token", token, { httpOnly: true, sameSite: "Lax" }) // ✅ Secure handling of cookies
            .json({ msg: "Login successful!" });

    } catch (error) {
        console.log("Error:", error);
        return res.status(500).json({ msg: "Internal Server Error" });
    }
};

module.exports = { verify, Login };
