import { Prisma } from 'prisma-binding';

const prisma = new Prisma({
    typeDefs: 'src/generated/prisma.graphql',
    endpoint: 'https://vance-prisma-dev-5de4581415.herokuapp.com',
    secret: 'thisismysupersecrettext'
});

export { prisma as default };

// const objectData = (data) => {
//   return JSON.parse(JSON.stringify(data, undefined, 4));
// }

//prisma.exists.User({ id: 'ck3ympopj001507078ap8q5iv'}).then(exists => console.log(exists));



// const createPostForUser = async (authorId, data) => {
//   const userExists = await prisma.exists.User({ id: authorId });
//   if (!userExists) {
//     throw new Error ('User not found');
//   }
  
//   const post = await prisma.mutation.createPost({
//     data: {
//       ...data,
//       author: {
//         connect: {
//           id: authorId
//         }
//       }
//     }
//   }, '{ id author { id name email posts { id title published }} }');
   
//   return post.author;  
// };


// const updatePostForUser = async (postId, data) => {
//   const postExists = await prisma.exists.Post({ id: postId });
//   if(!postExists) throw new Error('Post not found');
  
//   const post = await prisma.mutation.updatePost({
//     where: { id: postId },
//     data
//   }, '{ author {  id name email posts { id title published } } }');
 
//   return post.author;
// }

// updatePostForUser('ck3yv21lh000i0796lui59du4', {
//   title: 'This is an updated post',
//   body: 'I hope this works',
//   published: true
// })
//   .then(user => console.log(JSON.stringify(user, undefined, 4)))
//   .catch(err => console.error(err));

// createPostForUser('ck3ympopj001507078ap8q5iv', {
//   title: 'How to win without trying',
//   body: 'It is SOOO Easy!',
//   published: true
// })
//   .then(user => console.log(JSON.stringify(user, undefined, 4)))
//   .catch(err => console.error(err));



// prisma.query.comments(null, '{ id text author { id name} }')
// .then(data => {  
//    **const comments = JSON.parse(JSON.stringify(data, undefined, 4));
//    ** console.log("COMMENT", comments);
//     **console.log(comments[0].author.id);
//    console.log(JSON.parse(JSON.stringify(data, undefined, 4)));
//     const comments = Object.values(data)[0];
//     const authorId = Object.values(data)[0].author.id;
//     console.log(comment, authorId);
//     author = JSON.parse(JSON.stringify(comment, undefined, 4));
//     console.log("Author", author);
// });


// prisma.mutation.updatePost({
//   data: {
//     body: "This is the updated post body",
//     published: true
//   },
//   where: {
//     id: "ck3ylgpgj000q0707lehsymcl"
//   }
// }, '{ id title body published }')
// .then(data => {
//   return prisma.query.posts(null, '{ id title body published }')
// })
// .then(data => {
//   console.log(JSON.stringify(data, undefined, 4));
// })
// .catch(err => console.error(err));
