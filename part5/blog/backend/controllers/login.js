import jwt from 'jsonwebtoken';
import bcrytp from 'bcrypt';

import { ACCESS_TOKEN } from '../utils/config';
import User from '../models/user';

export default async (request, response) => {
  const { username, password } = request.body;

  const user = await User.findOne({ username });
  const isPasswordCorrect =
    user === null ? false : await bcrytp.compare(password, user.passwordHash);

  if (!(user && isPasswordCorrect)) {
    return response.status(401).json({ error: 'invalid username or password' });
  }

  const payload = { username: user.username, id: user.id };
  const token = jwt.sign(payload, ACCESS_TOKEN, { expiresIn: 60 * 60 });

  return response.status(200).send({ token });
};
