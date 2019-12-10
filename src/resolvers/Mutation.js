import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import getUserId from '../utils/getUserId';

const Mutation = {
  async createUser(parent, args, { prisma }, info) {
    if (args.data.password.length < 8) {
      throw new Error('Password must be at least 8 characters');
    }

    const hashedPassword = await bcrypt.hash(args.data.password, 10);

    const emailTaken = await prisma.exists.User({ email: args.data.email });
    if (emailTaken) throw new Error(`Email ${email} is already taken.`);
    const user = await prisma.mutation.createUser({
      data: {
        ...args.data,
        password: hashedPassword
      }
    });

    return {
      user,
      token: jwt.sign({ userId: user.id }, 'thisisasecret')
    };
  },

  async login(parent, { data: { email, password } }, { prisma }, info) {
    const user = await prisma.query.user({
      where: {
        email
      }
    });
    if (!user) {
      throw new Error('Unable to login');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error('Unable to log in');
    }

    return {
      user,
      token: jwt.sign({ userId: user.id }, 'thisisasecret')
    };
  },

  async deleteUser(parent, args, { prisma, request }, info) {
    // this will throw an error if no valid auth header is found
    const userId = getUserId(request);

    const userExists = await prisma.exists.User({ id: userId });
    if (!userExists) throw new Error(`User not found.`);

    return prisma.mutation.deleteUser(
      {
        where: {
          id: userId
        }
      },
      info
    );
  },

  async updateUser(
    parent,
    { data: { name, email } },
    { prisma, request },
    info
  ) {
    // force authentication
    const userId = getUserId(request);

    return prisma.mutation.updateUser(
      {
        where: {
          id: userId
        },
        data: {
          name,
          email
        }
      },
      info
    );
  },

  createPost(
    parent,
    { data: { title, body, published } },
    { prisma, request },
    info
  ) {
    const userId = getUserId(request);

    return prisma.mutation.createPost(
      {
        data: {
          title,
          body,
          published,
          author: {
            connect: {
              id: userId
            }
          }
        }
      },
      info
    );
  },

  async deletePost(parent, { id }, { prisma, request }, info) {
    const userId = getUserId(request);
    const postExists = await prisma.exists.Post({
      id,
      author: {
        id: userId
      }
    });

    if (!postExists) {
      throw new Error('Unable to find post for delete');
    }

    return prisma.mutation.deletePost(
      {
        where: {
          id
        }
      },
      info
    );
  },

  async updatePost(
    parent,
    { id, data: { title, body, published } },
    { prisma, request},
    info
  ) {

    const userId = getUserId(request);

    const postExists = await prisma.exists.Post({
      id,
      author: {
        id: userId
      }
    })

    if(!postExists) {
      throw new Error('Unable to locate post for update');
    }

    return prisma.mutation.updatePost(
      {
        data: {
          title,
          body,
          published
        },
        where: {
          id
        }
      },
      info
    );
  },

  createComment(parent, {data: { text, post }}, { prisma, request }, info) {
    const userId = getUserId(request);

    return prisma.mutation.createComment(
      {
        data: {
          text: text,
          author: {
            connect: {
              id: userId
            }
          },
          post: {
            connect: {
              id: post
            }
          }
        }
      },
      info
    );
  },

  async deleteComment(parent, { id }, { prisma, request }, info) {
    const userId = getUserId(request);
    const commentExists = await prisma.exists.Comment({
      id,
      author: {
        id: userId
      }
    });

    if (!commentExists) {
      throw new Error('Unable to delete comment');
    }

    return prisma.mutation.deleteComment({
      where: {
        id
      }
    });
  },

 async updateComment(parent, { id, data: { text } }, { prisma, request }, info) {
    const userId = getUserId(request);
    const commentExists = await prisma.exists.Comment({
      id,
      author: {
        id: userId
      }
    });

    if (!commentExists) {
      throw new Error('Unable to update comment');
    }

    return prisma.mutation.updateComment(
      {
        where: {
          id
        },
        data: {
          text
        }
      },
      info
    );
  }
};

export { Mutation as default };
