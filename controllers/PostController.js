const { User, Post } = require('../models')
const { encryptMD5, generateToken, decryptToken, getTS } = require('../utils')

class PostController {
  
  async posting (req, res, next) {
    if (!req.session.token) {
      res.status(403).json({
        code: 403,
        msg: 'Not Authorized',
      })
      return
    }
    const user = decryptToken(req.session.token)

    const { title, content } = req.body
    try {
      const post = await Post.create({
        title,
        content,
        created_at: getTS(),
        updated_at: getTS(),
        author: user,
        likes: [],
        dislikes: [],
        views: [],
      })


      res.json({
        code: 201,
        msg: 'posted',
        data: post._id,
      })
    } catch (error) {
      next(error)
    }
  }

  async getPosts (req, res, next) {
    try {
      const posts = await Post.find({}).sort({ created_at: -1 })

      res.json({
        code: 200,
        msg: 'posts',
        data: posts,
      })
    } catch (error) {
      next(error)
    }
  }

  
}

module.exports = new PostController()