import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { Wish } from '../wishes/entities/wish.entity';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { Wishlist } from './entities/wishlist.entity';
export declare class WishlistsService {
    private wishlistRepository;
    private wishRepository;
    private usersService;
    constructor(wishlistRepository: Repository<Wishlist>, wishRepository: Repository<Wish>, usersService: UsersService);
    create(userId: number, createWishlistDto: CreateWishlistDto): Promise<Wishlist>;
    findAll(): Promise<Wishlist[]>;
    findOne(id: number): Promise<Wishlist>;
    update(userId: number, wishlistId: number, updateWishlistDto: UpdateWishlistDto): Promise<Wishlist>;
    remove(userId: number, wishlistId: number): Promise<void>;
    getUserWishlists(userId: number): Promise<Wishlist[]>;
}
