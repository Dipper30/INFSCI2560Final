const { User, Post } = require('../models')
const { encryptMD5, generateToken, decryptToken, getDate } = require('../utils')

class PageController {
  
  /**
   * index page
   * require login
   */
  async index (req, res, next) {
    try {
      // if (!req.session) {
      //   res.redirect('/signin')
      //   return
      // }
      console.log(req.session.token)
      const auth = decryptToken(req.session.token || '')
      console.log(auth)
      if (!auth) {
        // res.status(403).json({
        //   code: 403,
        //   msg: 'Not Authorized',
        // })
        res.redirect('/signin')
      } else {
        const posts = await Post.find({}).sort({ created_at: -1 })
        console.log(posts)
        const p = posts.map(p => ({
          ...p._doc,
          id: p._id,
          created_at: getDate(p.created_at),
          updated_at: getDate(p.updated_at),
          abstract: p.content.length > 100 ? p.content.slice(0, 120) + '...' : p.content,
          views: {
            total: p.views.length,
            viewed: p.views.find(id => id == auth.id),
          },
          likes: {
            total: p.likes.length,
            liked: p.likes.find(id => id == auth.id),
          },
          dislikes: {
            total: p.dislikes.length,
            disliked: p.dislikes.find(id => id == auth.id),
          },
        }))
        res.render('index', { page: 'Pittsburgh Forum', user: auth, posts: p })
      }
    } catch (error) {
      next(error)
    }
  }

  async postDetail (req, res, next) {
    try {
      const auth = decryptToken(req.session.token)
      if (!auth) {
        // res.status(403).json({
        //   code: 403,
        //   msg: 'Not Authorized',
        // })
        req.nextPage = `/post/:${req.params.id}`
        res.redirect('/signin')
        return
      }
      const id = req.params.id
      if (!id) {
        res.status(400).json({
          msg: 'Invalid Post ID',
          code: 400,
        })
        return
      }
      const post = await Post.findById(id)
      const p = {
        ...post._doc,
        id: post.id,
        created_at: getDate(post.created_at),
        updated_at: getDate(post.updated_at),
        views: {
          total: post.views.length,
          viewed: post.views.find(id => id == auth.id),
        },
        likes: {
          total: post.likes.length,
          liked: post.likes.find(id => id == auth.id),
        },
        dislikes: {
          total: post.dislikes.length,
          disliked: post.dislikes.find(id => id == auth.id),
        },
      }
      res.render('post', { post: p, user: auth })
    } catch (error) {
      next(error)
    }
  }
  
}

module.exports = new PageController()