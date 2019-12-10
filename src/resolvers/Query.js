const Query = {
    users(parent, { query }, { db, prisma }, info) {
      if (!query) return db.users;
      return db.users.filter(user => {
        return user.name.toLowerCase().includes(query.toLowerCase());
      });
    },

    me() {
      return {
        id: '123098',
        name: 'Mike',
        email: 'mike@example.com'
      };
    },
    post() {
      return {
        id: '1234',
        title: 'New Post',
        body: 'Body for new post',
        published: true
      };
    },

    posts(parent, { query }, { db }, info) {
      if (!query) return db.posts;
      return db.posts.filter(
        post =>
          post.title.toLowerCase().includes(query.toLowerCase()) ||
          post.body.toLowerCase().includes(query.toLowerCase())
      );
    },

    comments(parent, args, { db }, infot) {
      return db.comments;
    }
  };

  export { Query as default };