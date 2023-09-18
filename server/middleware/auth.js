import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
  try {
    let token = req.header("Authorization");
    console.log(token);

    if (!token) {
      return res.status(403).send("Access Denied");
    }

    if (token.startsWith("Bearer ")) {  
      token = token.slice(7, token.length).trimLeft();
    }

    try {
      const verified = jwt.verify(token, process.env.JWT_SECRET);
      req.user = verified;
      next();
    } catch (err) {
      if (err.name === "TokenExpiredError") {
        // If the token is expired, respond with a status code 401 (Unauthorized)
        return res.status(401).json({ error: "Token has expired" });
      } else {
        // For other token verification errors, respond with status code 500 (Internal Server Error)
        return res.status(500).json({ error: err.message });
      }
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

