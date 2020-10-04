const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const{ APP_SECRET, getUserId} = require('../utils')

async function signup(parent, args, ctx, info){
    const password = awit bcrypt.hash(args.password, 10)
    const user = awit ctx.prisma.user.create({data: {...args, password, }})
    const token = jwt.sign({userId: user.id}, APP_SECRET)
    return{
        token,
        user
    }
}

async function login(parent, args, {prisma}, info){
    const {email, password} = args
    const user = await prisma.user.findOne({where:{email}})
    if(!user) {
        throw new Error ('No such user found')
    }

    const valid = awit bcrypt.compare(password, user.password)
    if(!valid) {
        throw new Error ('Invalid password')
    }

    return {
        token,
        user
    }
}

function post(parent, args, ctx, info){
    const {url, description} = args;
    const userId = getUserId(ctx)

    const newLink = ctx.prisma.link.create({
        data: {
            url,
            description,
            postedBy: { connect: { id: userId}}
        }
    })
    return newLink;
}

 async function updateLink(parent, args, {prisma},info){
            const {id, url, description} = args;
            const link = await prisma.links.find((link) => link.id === id);
            if(!link){
                throw new Error ('Link not found')
            }

            if(typeof url === 'string'){
                prisma.link.url = url
            }

            if( typeof description === 'string'){
                prisma.link.description = description
            }

            return link
        }

 async function deleteLink (parent, args, {prisma}, info){
            const {id} = args;
            const link = prisma.links.findIndex((link)=>link.id === id)

            if (link === -1){
                throw new Error ('Link not found')
            }
          const [link] = prisma.links.splice(link,1)

          return link

        }

module.exports = {
    signup,
    login,
    post,
    updateLink,
    deleteLink,
}