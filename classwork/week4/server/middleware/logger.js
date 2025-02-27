const logger = (req, res, next) => {
    console.log(Date());
    console.log(req.url);
    console.log(req.method);
    console.log(req.headers);
    next();
}
 
module.exports = {logger}