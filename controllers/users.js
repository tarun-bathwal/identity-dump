const express = require('express');
const fs = require("fs");
const Mailgun = require('mailgun-js');
const os=require("os");

exports.adduser = function(req,res){
    const data = req.body;;
    var stream = fs.createWriteStream("users.txt",{flags:'a'});
    var newdata=JSON.stringify(data);
    var hostname=os.hostname();
    stream.write(newdata+'\r\n',()=>{
        var maildata ={
            from:'sender@gmail.com',
            to:'abc@gmail.com',
            subject:'hey',
            html:"Hi<br><br>Welcome to our network! Here’s your profile informations<br><br>Email: "+data.email+"<br>Date of Birth: "+data.birthday+"<br>Machine :"+hostname
        }
        var api_key = 'apikey_mailgun';
        var domain = 'domain_mailgun';
        var mailgun = new Mailgun({apiKey: api_key, domain: domain});
        mailgun.messages().send(maildata, function (err, body) {
            if (err) {
                res.json({
                    message:"could not send the mail to the id"
                });
            }
            else{
                res.json({
                    message:"successfully written to text file"
                });
            }
        });
        
        stream.close();
    });
}

exports.getuser = (req,res)=>{
    var stream=fs.createReadStream("users.txt");
    var requiredData='';
    stream.on("data",(chunk)=>{
        requiredData+=chunk;
    });
    stream.on("end",()=>{
        res.send(requiredData);
    });
    
}

exports.getone = (req,res)=>{
    var id=req.params.id;
    var stream=fs.createReadStream("users.txt");
    var requiredData='';
    stream.on("data",(chunk)=>{
        requiredData+=chunk;
    });
    stream.on("end",()=>{
        var datas = requiredData.split("\r\n");
        datas.pop();
        if(id<=datas.length && id>=1){
            res.send(datas[id-1]);
        }
        else{
            res.json({
                message : "there doesn't exist a user corresponding to "+id
            });
        }
    });
}

exports.getlatest = (req,res)=>{
    var stream=fs.createReadStream("users.txt");
    var requiredData='';
    stream.on("data",(chunk)=>{
        requiredData+=chunk;
    });
    stream.on("end",()=>{
        var datas = requiredData.split("\r\n");
        datas.pop();
        if(datas.length>0){
            res.send(datas[datas.length-1]);
        }
        else{
            res.json({
                message : "there doesn't exist a user yet"
            });
        }
    });   
}