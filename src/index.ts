import express from "express";
import path from "path";

const app = express();
const getRef = (req:express.Request) : string | null => {
    const PARAM_NAME = "version";
    const query = req.query[PARAM_NAME];
    if(typeof query === "string"){
        return query;
    } 
    if(req.headers["sec-fetch-dest"] === "document"){
        return null;
    }
    const referer = req.headers.referer; 
    if(referer){
        return new URL(referer).searchParams.get(PARAM_NAME) || null;
    }
    return null;
} 
app.get("*",(req,res,next) => {
    const ref = getRef(req) || "master";
    const dir = path.resolve("public",ref)
    express.static(dir)(req,res,next)
});

app.listen(3000, function(){
    console.log("Node.js is listening to PORT:" + 3000);
});