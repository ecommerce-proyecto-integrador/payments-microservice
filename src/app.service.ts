import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices'

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import * as Transbank from 'transbank-sdk';
import { JwtService } from '@nestjs/jwt';
import { Pay } from './dtos/entity/pay.dtos';
import axios from 'axios';


@Injectable()
export class AppService {
  constructor(@Inject('PAY_SERVICE') private client: ClientProxy,
  @InjectRepository(Pay) private readonly payRepository: Repository<Pay>,private readonly jwtService: JwtService, ){}

  async payCreated(orden_compra:string,session_id:number,monto:number,url_retorno:string,correo: string): Promise<string> {
    try {
      const apiKeyId = '597055555532';
      const apiKeySecret = '579B532A7440BB0C9079DED94D31EA1615BACEB56610332264630D42D0A36B1C';
      const requestBody = {
        buy_order: orden_compra,
        session_id: session_id,
        amount: monto,
        return_url: url_retorno,
      };
      console.log(requestBody)
      const transbankTokenResponse = await axios.post(
        'https://webpay3gint.transbank.cl/rswebpaytransaction/api/webpay/v1.2/transactions',
        requestBody,
        {
          headers: {
            'Tbk-Api-Key-Id': apiKeyId,
            'Tbk-Api-Key-Secret': apiKeySecret,
            'Content-Type': 'application/json',
          },
        }
      );
      console.log(correo)
      const transbankToken = transbankTokenResponse.data.token;
      const transbankUrl = `https://webpay3gint.transbank.cl/webpayserver/initTransaction?token=${transbankToken}`;

      const pay = new Pay();
      pay.orden_compra = orden_compra;
      pay.session_id = session_id.toString();
      pay.monto = monto;
      pay.url_retorno = url_retorno;
      pay.correo = correo;

      await this.payRepository.save(pay);
      console.log(pay)

      
      return transbankTokenResponse.data.url + '?token_ws=' + transbankTokenResponse.data.token
      
    } catch (error) {
      console.error('Error al generar el link de pago:', error.message);
      throw error;
    }
  }

  async commitPay(token:string): Promise<string> {
    try {
      const apiKeyId = '597055555532';
      const apiKeySecret = '579B532A7440BB0C9079DED94D31EA1615BACEB56610332264630D42D0A36B1C';
      const requestBody = {
      };
      console.log(requestBody)
      const transbankTokenResponse = await axios.put(
        'https://webpay3gint.transbank.cl/rswebpaytransaction/api/webpay/v1.2/transactions'+'/'+token,
        requestBody,
        {
          headers: {
            'Tbk-Api-Key-Id': apiKeyId,
            'Tbk-Api-Key-Secret': apiKeySecret,
            'Content-Type': 'application/json',
          },
        }
      );
      const transbankMessage = transbankTokenResponse.data;
      console.log(transbankMessage)

      return JSON.stringify(transbankMessage);
      
    } catch (error) {
      console.error('Error commit:', error.message);
      throw error;
      
    }
  }
  
 
}
