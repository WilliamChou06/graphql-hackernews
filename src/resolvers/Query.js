const feed = async (root, args, context, info) => {
  const where = args.filter
    ? {
        OR: [
          { description_contains: args.filter },
          { url_contains: args.filter }
        ]
      }
    : {};
  const links = await context.prisma.links({
    where,
    first: args.first,
    skip: args.skip
  });
  return links;
};

module.exports = {
  feed
};
