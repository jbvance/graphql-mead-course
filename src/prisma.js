import { Prisma } from 'prisma-binding';

const prisma = new Prisma({
    typeDefs: 'src/generated/prisma.graphql',
    endpoint: 'https://vance-prisma-dev-5de4581415.herokuapp.com'
});

//prisma.query.users(null, '{ id name  posts { id title } }')

prisma.query.posts(null, '{ id title body author { name }}')
.then(data => {
    //console.log(JSON.stringify(data));
    //const a = JSON.parse(JSON.stringify(data, undefined, 4));
    //console.log(a);
});

prisma.query.comments(null, '{ id text author { id name} }')
.then(data => {
    const comments = JSON.parse(JSON.stringify(data, undefined, 4));
    console.log("COMMENT", comments);
    console.log(comments[0]).id
   // console.log(JSON.parse(JSON.stringify(data, undefined, 4)));
    //const comment = Object.values(data)[0];
    //const authorId = Object.values(data)[0].author.id;
    //console.log(comment, authorId);
    //author = JSON.parse(JSON.stringify(comment, undefined, 4));
    //console.log("Author", author);
})