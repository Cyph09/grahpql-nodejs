function links(parent, args, ctx){
    return ctx.prisma.user.findOne({where: {id: parent.id}}).links();
}

module.exports = {
    links
}