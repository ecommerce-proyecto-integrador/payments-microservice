import { Controller,Logger  } from '@nestjs/common';
import { AppService } from './app.service';

import { EventPattern } from '@nestjs/microservices';



@Controller()
export class AppController {
  private readonly logger = new Logger(AppController.name);
  constructor(private readonly appService: AppService) {}

  
  @EventPattern('new_pay_created')
    async handleUpdatePassUser(data: { orden_compra:string,session_id:number,monto: number,url_retorno:string,  correo: string }) {
      const { orden_compra,session_id,monto,url_retorno, correo } = data;
      
      if (monto  && correo) {
        const resp = await this.appService.payCreated(data.orden_compra,data.session_id,data.monto,data.url_retorno,data.correo)
        return resp;
      } else {
        console.error('Falta INFO.');
      }
    }

  @EventPattern('commit_pay')
    async handleCommitPay(data: { token:string }) {
      const { token } = data;
      
      if (token) {
        const resp = await this.appService.commitPay(data.token)
        return resp;
      } else {
        console.error('Falta INFO.');
      }
    }
  
}
