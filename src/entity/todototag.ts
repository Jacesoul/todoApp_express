import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Model from './Model'
import { Tag } from "./tag";
import { Todo } from "./todo";

@Entity('todototags')
export class TodoToTag extends Model {
    @Column()
    public todoId!: number;

    @Column()
    public tagId!: number;

    @ManyToOne(() => Tag, tags => tags.todotoTags)
    public tag:Tag;

    @ManyToOne(() => Todo, todos => todos.todotoTags)
    public todo: Todo[];
}