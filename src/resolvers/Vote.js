function link(parent, args, ctx, info){
    return ctx.prisma.vote.findOne({where: {id: parent.id}}).link()
}

function user(parent, args,ctx, info){
    return ctx.prisma.vote.findOne({where: {id: parent.id}}).user()
}

module.exports = {
    link, user,
}