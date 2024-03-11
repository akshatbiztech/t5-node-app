import express from "express";
import pkg from "body-parser";
import { getAllUsers, putRequest, postRequest, getUser } from "./mothods.js";
import { validateBody } from "./validateBody.js";
const { json, urlencoded } = pkg;
const PORT = 3000;

var app = express();

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});

app.use(json());
app.use(urlencoded({ extended: true }));

app.get("/users",(req,res)=>{
    res.send(getAllUsers()).status(200)
})

app.get("/user/:id",(req,res)=>{
    if(getUser(req.params.id)==404){
        const resposne = {
          message: "User id not found",
          success: false
        };
        res.status(404).send(resposne);
    }
    res.status(200).send({
        success : true,
        user : getUser(req.params.id)
    })
})

app.put("/update/:id",(req,res)=>{
    if(validateBody(req.body).error){
        const resposne = {
          message: "Invalid request body",
          success: "false",
        };
        res.status(400).send(resposne);
    }
    if(putRequest(req.params.id,req.body)==404){
        const resposne = {
            message: "User id not found",
            success: false
        }
        res.status(404).send(resposne);
    }
    if (putRequest(req.params.id, req.body) == 200) {
        const resposne = {
        message: "User updated",
        success: true
        };
        res.status(200).send(resposne);
    }
})

app.post("/add",(req,res)=>{
    if (validateBody(req.body).error) {
      const resposne = {
        message: "Invalid request body",
        success: false
      };
      res.status(400).send(resposne);
    }
    if (postRequest(req.body) == 200) {
      const resposne = {
        message: "User added",
        success: true
      };
      res.status(200).send(resposne);
    }
})

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});