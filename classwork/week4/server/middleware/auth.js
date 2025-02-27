const auth = (req, res, next) => {
    if (req.query.username === "Andy") {
        next();
    } else {
        res.send("ACCESS NOT ALLOWED")
        res.redirect("http://localhost:8000/")
        res.json({message:"You are not the right user,"})
    }
    
};
 
module.exports = {auth}