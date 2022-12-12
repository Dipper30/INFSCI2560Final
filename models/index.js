const UserSchema = require('./user')
const PostSchema = require('./post')

// Export model
module.exports = {
  User: UserSchema,
  Post: PostSchema,
}