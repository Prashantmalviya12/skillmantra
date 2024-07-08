const jwt = require('jsonwebtoken');



const verifyToken = (req, res, next) => {
  const token = req.body.token || req.query.token || req.headers["authorization"];

  if (!token) {
      return res.status(403).json({ success: false, message: 'No token provided' });
  }

  try {
      const bearer = token.split(' ');
      const bearerToken = bearer[1];
      const verifiedData = jwt.verify(bearerToken, process.env.JWT_SECRETE_KEY);
      req.user = verifiedData.user;
      next(); // Call next once token is verified
  } catch (error) {
      res.status(400).json({ message: 'Invalid Token', error });
  }
};
module.exports = verifyToken;
