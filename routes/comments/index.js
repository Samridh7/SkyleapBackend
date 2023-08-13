const { Router } = require("express");
const { addNewComment,showAllComments, deleteAComment } = require("../../controllers/comments");

const route = Router();


route.post("/comment", async (req,res) => {
    const {userId,postId, title, body} = req.body

    if((!userId) || (!title) || (!body) || (!postId)){
        return res.status(400).send({
            error: "Need userId, postId, title and body to create a comment"
        })
    }
    const comment = await addNewComment(userId, postId, title, body)
    res.status(201).send(comment)
})

route.delete("/comment/:id", async(req,res) => {
    await deleteAComment(req.params.id);
    res.status(204).send("deleted successfully");
})

module.exports = {
    commentsRoute: route
}