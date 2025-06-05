import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { WishlistsService } from './wishlists.service';

@Controller('wishlists')
export class WishlistsController {
  constructor(private readonly wishlistsService: WishlistsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Req() req, @Body() createWishlistDto: CreateWishlistDto) {
    if (!req.user || !req.user.id) {
      throw new BadRequestException('Пользователь не авторизован');
    }
    return this.wishlistsService.create(req.user.id, createWishlistDto);
  }

  @Get()
  findAll() {
    return this.wishlistsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const wishlistId = parseInt(id, 10);
    if (isNaN(wishlistId) || wishlistId <= 0) {
      throw new BadRequestException('ID списка подарков должен быть числом');
    }
    return this.wishlistsService.findOne(wishlistId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('user/:userId')
  findUserWishlists(@Param('userId') userId: string) {
    const id = parseInt(userId, 10);
    if (isNaN(id) || id <= 0) {
      throw new BadRequestException('ID пользователя должен быть числом');
    }
    return this.wishlistsService.getUserWishlists(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  findMyWishlists(@Req() req) {
    if (!req.user || !req.user.id) {
      throw new BadRequestException('Пользователь не авторизован');
    }
    return this.wishlistsService.getUserWishlists(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Req() req,
    @Param('id') id: string,
    @Body() updateWishlistDto: UpdateWishlistDto,
  ) {
    if (!req.user || !req.user.id) {
      throw new BadRequestException('Пользователь не авторизован');
    }

    const wishlistId = parseInt(id, 10);
    if (isNaN(wishlistId) || wishlistId <= 0) {
      throw new BadRequestException('ID списка подарков должен быть числом');
    }

    return this.wishlistsService.update(
      req.user.id,
      wishlistId,
      updateWishlistDto,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Req() req, @Param('id') id: string) {
    if (!req.user || !req.user.id) {
      throw new BadRequestException('Пользователь не авторизован');
    }

    const wishlistId = parseInt(id, 10);
    if (isNaN(wishlistId) || wishlistId <= 0) {
      throw new BadRequestException('ID списка подарков должен быть числом');
    }

    return this.wishlistsService.remove(req.user.id, wishlistId);
  }
}
