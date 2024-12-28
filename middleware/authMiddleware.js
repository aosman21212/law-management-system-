const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    // Extract token from Authorization header (Bearer <token>)
    const token = req.header("Authorization") && req.header("Authorization").split(' ')[1];

    if (!token) {
        // If no token is provided
        return res.status(401).json({ message: "Access denied, no token provided" });
    }

    try {
        // Verify the token using the JWT secret
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        
        // Attach the decoded user information to the request object
        req.user = verified;

        // Call the next middleware or route handler
        next();
    } catch (error) {
        // If token is invalid
        res.status(401).json({ message: "Invalid token" });
    }
};

module.exports = authMiddleware;
