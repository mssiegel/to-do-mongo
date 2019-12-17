const express = require('express')
const router = express.Router()
const Post = require('../models/Post')

//Get all posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find()
    res.json(posts)
  } catch(err) {
    res.json({message: err})
  }
})

//Submit new post
router.post('/', async (req, res) => {
  const post = new Post({
    title: req.body.title,
    description: req.body.description
  })

  try {
    const savedPost = await post.save()
    res.status(200).json(savedPost)
  } catch {
    res.json({ message: err })
  }
})

//Get post
router.get('/:postId', async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId)
    res.json(post)
  } catch (err) {
    res.json({ message: err })
  }
})

//Delete post
router.delete('/:postId', async (req, res) => {
  try {
    const deletedPost = await Post.remove({ _id: req.params.postId })
    res.json(deletedPost)
  } catch (err) {
    res.json({ message: err })
  }
})

//Update post
router.patch('/:postId', async (req, res) => {
  try {
    const updatedPost = await Post.updateOne(
      { _id: req.params.postId },
      { $set: { title: req.body.title } }
    )
    res.json(updatedPost)
  } catch (err) {
    res.json({ message: err })
  }
})

module.exports = router