const { GraphQLServer } = require ('graphql-yoga')
const { PrismaClient }  = require('@prisma/client')

const resolvers = {
    Query: {
        info: () => `This is the API of a Hackernews Clone`,
        feed: async (parent, args, ctx) => {
            return ctx.prisma.link.findMany()
        },
        link: async (parent, {id}, {prisma}) => {
            const link = await prisma.link.findOne({
                where: {
                    id
                }
            });
            if(!link){
                throw new Error('Link not found!');
            }

            return link;
        }
    },

    Mutation: {
        post: (parent, args, {prisma}, info) => {
            const {url, description} = args;
            const newLink = prisma.link.create({
                data: {
                    url,
                    description
                }
            });
            return newLink;
        }, 

        // updateLink:(parent, args, ctx)=>{
        //     const link = links.find((link) => link.id === args.id)
        //     if(!link){
        //         throw new Error ('Link not found')
        //     }

        //     if(typeof args.url === 'string'){
        //         link.url = args.url
        //     }

        //     if( typeof args.description === 'string'){
        //         link.description = args.description
        //     }

        //     return link
        // },

        // deleteLink: (parent, args) =>{
        //     const linkIndex = links.findIndex((link)=>link.id === args.id)

        //     if (linkIndex === -1){
        //         throw new Error ('Link not found')
        //     }
        //   const [link] = links.splice(linkIndex,1)

        //   return link

        // }

    }

   
}

const prisma = new PrismaClient();

const server = new GraphQLServer ({
    typeDefs: './src/schema.graphql',
    resolvers,
    context: {
        prisma
    }
})
server.start(() => console.log(`Server is running on port 4000`))