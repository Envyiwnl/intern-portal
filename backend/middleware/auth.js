import { verifyToken } from '../utils/jwt.js';

export default function (req, res, next) {
  const header = req.headers.authorization?.split(' ')[1];
  if (!header) return res.status(401).json({ msg: 'No token' });

  try {
    const decoded = verifyToken(header);
    req.user = decoded.id;
    next();
  } catch {
    res.status(401).json({ msg: 'Invalid token' });
  }
}