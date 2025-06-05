import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { FindManyOptions, FindOneOptions, Like, Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async create(userData: Partial<User>): Promise<User> {
    const existingUser = await this.userRepo.findOne({
      where: [{ email: userData.email }, { username: userData.username }],
    });
    if (existingUser) {
      if (existingUser.email === userData.email) {
        throw new ConflictException(
          'Пользователь с таким email уже существует',
        );
      }
      if (existingUser.username === userData.username) {
        throw new ConflictException(
          'Пользователь с таким именем уже существует',
        );
      }
    }
    if (userData.password) {
      userData.password = await bcrypt.hash(userData.password, 10);
    }

    const newUser = this.userRepo.create(userData);
    return this.userRepo.save(newUser);
  }

  async findOne(searchParams: FindOneOptions<User>): Promise<User> {
    if (searchParams.where && typeof searchParams.where === 'object') {
      const whereParams = searchParams.where as Record<string, any>;
      if (whereParams.id !== undefined && isNaN(+whereParams.id)) {
        throw new BadRequestException('ID пользователя должен быть числом');
      }
    }

    const user = await this.userRepo.findOne(searchParams);
    if (!user) {
      throw new NotFoundException('Пользователь не найден');
    }
    return user;
  }

  async find(searchOptions: FindManyOptions<User> = {}): Promise<User[]> {
    return this.userRepo.find(searchOptions);
  }

  async findByUsernameOrEmail(query: string): Promise<User[]> {
    if (!query || query.trim() === '') {
      throw new BadRequestException('Поисковый запрос не может быть пустым');
    }
    return this.userRepo.find({
      where: [{ username: Like(`%${query}%`) }, { email: Like(`%${query}%`) }],
    });
  }

  async findByUsername(username: string): Promise<User> {
    if (!username || username.trim() === '') {
      throw new BadRequestException('Имя пользователя не может быть пустым');
    }

    const user = await this.userRepo.findOne({
      where: { username },
    });
    if (!user) {
      throw new NotFoundException(
        `Пользователь с именем ${username} не найден`,
      );
    }
    return user;
  }

  async updateOne(userId: number, userChanges: Partial<User>): Promise<User> {
    if (isNaN(userId) || userId <= 0) {
      throw new BadRequestException('Некорректный ID пользователя');
    }

    const user = await this.userRepo.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`Пользователь с ID ${userId} не найден`);
    }
    if (userChanges.email || userChanges.username) {
      await this.validateUniqueFields(userId, userChanges);
    }
    if (userChanges.password) {
      userChanges.password = await bcrypt.hash(userChanges.password, 10);
    }
    await this.userRepo.update(userId, userChanges);
    return this.userRepo.findOne({ where: { id: userId } });
  }

  async removeOne(userId: number): Promise<void> {
    if (isNaN(userId) || userId <= 0) {
      throw new BadRequestException('Некорректный ID пользователя');
    }
    const user = await this.userRepo.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`Пользователь с ID ${userId} не найден`);
    }
    await this.userRepo.delete(userId);
  }

  private async validateUniqueFields(
    currentUserId: number,
    updatedFields: Partial<User>,
  ): Promise<void> {
    if (!updatedFields.email && !updatedFields.username) {
      return;
    }

    const whereConditions = [];
    if (updatedFields.email) {
      whereConditions.push({ email: updatedFields.email });
    }
    if (updatedFields.username) {
      whereConditions.push({ username: updatedFields.username });
    }

    const existingUser = await this.userRepo.findOne({
      where: whereConditions,
    });

    if (existingUser && existingUser.id !== currentUserId) {
      if (existingUser.email === updatedFields.email) {
        throw new ConflictException('Email уже занят другим пользователем');
      }
      if (existingUser.username === updatedFields.username) {
        throw new ConflictException('Имя пользователя уже занято');
      }
    }
  }
}
