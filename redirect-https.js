export default function redirectToHTTPS(req, res, next){
    if(!req.secure){
        return res.redirect('https://' + req.headers.host + req.originalUrl)
    }
    next()
}