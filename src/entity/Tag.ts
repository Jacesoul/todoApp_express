import {Entity, Column, OneToMany} from "typeorm";
import Model from './Model'
import {TodoToTag} from "./todototag";
import {Length} from "class-validator";

@Entity('tags')
export class Tag extends Model {

    @Column()
    @Length(1,50)
    name: string;

    @OneToMany(() => TodoToTag, todotoTags => todotoTags.tag)
    todotoTags: TodoToTag[];

    static findByName(name: string) {
        return this.createQueryBuilder("tag")
            .where("tag.name = :name", { name })
            .getMany();
    }
}
