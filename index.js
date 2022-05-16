const express = require("express")
const app = express();
const ejs = require("ejs")
const bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({extended:true}))
let allItems = [];
app.set("view engine", "ejs")
app.get("/", (req,res)=>{
    res.render("index", {allItems})
})
app.post("/additem",(req,res)=>{
    allItems.push(req.body);
    res.redirect("/")
})
app.post("/delete",(req,res)=>{
    let myIndex = req.body.itemIndex
    let remainderItem = allItems.filter((all, index)=>(
        index!=myIndex
    ))
    allItems = remainderItem
    res.redirect("/")
})
app.post("/edit",(req,res)=>{
    let myIndex = parseInt(req.body.itemIndex);
    let currentItem = allItems[myIndex];
    res.render("edit", {currentItem, myIndex})
})
app.post("/editItem",(req,res)=>{
    console.log(req.body.myIndex);
    let myIndex = parseInt(req.body.myIndex);
    let itemName = req.body.Name
    console.log(itemName, typeof(myIndex));
    allItems[myIndex].Name = itemName
    res.redirect("/") 
})

app.listen(5000, () => {
    console.log(`My app is listen on port 5000`);
})