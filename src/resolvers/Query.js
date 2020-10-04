function feed (parent, args, {prisma}){
    return prisma.link.findMany()
}

async function link(parent, {id}, {prisma}) {
    const link = await prisma.link.findOne({
        where: {
            id
        }
    });
    if(!link){
        throw new Error('Link not found!');
    }

    return prisma.link;
}

module.exports = {
    feed,
    link
}