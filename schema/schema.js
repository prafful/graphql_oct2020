var graphql = require('graphql')

var {GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLSchema} = graphql

var FriendType = new GraphQLObjectType({
    name:'Friend',
    fields: ()=>({
        id:{type: GraphQLString},
        name: {type: GraphQLString},
        location: {type: GraphQLString},
        score: {type: GraphQLInt}
    })
})

var RootQuery = new GraphQLObjectType({
    name:'RootQueryType',
    fields:{
        friends:{
            type: FriendType,
            args:{ id:{type: GraphQLString}},
            resolve(parent, args){
                //code to get data from data source
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})

