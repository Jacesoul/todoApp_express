import {Entity, Column, ManyToMany, JoinTable} from "typeorm";
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

    @ManyToMany((type) => Tag, tags => tags.id,{
        cascade : true
    })
    @JoinTable({
        name : "todotags",
        joinColumns:[{name: "todo_id"}],   
        inverseJoinColumns:[{name: "tag_id"}]
    })
    tags: Tag[];

    static findByName(content: string) {
        return this.createQueryBuilder("todo")
            .where("todo.content = :content", { content })
            .getMany();
    }
}

