var graphql = require('graphql')
var _=require('lodash')

var {
        GraphQLObjectType, 
        GraphQLString, 
        GraphQLInt, 
        GraphQLSchema,
        GraphQLID,
        GraphQLList
    } = graphql

//data source
var friends = [
    {id:'1', name:'OBB', score:20},
    {id:'2', name:'CAS', score:12},
    {id:'3', name:'OWIOH', score:28},
    {id:'4', name:'BNP', score:10},
    {id:'5', name:'OBBO', score:20},
    {id:'6', name:'CASA', score:12},
    {id:'7', name:'OVO', score:28},
    {id:'8', name:'BNPJ', score:10},

]

var locations = [
    { id:'1', location:'chennai', friendid:'1' },
    { id:'2', location:'bengaluru', friendid:'2' },
    { id:'3', location:'tokyo', friendid:'3' },
    { id:'4', location:'jodhpur', friendid:'4' },
    { id:'5', location:'chennai', friendid:'5' },
    { id:'6', location:'chennai', friendid:'6' },
    { id:'7', location:'tokyo', friendid:'7' },
    { id:'8', location:'tokyo', friendid:'8' }
]

var FriendType = new GraphQLObjectType({
    name:'Friend',
    fields: ()=>({
        id:{type: GraphQLID},
        name: {type: GraphQLString},
        score: {type: GraphQLInt},
        location:{
            type: LocationType,
            resolve(parent, args){
                console.log("In FriendType");
                console.log(parent)
                console.log(args);
                console.log(locations);
                return _.find(locations, {id: parent.id})
            }
        }
    })
})

var LocationType = new GraphQLObjectType({
    name: 'Location',
    fields: ()=>({
        id:{type: GraphQLID},
        location: {type: GraphQLString},
        friendid: {type: GraphQLID},
        friends:{
            type:new GraphQLList(FriendType),
            resolve(parent, args){
                console.log(parent);
              return _.filter(friends, {id: parent.id})       
            }
        }
        
    })
    
})


var RootQuery = new GraphQLObjectType({
    name:'RootQueryType',
    fields:{
        friends:{
            type: FriendType,
            args:{ id:{type: GraphQLID}},
            resolve(parent, args){
                //code to get data from data source
                console.log(typeof(args.id));
                return _.find(friends, {id: args.id} )
            }
        },
        locations:{
            type: LocationType,
            args:{id: {type: GraphQLID}},
            resolve(parent, args){
                console.log("In locations RootQuery")
                console.log(parent)
                console.log(args)
                //code to get data from data source
                return _.find(locations, {id:args.id})
            }
        }
    }
})


module.exports = new GraphQLSchema({
    query: RootQuery
})

