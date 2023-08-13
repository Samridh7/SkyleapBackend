const { Router } = require("express");
const {showAllPosts, createNewPost, showParticularPost, deleteAParticularPost} = require("../../controllers/posts");
const {showAllComments} = require("../../controllers/comments")

const route = Router();

route.get("/", async (req,res) => {
    const posts = await showAllPosts(req.query);
    res.status(200).send(posts);
})

route.post("/", async (req,res) => {
    const {userId, title, body} = req.body

    if((!userId) || (!title) || (!body)){
        return res.status(400).send({
            error: "Need userId, title or body to create a post"
        })
    }
    const post = await createNewPost(userId, title, body)
    res.status(201).send(post)
})

route.get("/:id", async(req,res) => {
    const post = await showParticularPost(req.params.id);
    const comments = await showAllComments(req.params.id);
    res.status(200).send({post,comments});
})

route.delete("/:id", async(req,res) => {
    await deleteAParticularPost(req.params.id);
    res.status(204).send("deleted successfully");
})

module.exports = {
    postsRoute: route
}