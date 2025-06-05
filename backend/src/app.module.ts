import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { OffersModule } from './offers/offers.module';
import { UsersModule } from './users/users.module';
import { WishesModule } from './wishes/wishes.module';
import { WishlistsModule } from './wishlists/wishlists.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432', 10),
      username: process.env.DB_USERNAME || 'student',
      password: process.env.DB_PASSWORD || 'student',
      database: process.env.DB_DATABASE || 'kupipodariday',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),

    AuthModule,
    UsersModule,
    WishesModule,
    OffersModule,
    WishlistsModule,
  ],
})
export class AppModule {}
