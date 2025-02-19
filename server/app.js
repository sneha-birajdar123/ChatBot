import express from "express"
import path from "path"
import  { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = 5000;

app.use(express.static(path.join(__dirname, "build")))


app.get("/",(req,res)=>{
    try {
        res.status(200).json({message:"Hello Ismail!"})
    } catch (error) {
        res.status(500).json({message:error})
    }
})

app.get("/*", (req,res) =>{
    res.sendFile(path.join(__dirname, "build", "index.html"))
})

app.listen(PORT,()=>{
    console.log(`the server is running ${PORT}`);
})