import {Entity, Column, OneToMany} from "typeorm";
import Model from './Model'
import {TodoToTag} from "./todototag";
import {Length} from "class-validator";


@Entity('todos')
export class Todo extends Model {

    @Column()
    @Length(1,1000)
    content: string;

    @Column({default: false})
    isCompleted : boolean;

    @OneToMany(() => TodoToTag, todotoTags => todotoTags.todo)
    todotoTags: TodoToTag[];
    

    static findByName(content: string) {
        return this.createQueryBuilder("todo")
            .where("todo.content = :content", { content })
            .getMany();
    }
}

