import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { WishesService } from '../wishes/wishes.service';
import { CreateOfferDto } from './dto/create-offer.dto';
import { Offer } from './entities/offer.entity';
export declare class OffersService {
    private offerRepository;
    private usersService;
    private wishesService;
    constructor(offerRepository: Repository<Offer>, usersService: UsersService, wishesService: WishesService);
    create(userId: number, createOfferDto: CreateOfferDto): Promise<Offer>;
    findAll(): Promise<Offer[]>;
    findOne(id: number): Promise<Offer>;
    findOffersByWishId(wishId: number): Promise<Offer[]>;
}
