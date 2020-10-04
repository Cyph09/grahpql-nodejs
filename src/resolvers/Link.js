function postedBy (parent, args, ctx, info){
    return ctx.prisma.link.findOne({where: {id: parent.id}}).postedBy()
}

module.exports = {
    postedBy
}