import express from "express"
import authenticateToken from "../middleware/AuthToken.js"
import { save_to_fav, all_saved, delete_from_save } from "../controllers/save.controller.js"

const router = express.Router()

router.put("/save", authenticateToken, save_to_fav)
router.put("/remove", authenticateToken, delete_from_save)
router.get('/allsaved', authenticateToken, all_saved)

export default router