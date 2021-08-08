import { Request, Response } from "express";
import { Tag } from "../entity/tag";

const bodyParser = require('body-parser')
const express    = require('express')
const router     = express.Router()

router.use(express.json())
router.use(bodyParser.json()); 
router.use(bodyParser.urlencoded({ extended: true })); 

router.post('', async(req:Request, res: Response)=>{
    const {name}=req.body
    try{
        const tag = new Tag({name})
        await tag.save()
        return res.json(tag)
    }catch(err){
        console.log(err)
        return res.status(500).json({error : 'Something went wrong!'})
    }
})

module.exports = router