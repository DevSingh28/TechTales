import express from "express";
import { add_comment, delete_comment, update_comment, get_comments } from "../controllers/comment.controller.js";
import authenticateToken from "../middleware/AuthToken.js";

const router = express.Router();

router.post("/posts/:postId/comments", authenticateToken, add_comment);
router.get("/posts/:postId/comments", get_comments);
router.put("/posts/:postId/comments/:commentId", authenticateToken, update_comment);
router.delete("/posts/:postId/comments/:commentId", authenticateToken, delete_comment);

export default router;
