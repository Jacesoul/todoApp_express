import { BaseEntity, PrimaryGeneratedColumn, DeleteDateColumn, CreateDateColumn, UpdateDateColumn} from "typeorm";

export default abstract class Model extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn({type: 'timestamp'})
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt?: Date;

    constructor(model?: Partial<any>){
        super()
        Object.assign(this, model)
    }

    toJSON(){
        return {...this,id: undefined}
    }
}