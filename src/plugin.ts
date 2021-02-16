import express from "express";
import path from "path";
export interface VCSOptions {
    paramName:string;
    default:string;
    root:string;
}
const getVersion = (req:express.Request,paramName:string) : string | null => {
    const query = req.query[paramName];
    if(typeof query === "string"){
        return query;
    } 
    if(req.headers["sec-fetch-dest"] === "document"){
        return null;
    }
    const referer = req.headers.referer;
    if(referer){
        const url = new URL(referer);
        return url.searchParams.get(paramName) || null;
    }
    return null;
}
const defaultOptions : VCSOptions = {
    paramName: "version",
    root: "public",
    default: "main"
}
export const versionStatic = (options:Partial<VCSOptions> = defaultOptions):express.RequestHandler => {
    const PARAM_NAME = options.paramName || defaultOptions.paramName;
    const ROOT = options.root || defaultOptions.root;
    const DEFAULT = options.default || defaultOptions.default;
    return (req,res,next) => {
        const ref = getVersion(req,PARAM_NAME) || DEFAULT;
        const dir = path.resolve(ROOT,ref)
        express.static(dir)(req,res,next)
    }
}