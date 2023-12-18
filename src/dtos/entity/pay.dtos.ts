import { Column, Entity} from "typeorm"

@Entity()
export class Pay{
    @Column({ primary: true, generated: true })
    id: number;
    @Column()
    orden_compra: string;
    @Column()
    session_id: string;
    @Column()
    monto: number;
    @Column()
    url_retorno: string;
    
}