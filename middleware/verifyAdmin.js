const jwt = require('jsonwebtoken');
const JWT_SECRET = "vipadmin@akhuwatfoundation36";

const verifyAdmin = (req, res, next) => {
  const token = req.header('auth-token'); 
  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.admin = decoded;
    next();
  } catch (err) {
    res.status(400).json({ error: 'Invalid token.' });
  }
};

module.exports = verifyAdmin;