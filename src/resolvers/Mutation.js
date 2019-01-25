const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { APP_SECRET, getUserId } = require('../utils');

const signup = async (parent, args, context, info) => {
  const password = await bcrypt.hash(args.password, 10);

  const user = await context.prisma.createUser({ ...args, password });

  const token = jwt.sign({ userID: user.id }, APP_SECRET);

  return { token, user };
};

const login = async (parent, { email, password }, context, info) => {
  const user = await context.prisma.user({ email });
  if (!user) {
    throw new Error('No such user found!');
  }

  const valid = await bcrypt.compare(user.password, password);
  if (!valid) {
    throw new Error('Invalid Password');
  }

  const token = jwt.sign({ userID: user.id }, APP_SECRET);

  return { token, user };
};

module.exports = {
  signup,
  login,
  post
};
