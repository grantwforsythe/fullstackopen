import jwt from 'jsonwebtoken';
import { ACCESS_TOKEN } from '../utils/config';
import User from '../models/user';

/**
 * Sets the request.user property.
 */
export default async (request, response, next) => {
  if (request.headers.authorization) {
    // e.g. 'Authorization Bearer ${token}'
    const token = jwt.verify(
      request.headers.authorization.split(' ')[1],
      ACCESS_TOKEN
    );

    if (token) {
      request.user = await User.findById(token.id);
    }
  }

  next();
};
