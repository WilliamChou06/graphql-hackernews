const feed =  (root, args, context, info) => context.prisma.links();

module.exports = {
  feed
}
