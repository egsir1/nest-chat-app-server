// import { Module } from '@nestjs/common';
// import { InjectConnection, MongooseModule } from '@nestjs/mongoose';
// import { Connection } from 'mongoose';

// @Module({
//   imports: [
//     MongooseModule.forRootAsync({
//       useFactory: () => ({
//         uri:
//           process.env.NODE_ENV === 'production'
//             ? process.env.MONGO_PROD
//             : process.env.MONGODB_URI,
//       }),
//     }),
//   ],
//   exports: [MongooseModule],
// })
// export class DatabaseModule {
//   constructor(@InjectConnection() private readonly connection: Connection) {
//     if (connection.readyState === 1) {
//       console.log(
//         `MongoDB is connected into ${process.env.NODE_ENV === 'production' ? 'production' : 'development'} db`,
//       );
//     } else {
//       console.log('DB is not connected!');
//     }
//   }
// }

import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ModelDefinition, MongooseModule } from '@nestjs/mongoose';
import { DbMigrationService } from './db-migration.service';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        uri: configService.get('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [DbMigrationService],
})
export class DatabaseModule {
  static forFeature(models: ModelDefinition[]) {
    return MongooseModule.forFeature(models);
  }
}
