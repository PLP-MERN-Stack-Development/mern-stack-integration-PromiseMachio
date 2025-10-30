import ratelimit from "../connetion/upstash.js" 
const rateLimit = async(req, res, next) =>{
    try {
        const { success} = await ratelimit.limit("my-limit-key")
        if(!success) {return
            res.status(429).json({message:"Too many requests"});
        }
        next()
    } catch (error) {
       console.error("Error message occored:", error.message);
       next(error)
        
    }
}

export default rateLimit;