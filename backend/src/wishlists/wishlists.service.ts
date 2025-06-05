import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { Wish } from '../wishes/entities/wish.entity';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { Wishlist } from './entities/wishlist.entity';

@Injectable()
export class WishlistsService {
  constructor(
    @InjectRepository(Wishlist)
    private wishlistRepository: Repository<Wishlist>,
    @InjectRepository(Wish)
    private wishRepository: Repository<Wish>,
    private usersService: UsersService,
  ) {}

  async create(
    userId: number,
    createWishlistDto: CreateWishlistDto,
  ): Promise<Wishlist> {
    const user = await this.usersService.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('Пользователь не найден');
    }

    const wishes = await this.wishRepository.find({
      where: { id: In(createWishlistDto.itemsId) },
    });

    const wishlist = this.wishlistRepository.create({
      name: createWishlistDto.name,
      description: createWishlistDto.description,
      image: createWishlistDto.image,
      owner: user,
      items: wishes,
    });
    return this.wishlistRepository.save(wishlist);
  }

  async findAll(): Promise<Wishlist[]> {
    return this.wishlistRepository.find({
      relations: ['owner', 'items', 'items.owner'],
    });
  }

  async findOne(id: number): Promise<Wishlist> {
    const wishlist = await this.wishlistRepository.findOne({
      where: { id },
      relations: ['owner', 'items', 'items.owner'],
    });

    if (!wishlist) {
      throw new NotFoundException(`Список подарков с ID ${id} не найден`);
    }
    return wishlist;
  }

  async update(
    userId: number,
    wishlistId: number,
    updateWishlistDto: UpdateWishlistDto,
  ): Promise<Wishlist> {
    const wishlist = await this.wishlistRepository.findOne({
      where: { id: wishlistId },
      relations: ['owner', 'items'],
    });

    if (!wishlist) {
      throw new NotFoundException(
        `Список подарков с ID ${wishlistId} не найден`,
      );
    }
    if (wishlist.owner.id !== userId) {
      throw new ForbiddenException(
        'Вы не можете изменять чужие списки подарков',
      );
    }

    if (updateWishlistDto.name) {
      wishlist.name = updateWishlistDto.name;
    }
    if (updateWishlistDto.description !== undefined) {
      wishlist.description = updateWishlistDto.description;
    }
    if (updateWishlistDto.image !== undefined) {
      wishlist.image = updateWishlistDto.image;
    }
    if (updateWishlistDto.itemsId && updateWishlistDto.itemsId.length > 0) {
      const wishes = await this.wishRepository.find({
        where: { id: In(updateWishlistDto.itemsId) },
      });
      wishlist.items = wishes;
    }
    return this.wishlistRepository.save(wishlist);
  }

  async remove(userId: number, wishlistId: number): Promise<void> {
    const wishlist = await this.wishlistRepository.findOne({
      where: { id: wishlistId },
      relations: ['owner'],
    });

    if (!wishlist) {
      throw new NotFoundException(
        `Список подарков с ID ${wishlistId} не найден`,
      );
    }

    if (wishlist.owner.id !== userId) {
      throw new ForbiddenException(
        'Вы не можете удалять чужие списки подарков',
      );
    }
    await this.wishlistRepository.delete(wishlistId);
  }

  async getUserWishlists(userId: number): Promise<Wishlist[]> {
    return this.wishlistRepository.find({
      where: { owner: { id: userId } },
      relations: ['owner', 'items', 'items.owner'],
    });
  }
}
