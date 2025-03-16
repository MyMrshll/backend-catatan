
const jwt = require("jsonwebtoken");
const verifyToken = async (req, res, next) => {
try {
    const headers = req.headers.authorization;
    if(!headers) {
        return res.status(401).json({ message: "Token not found" });
    }

    const token =  headers.split(" ")[1];
    
    if (!token) {
        return res.status(401).json({ message: "Token not found" });
    }

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decodedToken) => {
        if (err) {
            res.status(401).json({ message: "Invalid token" });
            throw new Error(err);
        }
        req.user = decodedToken;
    });


    next();
} catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
}
};

module.exports = verifyToken;