import { Module } from '@nestjs/common';
import { BoardModule } from './Boards/board.module';
import { ListModule } from './Lists/list.module';

@Module({
  imports: [BoardModule, ListModule],
})
export class AppModule {}
