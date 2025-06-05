import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
import { Wish } from './entities/wish.entity';
export declare class WishesService {
    private wishRepository;
    private usersService;
    constructor(wishRepository: Repository<Wish>, usersService: UsersService);
    findLast(): Promise<Wish[]>;
    findPopular(): Promise<Wish[]>;
    findUserWishes(userId: number): Promise<Wish[]>;
    findOne(id: number): Promise<Wish>;
    findOneWithOffers(id: number): Promise<Wish>;
    findMany(ids: number[]): Promise<Wish[]>;
    create(userId: number, createWishDto: CreateWishDto): Promise<Wish>;
    update(userId: number, wishId: number, updateWishDto: UpdateWishDto): Promise<Wish>;
    updateRaised(wishId: number, raised: number): Promise<Wish>;
    remove(userId: number, wishId: number): Promise<void>;
    findWishesByUsername(username: string): Promise<Wish[]>;
    copyWish(userId: number, wishId: number): Promise<Wish>;
}
