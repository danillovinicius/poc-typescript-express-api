import * as config from 'config';
import * as jwt from 'jsonwebtoken';

export const verifyJWT = (req, res, next) => {
  // tslint:disable-next-line:no-string-literal
  const token = req.headers['authorization'];

  if (!token) { return res.status(401).send({ auth: false, message: 'Não foi localizado o token.' }); }

  jwt.verify(token, config.get('secret'), (err, decoded) => {
    if (err) { return res.status(500).send({ auth: false, message: 'Falha ao autenticar o token.' }); }
    req.user = decoded.user;
    next();
  });
};
