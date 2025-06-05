import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { WishesService } from 'src/wishes/wishes.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly wishesService: WishesService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('me')
  findMe(@Req() req) {
    return this.usersService.findOne({
      where: { id: req.user.id },
    });
  }

  @UseGuards(JwtAuthGuard)
  @Patch('me')
  updateMe(@Req() req, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateOne(req.user.id, updateUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me/wishes')
  findMyWishes(@Req() req) {
    return this.wishesService.findUserWishes(req.user.id);
  }

  @Get('find')
  findByQuery(@Query('query') query: string) {
    return this.usersService.findByUsernameOrEmail(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne({
      where: { id: +id },
    });
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateOne(+id, updateUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.removeOne(+id);
  }
}
