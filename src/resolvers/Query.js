const Query = {
    users(parent, { query }, { prisma }, info) {
      const opArgs = {};
      if(query) {
        opArgs.where = {
          OR: [{
            name_contains: query
          }, {
            email_contains: query
          }]
        }
      }     
      return prisma.query.users(opArgs, info);      
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

    posts(parent, { query }, { prisma }, info) {
      const opArgs = {};
      if (query) {
        opArgs.where = {
          OR: [{
            title_contains: query
          }, {
            body_contains: query
          }]
        };
      }
      return prisma.query.posts(opArgs, info);      
    },

    comments(parent, { query }, { prisma }, info) {
      return prisma.query.comments(null, info);
    }
  };

  export { Query as default };