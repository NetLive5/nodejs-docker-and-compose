import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginDto } from './dto/singin.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signup(createUserDto: CreateUserDto): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        username: string;
        about: string;
        avatar: string;
        email: string;
        wishes: import("../wishes/entities/wish.entity").Wish[];
        offers: import("../offers/entities/offer.entity").Offer[];
        wishlists: import("../wishlists/entities/wishlist.entity").Wishlist[];
    }>;
    signin(loginDto: LoginDto): Promise<{
        access_token: string;
    }>;
}
