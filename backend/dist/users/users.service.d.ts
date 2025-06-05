import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { User } from './entities/user.entity';
export declare class UsersService {
    private userRepo;
    constructor(userRepo: Repository<User>);
    create(userData: Partial<User>): Promise<User>;
    findOne(searchParams: FindOneOptions<User>): Promise<User>;
    find(searchOptions?: FindManyOptions<User>): Promise<User[]>;
    findByUsernameOrEmail(query: string): Promise<User[]>;
    findByUsername(username: string): Promise<User>;
    updateOne(userId: number, userChanges: Partial<User>): Promise<User>;
    removeOne(userId: number): Promise<void>;
    private validateUniqueFields;
}
