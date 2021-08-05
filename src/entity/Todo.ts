import {Entity, Column, ManyToOne, JoinTable} from "typeorm";
import Model from './Model'
import {Tag} from "./Tag";
import {Length} from "class-validator";


@Entity('todos')
export class Todo extends Model {

    @Column()
    @Length(1,1000)
    content: string;

    @Column({default: false})
    isCompleted : boolean;

    @ManyToOne(() => Tag, tags => tags.todos)
    tag:Tag;
    

    static findByName(content: string) {
        return this.createQueryBuilder("todo")
            .where("todo.content = :content", { content })
            .getMany();
    }
}

