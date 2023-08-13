const express = require("express");
const app = express();
const models = require("./db/model");
const {usersRoute} = require("./routes/users/index");
const {postsRoute} = require("./routes/posts/index");
const {commentsRoute} = require("./routes/comments/index");
const db = models.db;
const cors = require("cors");
const PORT = process.env.PORT || 3001;


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/",usersRoute);
app.use("/",postsRoute);
app.use("/",commentsRoute);

db.sync()
.then(() => {
    app.listen(PORT, () => {
        console.log(`server started at http://localhost:${PORT}`)
      })      
})
.catch((e) => {
    console.log(e); 
})