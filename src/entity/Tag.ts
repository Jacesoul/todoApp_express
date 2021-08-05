import {Entity, Column, OneToMany} from "typeorm";
import Model from './Model'
import {Todo} from "./Todo";
import {Length} from "class-validator";

@Entity('tags')
export class Tag extends Model {

    @Column()
    @Length(1,50)
    name: string;

    @OneToMany(() => Todo, todo => todo.tag)
    todos: Todo[];

    static findByName(name: string) {
        return this.createQueryBuilder("tag")
            .where("tag.name = :name", { name })
            .getMany();
    }
}
