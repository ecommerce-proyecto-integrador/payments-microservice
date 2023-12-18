import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Transport, ClientsModule } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt'; // Asegúrate de importar JwtModule
import { Pay } from './dtos/entity/pay.dtos';


@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'PAY_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://rabbitmq:5672'], // sin docker es localhost
          queue: 'pay_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'silly.db.elephantsql.com',
      port: 5432,
      username: 'hfvhrvhi',
      password: 'gBMqnB78cnZBl_UXUKj4IhjvW1PA2DY7',
      database: 'hfvhrvhi',
      autoLoadEntities: true,
      synchronize: true,
    }),
      /*
    TypeOrmModule.forRoot({
      type: 'mysql', //mysql
      host: 'mysql', // mysql
      port: 3306, // sin docker es 3308 // docker 3306
      username: 'user_crud', // user_crud
      password: 'root', // root
      database: 'db_crud', // db_crud
      autoLoadEntities: true,
      synchronize: true,
    }),*/
    TypeOrmModule.forFeature([Pay]),
    JwtModule.register({
      secret: 'tu_clave_secreta', // Reemplaza con tu clave secreta real
      signOptions: { expiresIn: '1h' }, // Opciones de firma del token
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}