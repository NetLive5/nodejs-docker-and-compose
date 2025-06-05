import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/singin.dto';
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
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
