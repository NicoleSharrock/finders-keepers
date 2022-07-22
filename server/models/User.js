const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/.+@.+\..+/, 'Must be a valid email address!']
        },
        password: {
            type: String,
            required: true,
            minlength: 6
        },
        items: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Item'
            }
        ]
    },
    {
        toJSON: {
            virtuals: true
        }
    }
);

// pre-save middleware
userSchema.pre('save', async function(next) {
    if (this.isNew || this.isModified('password')) {
      const saltRounds = 10;
      this.password = await bcrypt.hash(this.password, saltRounds);
    }
  
    next();
  });
  
  // compare imcoming with hashed
  userSchema.methods.isCorrectPassword = async function(password) {
    return bcrypt.compare(password, this.password);
  };
  
  const User = model('User', userSchema);
  
  module.exports = User;