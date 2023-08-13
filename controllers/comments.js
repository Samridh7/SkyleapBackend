const { Posts, Users, Comments } = require("../db/model");

async function addNewComment(userId,postId,title,body){
    const comment = await Comments.create({
        userId,
        postId,
        title,
        body
    })
    return comment
}

async function showAllComments(postId) {
    const comments = await Comments.findAll({
        include : [ Users, Posts ],
        where : {
            postId: postId
        }
    })
    return comments;
}

async function deleteAComment(id){
    await Comments.destroy({
        where: {
            id: id
        },
        force: true
    })
}

module.exports = {
    addNewComment,
    showAllComments,
    deleteAComment
}
