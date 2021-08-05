import { Request, Response } from "express";
import {getRepository} from 'typeorm';
import {getConnection} from 'typeorm';
import { Todo } from "../entity/Todo";
import { Tag } from "../entity/Tag";

const bodyParser = require('body-parser')
const express    = require('express')
const router     = express.Router()

router.use(express.json())
router.use(bodyParser.json()); 
router.use(bodyParser.urlencoded({ extended: true })); 

router.post('', async(req:Request, res:Response)=>{
    const queryRunner = getConnection().createQueryRunner();
    try {
        const {content, tagname} = req.body
        const tag:any = await Tag.findOne({where: {name :req.body['tagname']}})
        queryRunner.startTransaction();
        const todo = await Todo.create({
            content: req.body['content'],
            tag: tag
        }).save()
        queryRunner.commitTransaction();
        return res.status(201).json({message: 'create successfully '})
    }catch(err){
        queryRunner.rollbackTransaction();
        console.log(err)
        return res.status(500).json(err)
    }finally{
        queryRunner.release();
    }
})

router.get('', async(req:Request, res:Response)=>{
    try {
        const where = Object.keys(req.query).reduce((acc,curVal,idx)=>{
            if (req.query[curVal]){acc[curVal] = req.query[curVal]}
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
    const queryRunner = getConnection().createQueryRunner();
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
    const queryRunner = getConnection().createQueryRunner();
    try { 
        const todo = await Todo.findOneOrFail({uuid})
        todo.isCompleted = isCompleted || todo.isCompleted
        queryRunner.startTransaction();
        await todo.save()
        queryRunner.commitTransaction();
        return res.json(todo)
    }catch (err){
        queryRunner.rollbackTransaction();
        console.log(err)
        return res.status(500).json({error : 'Something went wrong!'})
    }finally{
        queryRunner.release();
    }
})

router.delete('/:uuid', async(req:Request, res:Response)=>{
    const uuid = req.params.uuid  
    const queryRunner = getConnection().createQueryRunner();
    try { 
        const todo = await Todo.findOneOrFail({uuid})
        queryRunner.startTransaction();
        await todo.softRemove()
        queryRunner.commitTransaction();
        return res.status(204).json({message: 'Todo deleted successfully '})
    }catch (err){
        queryRunner.rollbackTransaction();
        console.log(err)
        return res.status(500).json({error : 'Something went wrong!'})
    }finally{
        queryRunner.release();
    }
})

router.delete('', async(req:Request, res:Response)=>{
    const queryRunner = getConnection().createQueryRunner();
    try { 
        const todos = await Todo.find()
        queryRunner.startTransaction();
        todos.forEach(todo => {
            todo.softRemove()
        })
        queryRunner.commitTransaction();
        return res.status(204).json({message: 'Todo deleted successfully '})
    }catch (err){
        queryRunner.rollbackTransaction();
        console.log(err)
        return res.status(500).json({error : 'Something went wrong!'})
    }finally{
        queryRunner.release();
    }
})

module.exports = router