import express from "express"
import authenticateToken from "../middleware/AuthToken.js"
import { create_post, update_post, Deletepost, post_by_id, all_post, like_a_post, unlike_a_post, lim_post } from "../controllers/post.controller.js"

const router = express.Router()

router.post('/create', authenticateToken, create_post)
router.put('/update-post', authenticateToken, update_post)
router.delete('/delete-post', authenticateToken, Deletepost)
router.get('/sppost/:id', post_by_id)
router.get('/allposts', all_post)
router.post('/unlike/:id', authenticateToken, unlike_a_post)
router.post('/like/:id', authenticateToken, like_a_post)
router.get('/limit-post', lim_post)

export default router