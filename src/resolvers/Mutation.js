import uuidv4 from 'uuid/v4';

const Mutation = {
    createUser(parent, { data: { email, name, age } }, { db }, info) {
      const emailTaken = db.users.some(user => user.email === email);
      if (emailTaken) throw new Error(`Email ${email} is already taken.`);
      const user = {
        id: uuidv4(),
        email,
        name,
        age
      };

      db.users.push(user);
      return user;
    },

    deleteUser(parent, { id }, { db }, info) {
      const userIndex = db.users.findIndex(user => user.id === id);
      if (userIndex === -1) throw new Error('User not found');
      const deletedUsers = db.users.splice(userIndex, 1);
      db.posts = db.posts.filter(post => {
        const match = post.author === id;
        if (match) {
          db.comments = db.comments.filter(comment => comment.post !== post.id);
        }
        return !match;
      });

      db.comments = db.comments.filter(comment => comment.author !== id);

      return deletedUsers[0];
    },

    updateUser(parent, { id, data: { name, email, age } }, { db }, info){
      const user = db.users.find(user => user.id === id);

      if (!user) throw new Error('Unable to update user. User not found');

      if (typeof email === 'string') {
        const emailTaken = db.users.some(user => user.email === email);
        if(emailTaken) throw new Error ('Email already in use');
        user.email = email;
      }

      if(typeof name === 'string') {
        user.name = name;
      }

      if(typeof age !== 'undefined') {
        user.age = age;
      }

      return user;

    },

    createPost(
      parent,
      { data: { title, body, published, author } },
      { db, pubsub },
      info
    ) {
      const userExists = db.users.some(user => user.id === author);
      if (!userExists) throw new Error('User not found');
      const post = {
        id: uuidv4(),
        title,
        body,
        published,
        author
      };
      db.posts.push(post);
      // call subscription if published
      if (published) {
        pubsub.publish('post', {
          post: {
            mutation: 'CREATED',
            data: post
          }
        })
      }
      return post;
    },

    deletePost(parent, { id }, { db, pubsub }, info) {
      const postIndex = db.posts.findIndex(post => post.id === id);      
      if (postIndex === -1)
        throw new Error('Unable to delete post. Post not found');
      const [deletedPost] = db.posts.splice(postIndex, 1);
      db.comments = db.comments.filter(comment => comment.post !== id);   
      
      if(deletedPost.published) {
        pubsub.publish('post', {
          post: {
            mutation: 'DELETED',
            data: deletedPost
          }
        })
      }
      
      return deletedPost;
    },

    updatePost(parent, {id, data: { title, body, published }}, { db, pubsub }, info) {
        const post = db.posts.find(post => post.id === id);
        const originalPost = { ...post };
        if(!post) throw new Error ('Unable to update post. Post not found');

        if (typeof title === 'string') {
          post.title = title;
        }

        if (typeof body === 'string') {
          post.body = body;
        }

        if (typeof published === 'boolean') {
          post.published = published;
          if (originalPost.published  && !post.published ) {           
            pubsub.publish('post', {
              post: {
                mutation: 'DELETED',
                data: originalPost
              }
            });

          } else if (!originalPost.published && post.published) {
            pubsub.publish('post', {
              post: {
                mutation: 'CREATED',
                data: post
              }
            })
          }
        }  else if (post.published) {
          pubsub.publish('post', {
            post: {
              mutation: 'UPDATED',
              data: post
            }
          })
        }      

        return post;
    },

    createComment(parent, { data: { text, author, post } }, { db, pubsub }, info) {
      const userExists = db.users.some(user => user.id === author);
      if (!userExists) throw new Error('User not found');
      const existingPost = db.posts.find(searchPost => {        
        return post == searchPost.id;
      });
      if (!existingPost) throw new Error('Post not found');
      if (!existingPost.published) throw new Error('Post not published');
      const comment = {
        id: uuidv4(),
        text,
        author,
        post
      };
      db.comments.push(comment);
      pubsub.publish(`comment ${post}`, {
        comment: {
          mutation: 'CREATED',
          data: comment
        }
      });
      return comment;
    },

    deleteComment(parent, { id }, { db, pubsub }, info) {
      const commentIndex = db.comments.findIndex(comment => comment.id === id);
      if (commentIndex === -1)
        throw new Error(
          `Unable to delete comment with id ${id}. Comment not found`
        );
      const [deletedComment] = db.comments.splice(commentIndex, 1);
      pubsub.publish(`comment ${deletedComment.post}`, {
        comment: {
          mutation: 'DELETED',
          data: deletedComment
        }
      })
      return deletedComment;
    },

    updateComment(parent, { id, data: { text }}, { db, pubsub }, info) {
      const comment = db.comments.find(comment => comment.id === id);
      if (!comment) throw new Error('Unble to update comment. Comment not found');

      if(typeof text === 'string') {
        comment.text = text;
      }

      pubsub.publish(`comment ${comment.post}`, {
        comment: {
          mutation: 'UPDATED',
          data: comment
        }
      })

      return comment;
    }
  };

  export { Mutation as default };