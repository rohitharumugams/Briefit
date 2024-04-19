import express from "express";
import bodyParser from "body-parser";
import {dirname} from "path"
import {fileURLToPath} from "url"
import { GoogleGenerativeAI } from "@google/generative-ai";
import PromptSync from "prompt-sync";
const app = express();
const dir_name = dirname(fileURLToPath(import.meta.url));
app.use(bodyParser.urlencoded({ extended: true }))
const port = 3000;


let API_KEY = 'AIzaSyAne7NOuhWwtiifqBnYmwMMtgK6BrU-Hbo'
const genAI = new GoogleGenerativeAI(API_KEY);

app.get("/",(req,res)=>{
    res.render(dir_name+"/index.ejs",{output:""})
});
  
app.post("/check",async(req,res)=>{
    const model = await genAI.getGenerativeModel({ model: "gemini-pro"});

    let problem = req.body["prompt"];
    console.log();
    let str = `Explain ${problem} like you would to a child`
  
    const promptText = str
  
    const result = await model.generateContent(promptText);
    const response = result.response;
    const text = response.text();
    res.render(dir_name+"/index.ejs",{output:text})
})
app.listen(port,()=>{
    console.log(`Server running on port ${port}`)
})