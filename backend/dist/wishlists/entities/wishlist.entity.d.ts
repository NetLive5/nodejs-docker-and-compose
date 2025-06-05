import { User } from '../../users/entities/user.entity';
import { Wish } from '../../wishes/entities/wish.entity';
export declare class Wishlist {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    name: string;
    description: string;
    image: string;
    items: Wish[];
    owner: User;
}
