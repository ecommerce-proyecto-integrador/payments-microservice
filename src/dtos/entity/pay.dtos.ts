import { Column, Entity, OneToMany} from "typeorm"
import { History } from "./history.dtos"

@Entity()
export class Pay{
    @Column({ primary: true, generated: true })
    orden_compra: string;
    @Column()
    session_id: string;
    @Column()
    monto: number;
    @Column()
    url_retorno: string;
    @Column()
    correo: string;
    @OneToMany(() => History, history => history.pay)
    history?: History[]
}