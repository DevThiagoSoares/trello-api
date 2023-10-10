import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CardService } from './card.service';
import { Payload, UpdateCardDTO } from './dto/createCard.dto';

@Controller('api/card')
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @Get()
  getAllCard() {
    return this.cardService.getCard();
  }

  @Post('list/:idList')
  createCard(@Param('idList') idList: string, @Body() data: Payload) {
    return this.cardService.createCard(idList, data);
  }

  @Put(':cardId')
  updateCard(@Param('cardId') cardId: string, @Body() data: UpdateCardDTO) {
    return this.cardService.updateCard(cardId, data);
  }
}
