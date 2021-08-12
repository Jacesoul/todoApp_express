import { Request, Response } from "express";
import { getRepository, In } from "typeorm";
import { getConnection } from "typeorm";
import { Todo } from "../entity/todo";
import { TodoToTag } from "../entity/todototag";

const bodyParser = require("body-parser");
const express = require("express");
const router = express.Router();

router.use(express.json());
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.post("", async (req: Request, res: Response, next) => {
    const queryRunner = getConnection().createQueryRunner();
    try {
        console.log(req.body.tag);
        const { content, tag } = req.body;
        queryRunner.startTransaction();
        const todo = await Todo.create({
            content: content,
        }).save();
        const todototags = tag.forEach((tagId) => {
            TodoToTag.create({
                todoId: todo.id,
                tagId: tagId,
            }).save();
        });
        queryRunner.commitTransaction();
        return res.status(201).json({ message: "create successfully " });
    } catch (err) {
        queryRunner.rollbackTransaction();
        console.error(err);
        next(err);
    } finally {
        queryRunner.release();
    }
});

router.get("", async (req: Request, res: Response, next) => {
    try {
        const { isCompleted, tag } = req.query;
        console.log(isCompleted);
        console.log(tag);
        const where = Object.keys(req.query).reduce((acc, curVal) => {
            if (req.query[curVal]) {
                acc[curVal] = req.query[curVal];
            }
            console.log(acc);
            return acc;
        }, {});
        console.log(where);
        const results = await getRepository(TodoToTag).find({
            relations: ["todo"],
            where: {
                tagId: In([tag]),
                todo: {
                    isCompleted: In([isCompleted]),
                },
            },
        });
        return res.status(200).json(results);
    } catch (err) {
        console.error(err);
        next(err);
    }
});

router.put("/:id", async (req: Request, res: Response, next) => {
    const { content } = req.body;
    const queryRunner = getConnection().createQueryRunner();
    try {
        const todo = await Todo.findOne(req.params.id);
        todo.content = content;
        await todo.save();
        return res.json(todo);
    } catch (err) {
        queryRunner.rollbackTransaction();
        console.error(err);
        next(err);
    } finally {
        queryRunner.release();
    }
});

router.patch("/:id", async (req: Request, res: Response, next) => {
    const { isCompleted } = req.body;
    const queryRunner = getConnection().createQueryRunner();
    try {
        const todo = await Todo.findOne(req.params.id);
        todo.isCompleted = isCompleted;
        queryRunner.startTransaction();
        await todo.save();
        queryRunner.commitTransaction();
        return res.json(todo);
    } catch (err) {
        queryRunner.rollbackTransaction();
        console.log(err);
        next(err);
    } finally {
        queryRunner.release();
    }
});

router.delete("/:id", async (req: Request, res: Response, next) => {
    const queryRunner = getConnection().createQueryRunner();
    try {
        const todo = await Todo.findOne(req.params.id);
        queryRunner.startTransaction();
        await todo.softRemove();
        queryRunner.commitTransaction();
        return res.status(204).json({ message: "Todo deleted successfully " });
    } catch (err) {
        queryRunner.rollbackTransaction();
        console.log(err);
        next(err);
    } finally {
        queryRunner.release();
    }
});

router.delete("", async (req: Request, res: Response, next) => {
    const queryRunner = getConnection().createQueryRunner();
    try {
        const { isCompleted } = req.query;
        queryRunner.startTransaction();
        await getRepository(Todo)
            .createQueryBuilder()
            .softDelete()
            .from(Todo)
            .where("isCompleted IN (:...isCompleteds)", {
                isCompleteds: [isCompleted],
            })
            .execute();
        queryRunner.commitTransaction();
        return res.status(204).json({ message: "Todo deleted successfully " });
    } catch (err) {
        queryRunner.rollbackTransaction();
        console.log(err);
        next(err);
    } finally {
        queryRunner.release();
    }
});

module.exports = router;
