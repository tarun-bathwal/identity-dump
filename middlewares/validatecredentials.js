const express = require('express');
const Joi = require('joi');
const Extension = require('joi-date-extensions');
const joi = Joi.extend(Extension);
let {AgeFromDateString, AgeFromDate} = require('age-calculator');
module.exports = ( req,res,next) => {

        const now = Date.now();
        //const maxdob = new Date(now - (1000 * 60 * 60 * 24 * 365 * 16));
        //const mindob = new Date(now - (1000 * 60 * 60 * 24 * 365 * 120));
        
        const schema = joi.object().keys({
            name : joi.string().alphanum().max(30).required(),
            email : joi.string().email({minDomainAtoms:2}).required(),
            birthday : joi.date().allow('').format('YYYY-MM-DD').optional()
        });
        const data=req.body;
        let age= new AgeFromDateString(data.birthday).age;
        joi.validate(data,schema,(err,value)=>{
            if(err)
            {
                res.json({
                    message : "invalid data",
                    data : data
                });
            }
            else if ( data.birthday!=='' && age<16 ){
                res.json({
                    message : "under age",
                    data : data
                });
            }
            else if (data.birthday!=='' &&  age > 120 ){
                res.json({
                    message : "over age",
                    data : data
                });
            }
            else{
                next();
            }
        });
    
}