const { Router } = require("express");
const {createNewUser,checkIfUserExists} = require("../../controllers/users");
const route = Router();

route.post("/register", async (req,res) => {
    const username = req.body.username;
    const password = req.body.password; 
    await createNewUser(username,password).then(() => {
          console.log("user added");
          res.send("user added");
    }).catch((e) => {
        console.log(e);
        res.send(e);
    })
})

route.post("/login", async (req,res) => {
    const username = req.body.username;
    const password = req.body.password;
    console.log(username);
    console.log(password);
    await checkIfUserExists(username,password).then((result) => {
         console.log(result);
        //  if(result > 0){
        //     res.send(result);
        // }
        // else{
        //     res.send({message: "Wrong username/password combination used"})
        // }
        if(result == -1){
            res.send({message: "Wrong username/password combination used"})
        }
        else{
             res.send(result);
        }
    }).catch((e) => {   
        res.send({e : e});
    })
})


module.exports = {
    usersRoute: route 
}