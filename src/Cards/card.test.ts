import { Test, TestingModule } from '@nestjs/testing';
import { CardController } from './card.controller';
import { CardService } from './card.service';

describe('CardController', () => {
  let boardController: CardController;

  beforeEach(async () => {
    const board: TestingModule = await Test.createTestingModule({
      controllers: [CardController],
      providers: [CardService],
    }).compile();

    boardController = board.get<CardController>(CardController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(boardController.getAllCard()).toBe('Hello World!');
    });
  });
});
