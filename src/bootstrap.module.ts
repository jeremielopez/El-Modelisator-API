import { Module }        from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import environment       from './environment';
import { UserModule }    from './user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(environment.typeorm),
    UserModule
  ],
  controllers: [],
  providers: []
})
export class BootstrapModule {
}
