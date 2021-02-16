import express from "express";
import {versionStatic} from "./plugin"

const app = express();
app.get("*",versionStatic({
    default:"master"
}));

app.listen(3000, function(){
    console.log("Node.js is listening to PORT:" + 3000);
});