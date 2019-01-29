const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { APP_SECRET, getUserId } = require('../utils');

const signup = async (parent, args, context, info) => {
  const password = await bcrypt.hash(args.password, 10);

  const user = await context.prisma.createUser({ ...args, password });

  const token = jwt.sign({ userId: user.id }, APP_SECRET);

  return { token, user };
};

const login = async (parent, { email, password }, context, info) => {
  const user = await context.prisma.user({ email });
  if (!user) {
    throw new Error('No such user found!');
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    throw new Error('Invalid Password');
  }

  const token = jwt.sign({ userId: user.id }, APP_SECRET);

  return { token, user };
};

const post = (parent, { url, description }, context, info) => {
  const userId = getUserId(context);
  return context.prisma.createLink({
    url,
    description,
    postedBy: { connect: { id: userId } }
  });
};

const vote = async (parent, { linkId }, context, info) => {
  const userId = getUserId(context);

  const linkExists = await context.prisma.$exists.vote({
    user: { id: userId },
    link: { id: linkId }
  });

  if (linkExists) {
    throw new Error(`You have already voted for link: ${linkId}`);
  }

  return context.prisma.createVote({
    user: { connect: { id: userId } },
    link: { connect: { id: linkId } }
  });
};

module.exports = {
  signup,
  login,
  post,
  vote
};
