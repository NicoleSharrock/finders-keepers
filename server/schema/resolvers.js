const { AuthenticationError } = require('apollo-server-express');
const { User, Item } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select('-__v -password')
          .populate('items')

        return userData;
      }

      throw new AuthenticationError('Not logged in');
    },
    users: async () => {
      return User.find()
        .select('-__v -password')
        .populate('items');
    },
    user: async (parent, { username }) => {
      return User.findOne({ username })
        .select('-__v -password')
        .populate('items');
    },
    items: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Item.find(params);
    },
    item: async (parent, { _id }) => {
      return Item.findOne({ _id });
    }
  },

  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    login: async (parent, { username, password }) => {
      const user = await User.findOne({ username });

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);
      return { token, user };
    },
    addItem: async (parent, args, context) => {
      if (context.user) {
        const item = await Item.create({ ...args, username: context.user.username });

        await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { items: item._id } },
          { new: true }
        );

        return item;
      }

      throw new AuthenticationError('You need to be logged in!');
    },
    removeItem: async (parent, args, context) => {
        if (context.user) {
          const item = await Item.destroy({ _id: args._id });
  
          await User.findByIdAndUpdate(
            { _id: context.user._id },
            { $pull: { items: item._id } },
            { new: true }
          );
  
          return item;
        }
  
        throw new AuthenticationError('You need to be logged in!');
      },

  }
};

module.exports = resolvers;
