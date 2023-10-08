import { Body, Controller, Get, Post } from '@nestjs/common';
import { CardService } from './card.service';
import { CreateCardDTO } from './dto/createCard.dto';

@Controller('api/card')
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @Get()
  getAllCard() {
    return this.cardService.getCard();
  }

  @Post()
  createCard(@Body() data: CreateCardDTO) {
    return this.cardService.createCard(data);
  }
}
