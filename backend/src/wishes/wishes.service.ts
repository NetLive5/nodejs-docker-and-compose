import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
import { Wish } from './entities/wish.entity';

@Injectable()
export class WishesService {
  constructor(
    @InjectRepository(Wish)
    private wishRepository: Repository<Wish>,
    private usersService: UsersService,
  ) {}

  async findLast(): Promise<Wish[]> {
    return this.wishRepository.find({
      relations: ['owner'],
      order: { createdAt: 'DESC' },
      take: 40,
    });
  }

  async findPopular(): Promise<Wish[]> {
    return this.wishRepository.find({
      relations: ['owner'],
      order: { copied: 'DESC' },
      take: 20,
    });
  }

  async findUserWishes(userId: number): Promise<Wish[]> {
    return this.wishRepository.find({
      where: { owner: { id: userId } },
      relations: ['owner'],
    });
  }

  async findOne(id: number): Promise<Wish> {
    const wish = await this.wishRepository.findOne({
      where: { id },
      relations: ['owner'],
    });
    if (!wish) {
      throw new NotFoundException(`Подарок с ID ${id} не найден`);
    }
    return wish;
  }

  async findOneWithOffers(id: number): Promise<Wish> {
    const wish = await this.wishRepository.findOne({
      where: { id },
      relations: ['owner', 'offers', 'offers.user'],
    });
    if (!wish) {
      throw new NotFoundException(`Подарок с ID ${id} не найден`);
    }
    return wish;
  }

  async findMany(ids: number[]): Promise<Wish[]> {
    return this.wishRepository.find({
      where: { id: In(ids) },
    });
  }

  async create(userId: number, createWishDto: CreateWishDto): Promise<Wish> {
    const user = await this.usersService.findOne({
      where: { id: userId },
    });
    if (!user) {
      throw new NotFoundException('Пользователь не найден');
    }
    const wish = this.wishRepository.create({
      ...createWishDto,
      owner: user,
    });
    return this.wishRepository.save(wish);
  }

  async update(
    userId: number,
    wishId: number,
    updateWishDto: UpdateWishDto,
  ): Promise<Wish> {
    const wish = await this.wishRepository.findOne({
      where: { id: wishId },
      relations: ['owner', 'offers'],
    });
    if (!wish) {
      throw new NotFoundException(`Подарок с ID ${wishId} не найден`);
    }
    if (wish.owner.id !== userId) {
      throw new ForbiddenException('Вы не можете изменять чужие подарки');
    }
    if (wish.offers && wish.offers.length > 0 && updateWishDto.price) {
      throw new BadRequestException(
        'Нельзя изменять стоимость подарка, на который уже есть предложения',
      );
    }

    await this.wishRepository.update(wishId, updateWishDto);
    return this.wishRepository.findOne({
      where: { id: wishId },
      relations: ['owner'],
    });
  }

  async updateRaised(wishId: number, raised: number): Promise<Wish> {
    await this.wishRepository.update(wishId, { raised });
    return this.wishRepository.findOne({
      where: { id: wishId },
    });
  }

  async remove(userId: number, wishId: number): Promise<void> {
    const wish = await this.wishRepository.findOne({
      where: { id: wishId },
      relations: ['owner', 'offers'],
    });
    if (!wish) {
      throw new NotFoundException(`Подарок с ID ${wishId} не найден`);
    }
    if (wish.owner.id !== userId) {
      throw new ForbiddenException('Вы не можете удалять чужие подарки');
    }
    if (wish.offers && wish.offers.length > 0) {
      throw new BadRequestException(
        'Нельзя удалить подарок, на который уже есть предложения',
      );
    }
    await this.wishRepository.delete(wishId);
  }

  async findWishesByUsername(username: string): Promise<Wish[]> {
    if (!username || username.trim() === '') {
      throw new BadRequestException('Имя пользователя не может быть пустым');
    }

    const user = await this.usersService.findOne({
      where: { username },
    });
    if (!user) {
      throw new NotFoundException(
        `Пользователь с именем ${username} не найден`,
      );
    }
    return this.findUserWishes(user.id);
  }

  async copyWish(userId: number, wishId: number): Promise<Wish> {
    const wish = await this.wishRepository.findOne({
      where: { id: wishId },
      relations: ['owner'],
    });
    if (!wish) {
      throw new NotFoundException(`Подарок с ID ${wishId} не найден`);
    }

    const user = await this.usersService.findOne({
      where: { id: userId },
    });

    wish.copied += 1;
    await this.wishRepository.save(wish);

    const newWish = this.wishRepository.create({
      name: wish.name,
      description: wish.description,
      image: wish.image,
      link: wish.link,
      price: wish.price,
      owner: user,
      raised: 0,
      copied: 0,
    });
    return this.wishRepository.save(newWish);
  }
}
