import config from 'config';
import { Request } from 'express';
import jwt from 'express-jwt';

/**
 * We are assuming that the JWT will come in a header with the form "Authorization: Bearer ${JWT}"
 */
const getTokenFromHeader = (req: Request) => {
  try {
    if ((req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Token') || (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer')) {
      return req.headers.authorization.split(' ')[1];
    }
    return null;
  } catch (e) {
    console.error(e);
    return null;
  }
};

const isAuth = jwt({
  secret: config.get('jwt.secretKey'), // The _secret_ to sign the JWTs
  userProperty: 'token', // Use req.token to store the JWT
  getToken: getTokenFromHeader // How to extract the JWT from the request
});
export default isAuth;
