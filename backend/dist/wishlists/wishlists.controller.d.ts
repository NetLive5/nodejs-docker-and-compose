import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { WishlistsService } from './wishlists.service';
export declare class WishlistsController {
    private readonly wishlistsService;
    constructor(wishlistsService: WishlistsService);
    create(req: any, createWishlistDto: CreateWishlistDto): Promise<import("./entities/wishlist.entity").Wishlist>;
    findAll(): Promise<import("./entities/wishlist.entity").Wishlist[]>;
    findOne(id: string): Promise<import("./entities/wishlist.entity").Wishlist>;
    findUserWishlists(userId: string): Promise<import("./entities/wishlist.entity").Wishlist[]>;
    findMyWishlists(req: any): Promise<import("./entities/wishlist.entity").Wishlist[]>;
    update(req: any, id: string, updateWishlistDto: UpdateWishlistDto): Promise<import("./entities/wishlist.entity").Wishlist>;
    remove(req: any, id: string): Promise<void>;
}
