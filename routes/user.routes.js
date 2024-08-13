import express from "express"
import { register, login, GetData, follow, unfollow, get_other_user_info, update_profile } from "../controllers/user.controller.js"
import authenticateToken from "../middleware/AuthToken.js"

const router = express.Router()

router.post('/signup', register)
router.post('/signin', login)
router.get('/get-user-info', GetData)
router.put('/unfollow/:id', authenticateToken, unfollow)
router.put('/follow/:id', authenticateToken, follow)
router.get('/userinfo', authenticateToken, get_other_user_info)
router.put('/update_prop', authenticateToken, update_profile)

export default router