import {Entity, Column} from "typeorm";
import Model from './Model'
import {Length} from "class-validator";

@Entity('tags')
export class Tag extends Model {

    @Column()
    @Length(1,50)
    name: string;

    static findByName(name: string) {
        return this.createQueryBuilder("tag")
            .where("tag.name = :name", { name })
            .getMany();
    }
}
