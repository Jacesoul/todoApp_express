import { Request, Response } from "express";
import { Todo } from "../entity/Todo";
import { Tag } from "../entity/Tag";
import {getRepository} from 'typeorm';

const bodyParser = require('body-parser')
const express = require('express')
const router = express.Router()

router.use(express.json())
router.use(bodyParser.json()); 
router.use(bodyParser.urlencoded({ extended: true })); 

router.post('', async(req:Request, res:Response)=>{
    try {
        const {content, tagname} = req.body
        const tag:any = await Tag.findOne({where: {name :req.body['tagname']}})
        console.log(tag)

        const todo = await Todo.create({
            content: req.body['content'],
            tag: tag
        }).save()
        return res.status(201).json({message: 'create successfully '})
    }catch(err){
        console.log(err)
        return res.status(500).json(err)
    }
})

router.get('', async(req:Request, res:Response)=>{
    try {
        const where = Object.keys(req.query).reduce((acc,curVal,idx)=>{
            if (req.query[curVal]){
                acc[curVal] = req.query[curVal]
            }
            return acc
        }, {})
        
        let results
        if (where['tagname'] && where['isCompleted']){
            const sortedTodos = await getRepository(Tag)
            .createQueryBuilder("tag")
            .leftJoinAndSelect("tag.todos", "todo")
            .where("tag.name = :name", { name: where['tagname'] })
            .andWhere("todo.isCompleted = :isCompleted", { isCompleted: where['isCompleted'] })
            .getMany();
            results = sortedTodos[0].todos 
        } else if (where['tagname']){
            const sortedTodos = await Tag.findOne({ name: where['tagname'] },{ relations: ["todos"] })
            results = sortedTodos.todos 
        } else if (where['isCompleted']){
            results= await Todo.find(where)
        } else{
            results = await Todo.find({})
        }
        
        return res.status(200).json(results)
    }catch(err){
        console.log(err)
        return res.status(500).json({error : 'Something went wrong!'})
    }
})

router.put('/:uuid', async(req:Request, res:Response)=>{
    const uuid = req.params.uuid
    const {content} = req.body

    try { 
        const todo = await Todo.findOneOrFail({uuid})

        todo.content = content || todo.content

        await todo.save()

        return res.json(todo)
    }catch (err){
        console.log(err)
        return res.status(500).json({error : 'Something went wrong!'})
    }
})

router.patch('/:uuid', async(req:Request, res:Response)=>{
    const uuid = req.params.uuid
    const {isCompleted} = req.body

    try { 
        const todo = await Todo.findOneOrFail({uuid})

        todo.isCompleted = isCompleted || todo.isCompleted

        await todo.save()

        return res.json(todo)
    }catch (err){
        console.log(err)
        return res.status(500).json({error : 'Something went wrong!'})
    }
})

router.delete('/:uuid', async(req:Request, res:Response)=>{
    const uuid = req.params.uuid  

    try { 
        
        const todo = await Todo.findOneOrFail({uuid})
        await todo.softRemove()
        
        return res.status(204).json({message: 'Todo deleted successfully '})
    }catch (err){
        console.log(err)
        return res.status(500).json({error : 'Something went wrong!'})
    }
})

router.delete('', async(req:Request, res:Response)=>{
    try { 
        const todos = await Todo.find()
        todos.forEach(todo => {
            todo.softRemove()
        })
        return res.status(204).json({message: 'Todo deleted successfully '})
    }catch (err){
        console.log(err)
        return res.status(500).json({error : 'Something went wrong!'})
    }
})


module.exports = router