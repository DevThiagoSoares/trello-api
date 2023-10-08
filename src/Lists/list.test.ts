import { Test, TestingModule } from '@nestjs/testing';
import { ListController } from './list.controller';
import { ListService } from './list.service';

describe('ListController', () => {
  let boardController: ListController;

  beforeEach(async () => {
    const board: TestingModule = await Test.createTestingModule({
      controllers: [ListController],
      providers: [ListService],
    }).compile();

    boardController = board.get<ListController>(ListController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(boardController.getAllList()).toBe('Hello World!');
    });
  });
});
