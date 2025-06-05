import { Offer } from '../../offers/entities/offer.entity';
import { User } from '../../users/entities/user.entity';
export declare class Wish {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    name: string;
    link: string;
    image: string;
    price: number;
    raised: number;
    owner: User;
    description: string;
    offers: Offer[];
    copied: number;
}
