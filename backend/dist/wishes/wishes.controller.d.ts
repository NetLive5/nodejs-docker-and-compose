import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
import { WishesService } from './wishes.service';
export declare class WishesController {
    private readonly wishesService;
    constructor(wishesService: WishesService);
    findLast(): Promise<import("./entities/wish.entity").Wish[]>;
    findPopular(): Promise<import("./entities/wish.entity").Wish[]>;
    findOne(id: string): Promise<import("./entities/wish.entity").Wish>;
    findOneWithOffers(id: string): Promise<import("./entities/wish.entity").Wish>;
    findUserWishes(id: string): Promise<import("./entities/wish.entity").Wish[]>;
    findWishesByUsername(username: string): Promise<import("./entities/wish.entity").Wish[]>;
    findCurrentUserWishes(req: any): Promise<import("./entities/wish.entity").Wish[]>;
    create(req: any, createWishDto: CreateWishDto): Promise<import("./entities/wish.entity").Wish>;
    update(req: any, id: string, updateWishDto: UpdateWishDto): Promise<import("./entities/wish.entity").Wish>;
    remove(req: any, id: string): Promise<void>;
    copyWish(req: any, id: string): Promise<import("./entities/wish.entity").Wish>;
}
