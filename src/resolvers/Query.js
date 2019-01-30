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
    skip: args.skip,
    orderBy: args.orderBy
  });
  return links;
};

module.exports = {
  feed
};
