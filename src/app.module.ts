import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

const isEnabled = (value?: string) => value === '1' || value === 'true';

@Module({
  imports: [
    AuthModule,
    UserModule,
    PostModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => {
        const database = process.env.DB_DATABASE || process.env.DB_NAME;
        const synchronize =
          isEnabled(process.env.DB_SYNCHRONIZE) ||
          isEnabled(process.env.DB_SYNCRONIZE);
        const autoLoadEntities = isEnabled(process.env.DB_AUTO_LOAD_ENTITIES);

        if (process.env.DB_TYPE === 'better-sqlite3') {
          return {
            type: 'better-sqlite3',
            database: database || './db.sqlite',
            synchronize,
            autoLoadEntities,
            // entities: [User, Post],
          };
        }

        return {
          type: 'postgres',
          host: process.env.DB_HOST,
          port: parseInt(process.env.DB_PORT || '5432', 10),
          username: process.env.DB_USERNAME,
          password: process.env.DB_PASSWORD,
          database,
          synchronize,
          autoLoadEntities,
        };
      },
    }),
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
