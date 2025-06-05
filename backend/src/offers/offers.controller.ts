import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateOfferDto } from './dto/create-offer.dto';
import { OffersService } from './offers.service';

@Controller('offers')
export class OffersController {
  constructor(private readonly offersService: OffersService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Request() req, @Body() createOfferDto: CreateOfferDto) {
    return this.offersService.create(req.user.id, createOfferDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.offersService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.offersService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('wish/:wishId')
  findOffersByWishId(@Param('wishId') wishId: string) {
    return this.offersService.findOffersByWishId(+wishId);
  }
}
