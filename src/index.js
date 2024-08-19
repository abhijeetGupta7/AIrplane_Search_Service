const express=require("express");
const { PORT } = require("./config/server-config");
const apiRouter = require("./routes");

const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.text());

app.use("/api",apiRouter);   // here /api has a meaning, generally this prefix is used when the routes here are actually apis that are made to be used exposed api, if these were routes for serving static files like html pages or someting /home for home page, then in that case /api prefix was not used

app.listen(PORT, ()=>{
    console.log(`Server is listening at ${PORT}`);    
})