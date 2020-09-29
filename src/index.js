const { GraphQLServer } = require ('graphql-yoga')

let links = [{
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for GraphQL'
}]

let idCount = links.length
const resolvers = {
    Query: {
        info: () => `This is the API of a Hackernews Clone`,
        feed: () => links,
        link: (parent, {id}) => {
            const link = links.find((link)=>link.id === id);
            if(!link){
                throw new Error('Link not found!');
            }

            return link;
        }
    },

    Mutation: {
        post: (parent, args) => {
            const link = {
                id: `link-${idCount++}`,
                description: args.description,
                url: args.url
            }
            links.push(link)
            return link
        }, 

        updateLink:(parent, args)=>{
            const link = links.find((link) => link.id === args.id)
            if(!link){
                throw new Error ('Link not found')
            }

            if(typeof args.url === 'string'){
                link.url = args.url
            }

            if( typeof args.description === 'string'){
                link.description = args.description
            }

            return link
        }

    }

   
}

const server = new GraphQLServer ({
    typeDefs: './src/schema.graphql',
    resolvers
})
server.start(() => console.log(`Server is running on port 4000`))