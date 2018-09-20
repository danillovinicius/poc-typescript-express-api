import * as jwt from 'jsonwebtoken';
import * as config from 'config';

export const verifyJWT = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) return res.status(401).send({ auth: false, message: 'Não foi localizado o token.' });

  jwt.verify(token, config.get('secret'), (err, decoded) => {
    if (err) return res.status(500).send({ auth: false, message: 'Falha ao autenticar o token.' });
    // OK
    req.userId = decoded.id;
    next();
  });
};
