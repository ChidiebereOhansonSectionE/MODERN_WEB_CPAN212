import express from "express";
import User from "../models/user.js";
import bcrypt from "bcryptjs";

const router = express.Router();

router.post("/register", (req, res)=>{
    //1 parse incoming information
    const {email, password} = req.body;

    //hash the information
    //run command: npm i bcryptjs
    bcrypt.hash(password, 10)
    .then((hashedPassword)=>{
        let newUser = new User({
            email,
            password: hashedPassword,
        });

        newUser.save()
        .then(()=>{
            res.json({message: "Account registered"})
        })
        .catch((err)=>{
            console.log(err);
            return res.json({message: "Email already in use"})
        })
    })
    .catch((err)=>{
        console.log(err);
        return res.json({message: "Could not complete transaction"})
    })
})

router.post("/login", (req, res)=>{
    const {email, password} = req.body;

    User.findOne({email: email}) //results: {} or {user_acc}
    .then((user_account)=>{
        if(!user_account){
            return res.json({message: "User account not found"})
        }
        // compare paswords
        bcrypt
        .compare(password, user_account.password)
        .then((isMatched)=>{
            if(!isMatched){
                return res.status(400).json({message: "Invalid password"});
            }
            return res.json({message: "Login successful"});
        }) // if it runs successfully ->T/F
        .catch((err)=>{
            console.log(err);
            return res.status(500).json({message: "couldnot complete request"})
        })
    })
    .catch((err)=>{
        console.log(err);
        return res.status(500).json({message: "could not complete request"})
    })
})



export default router;