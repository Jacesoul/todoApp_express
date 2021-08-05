import { BaseEntity, PrimaryGeneratedColumn, DeleteDateColumn, CreateDateColumn, UpdateDateColumn, BeforeInsert, Column} from "typeorm";
import{v4 as uuid} from 'uuid'

export default abstract class Model extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type:'uuid'})
    uuid: string

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

    @BeforeInsert()
        createUuid() {
            this.uuid = uuid()
    }

    toJSON(){
        return {...this,id: undefined}
    }
}