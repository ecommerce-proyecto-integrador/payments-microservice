import { Column, Entity, ManyToOne, JoinColumn} from "typeorm"
import { Pay } from "./pay.dtos"

@Entity()
export class History{
    @Column({ primary: true, generated: true })
    idHistory: number;
    @Column()
    orden_compra: string;
    @Column()
    product_id: string;

    @ManyToOne(() => Pay, pay => pay.history)
    @JoinColumn()
    pay?: Pay;
}