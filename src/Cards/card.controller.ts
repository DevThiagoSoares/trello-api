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

  @Post('list/')
  createCard(@Body() data: Payload) {
    return this.cardService.createCard(data);
  }

  @Put(':cardId')
  updateCard(@Param('cardId') cardId: string, @Body() data: UpdateCardDTO) {
    return this.cardService.updateCard(cardId, data);
  }
}
