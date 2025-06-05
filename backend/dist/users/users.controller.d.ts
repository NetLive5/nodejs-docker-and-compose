import { WishesService } from 'src/wishes/wishes.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    private readonly wishesService;
    constructor(usersService: UsersService, wishesService: WishesService);
    findMe(req: any): Promise<import("./entities/user.entity").User>;
    updateMe(req: any, updateUserDto: UpdateUserDto): Promise<import("./entities/user.entity").User>;
    findMyWishes(req: any): Promise<import("../wishes/entities/wish.entity").Wish[]>;
    findByQuery(query: string): Promise<import("./entities/user.entity").User[]>;
    findOne(id: string): Promise<import("./entities/user.entity").User>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<import("./entities/user.entity").User>;
    remove(id: string): Promise<void>;
}
