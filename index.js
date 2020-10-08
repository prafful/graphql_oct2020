var express = require('express')
var {graphqlHTTP} = require('express-graphql')

var schema = require('./schema/schema')

var app  = express()

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql:true
}))

app.listen(8888, ()=>{
    console.log("express app listening on port 8888");
})