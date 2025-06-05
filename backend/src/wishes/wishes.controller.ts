import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
import { WishesService } from './wishes.service';

@Controller('wishes')
export class WishesController {
  constructor(private readonly wishesService: WishesService) {}

  @Get('last')
  findLast() {
    return this.wishesService.findLast();
  }

  @Get('top')
  findPopular() {
    return this.wishesService.findPopular();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.wishesService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id/full')
  findOneWithOffers(@Param('id') id: string) {
    return this.wishesService.findOneWithOffers(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('owner/:id')
  findUserWishes(@Param('id') id: string) {
    return this.wishesService.findUserWishes(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('username/:username')
  findWishesByUsername(@Param('username') username: string) {
    return this.wishesService.findWishesByUsername(username);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  findCurrentUserWishes(@Request() req) {
    return this.wishesService.findUserWishes(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Request() req, @Body() createWishDto: CreateWishDto) {
    return this.wishesService.create(req.user.id, createWishDto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Request() req,
    @Param('id') id: string,
    @Body() updateWishDto: UpdateWishDto,
  ) {
    return this.wishesService.update(req.user.id, +id, updateWishDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Request() req, @Param('id') id: string) {
    return this.wishesService.remove(req.user.id, +id);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/copy')
  copyWish(@Request() req, @Param('id') id: string) {
    return this.wishesService.copyWish(req.user.id, +id);
  }
}
