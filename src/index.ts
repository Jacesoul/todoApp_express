import "reflect-metadata";
import {createConnection, UsingJoinTableIsNotAllowedError} from "typeorm";
import express, {Request, Response} from 'express'
import {validate} from 'class-validator'
import {getConnection} from "typeorm";
import {getRepository} from 'typeorm';



import {Todo} from "./entity/Todo";
import {Tag} from "./entity/Tag";
import { connected } from "process";

const app = express()
app.use(express.json())

//CREATE
app.post('/todos', async(req:Request, res:Response)=>{
    const {content} = req.body
    try {
        const todo = Todo.create({content})

        await todo.save()

        return res.status(201).json(todo)
    }catch(err){
        console.log(err)
        return res.status(500).json(err)
    }
})

//READ
app.get('/todos', async(_:Request, res:Response)=>{
    try {
        const todos = await Todo.find()
        return res.status(200).json(todos)
    }catch(err){
        console.log(err)
        return res.status(500).json({error : 'Something went wrong!'})
    }
})

//PUT CONTENT
app.put('/todos/:uuid', async(req:Request, res:Response)=>{
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

//PATCH isCompleted
app.patch('/todos/:uuid', async(req:Request, res:Response)=>{
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

//DELETE
app.delete('/todos/:uuid', async(req:Request, res:Response)=>{
    const uuid = req.params.uuid  

    try { 
        const todo = await Todo.findOneOrFail({uuid})

        await todo.remove()

        return res.status(204).json({message: 'Todo deleted successfully '})
    }catch (err){
        console.log(err)
        return res.status(500).json({error : 'Something went wrong!'})
    }
})

// Create a Tag 
app.post('/tags', async(req:Request, res: Response)=>{
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

// Filter 
// findIncomplete() : Promise<Todo[]> {
//     const todoRepository = getRepository(Todo);
//     return getRepository().createQueryBuilder('todo')
//     .where('todo."isComplete" = :value', { value: false })
//     .getMany();
// }

// const todo = await getRepository(Todo)
// 	.createQueryBuilder("todo")
// 	.where("todo.uuid = :uuid", {id : 1}
//     .getOne();



createConnection().then(async connection => {
    app.listen(5000,()=> console.log('Server up at http://localhost:5000'))
    const todo = new Todo()
    
}).catch(error => console.log(error))