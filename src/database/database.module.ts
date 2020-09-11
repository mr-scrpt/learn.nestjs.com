import { Module, DynamicModule } from '@nestjs/common';
import { createConnection, ConnectionOptions } from 'typeorm';

@Module({})
export class DataBaseModule {
  static register(options: ConnectionOptions): DynamicModule {
    return {
      module: DatabaseModule,
      providers: [
        {
          provide: 'CONNECTION',
          useValue: createConnection(options),
        },
      ],
    };
  }
}
export class DatabaseModule {}
