import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { WishesService } from '../wishes/wishes.service';
import { CreateOfferDto } from './dto/create-offer.dto';
import { Offer } from './entities/offer.entity';

@Injectable()
export class OffersService {
  constructor(
    @InjectRepository(Offer)
    private offerRepository: Repository<Offer>,
    private usersService: UsersService,
    private wishesService: WishesService,
  ) {}

  async create(userId: number, createOfferDto: CreateOfferDto): Promise<Offer> {
    if (isNaN(userId) || userId <= 0) {
      throw new BadRequestException('Некорректный ID пользователя');
    }

    const user = await this.usersService.findOne({
      where: { id: userId },
    });
    if (isNaN(createOfferDto.itemId) || createOfferDto.itemId <= 0) {
      throw new BadRequestException(
        'ID подарка должен быть положительным числом',
      );
    }
    if (isNaN(createOfferDto.amount) || createOfferDto.amount <= 0) {
      throw new BadRequestException('Сумма должна быть положительным числом');
    }

    const wish = await this.wishesService.findOne(createOfferDto.itemId);
    if (wish.owner.id === userId) {
      throw new BadRequestException(
        'Вы не можете скидываться на собственный подарок',
      );
    }
    if (wish.raised + createOfferDto.amount > wish.price) {
      throw new BadRequestException('Сумма сбора превышает стоимость подарка');
    }
    await this.wishesService.updateRaised(
      wish.id,
      wish.raised + createOfferDto.amount,
    );

    const offer = this.offerRepository.create({
      amount: createOfferDto.amount,
      user,
      item: wish,
      hidden: createOfferDto.hidden || false,
    });
    return this.offerRepository.save(offer);
  }

  async findAll(): Promise<Offer[]> {
    return this.offerRepository.find({
      relations: ['user', 'item'],
    });
  }

  async findOne(id: number): Promise<Offer> {
    if (isNaN(id) || id <= 0) {
      throw new BadRequestException('Некорректный ID предложения');
    }

    const offer = await this.offerRepository.findOne({
      where: { id },
      relations: ['user', 'item'],
    });
    if (!offer) {
      throw new NotFoundException(`Предложение с ID ${id} не найдено`);
    }
    return offer;
  }

  async findOffersByWishId(wishId: number): Promise<Offer[]> {
    if (isNaN(wishId) || wishId <= 0) {
      throw new BadRequestException('Некорректный ID подарка');
    }
    await this.wishesService.findOne(wishId);
    return this.offerRepository.find({
      where: { item: { id: wishId } },
      relations: ['user', 'item'],
    });
  }
}
