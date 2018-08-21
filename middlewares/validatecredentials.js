const express = require('express');
const Joi = require('joi');
const Extension = require('joi-date-extensions');
const joi = Joi.extend(Extension);
let {AgeFromDateString, AgeFromDate} = require('age-calculator');
module.exports = ( req,res,next) => {
        const now = Date.now();
        const schema = joi.object().keys({
            name : joi.string().alphanum().max(50).min(2).required(),
            email : joi.string().email({minDomainAtoms:2}).trim().required(),
            birthday : joi.date().allow('').format('YYYY-MM-DD').optional()
        });
        const data=req.body;
        let age= new AgeFromDateString(data.birthday).age;
        joi.validate(data,schema,{abortEarly:false},(err,value)=>{
            if(err)
            {
                res.json({
                    message : err
                });
            }
            else if ( data.birthday!=='' && age<16 ){
                res.stauts(200).json({
                    message : "under age",
                    data : data
                });
            }
            else if (data.birthday!=='' &&  age > 120 ){
                res.stauts(200).json({
                    message : "over age",
                    data : data
                });
            }
            else{
                next();
            }
        });
    
}