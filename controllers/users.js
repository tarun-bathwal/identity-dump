//const express = require('express');
const fs = require("fs");
const Mailgun = require('mailgun-js');
const os=require("os");
const environ=require('dotenv').config();
var filename;
if(process.env.NODE_ENV=='dev')
{
    
    filename="users.txt";
}
else{
    
    filename="testuser.txt";
}

exports.adduser = function(req,res){
    const data = req.body;
    var stream = fs.createWriteStream(filename,{flags:'a'});
    var newdata=JSON.stringify(data);
    var hostname=os.hostname();
    stream.write(newdata+'\r\n',()=>{
        var maildata ={
            from:'tarun.bathwal@gmail.com',
            to:data.email,
            subject:'hey',
            html:"Hi<br><br>Welcome to our network! Here’s your profile informations<br><br>Email: "+data.email+"<br>Date of Birth: "+data.birthday+"<br>Machine :"+hostname
        }
        var api_key = process.env.mailgunkey;
        var domain = process.env.mailgundomain;
        var mailgun = new Mailgun({apiKey: api_key, domain: domain});
        mailgun.messages().send(maildata, function (err, body) {
            if (err) {
                res.status(201).json({
                    message: "could not send mail but json written to text file"
                });
            }
            else{
                res.status(201).json({
                    message:"successfully written to text file"
                });
            }
        });
        stream.close();
    });
}

exports.getuser = (req,res)=>{
    var stream=fs.createReadStream(filename);
    var requiredData='';
    stream.on("data",(chunk)=>{
        requiredData+=chunk;
    });
    stream.on("error",()=>{
        res.status(404).json({
            message:"no user exists"
        });
    });
    stream.on("end",()=>{
        var datas = requiredData.split("\r\n");
        datas.pop();
        var finaldata=[];
        datas.forEach(element => {
            finaldata.push(JSON.parse(element));
        });
        res.status(200).send(finaldata);
    });
    
}

exports.getone = (req,res)=>{
    var id=req.params.id;
    var stream=fs.createReadStream(filename);
    var requiredData='';
    stream.on("data",(chunk)=>{
        requiredData+=chunk;
    });
    stream.on("error",()=>{
        res.status(404).json({
            message:"no user exists"
        });
    });
    stream.on("end",()=>{
        var datas = requiredData.split("\r\n");
        datas.pop();
        if(id<=datas.length && id>=1){
            var x=JSON.parse(datas[id-1]);
            res.status(200).json({data:x});
        }
        else{
            res.status(404).json({
                message : "there doesn't exist a user corresponding to "+id
            });
        }
    });
}

exports.getlatest = (req,res)=>{
    var stream=fs.createReadStream(filename);
    var requiredData='';
    stream.on("data",(chunk)=>{
        requiredData+=chunk;
    });
    stream.on("error",()=>{
        res.status(404).json({
            message:"no user exists"
        });
    });
    stream.on("end",()=>{
        var datas = requiredData.split("\r\n");
        datas.pop();
        if(datas.length>0){
            var x=JSON.parse(datas[datas.length-1]);
            res.status(200).send({data:x});
        }
        else{
            res.status(404).json({
                message : "there doesn't exist a user yet"
            });
        }
    });   
}
