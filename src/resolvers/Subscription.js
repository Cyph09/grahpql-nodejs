function newLinkSubscribe (parent, args, {pubsub}, info ){
    return pubsub.asyncIterator("NEW_LINK")
}

const newLink = {
    subscribe: newLinkSubscribe,
    resolve: payload => {
        return payload
    }
}

function newVoteSubscribe (parent, args, ctx, info){
    return ctx.pubsub.asyncIterator("NEW_VOTE")
}

const newVote = {
    subscribe: newVoteSubscribe,
    resolve: payload => {
        return payload
    },
}

module.exports = {
    newLink,
    newVote
}