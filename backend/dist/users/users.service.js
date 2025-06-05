"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const bcrypt = require("bcrypt");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./entities/user.entity");
let UsersService = class UsersService {
    constructor(userRepo) {
        this.userRepo = userRepo;
    }
    async create(userData) {
        const existingUser = await this.userRepo.findOne({
            where: [{ email: userData.email }, { username: userData.username }],
        });
        if (existingUser) {
            if (existingUser.email === userData.email) {
                throw new common_1.ConflictException('Пользователь с таким email уже существует');
            }
            if (existingUser.username === userData.username) {
                throw new common_1.ConflictException('Пользователь с таким именем уже существует');
            }
        }
        if (userData.password) {
            userData.password = await bcrypt.hash(userData.password, 10);
        }
        const newUser = this.userRepo.create(userData);
        return this.userRepo.save(newUser);
    }
    async findOne(searchParams) {
        if (searchParams.where && typeof searchParams.where === 'object') {
            const whereParams = searchParams.where;
            if (whereParams.id !== undefined && isNaN(+whereParams.id)) {
                throw new common_1.BadRequestException('ID пользователя должен быть числом');
            }
        }
        const user = await this.userRepo.findOne(searchParams);
        if (!user) {
            throw new common_1.NotFoundException('Пользователь не найден');
        }
        return user;
    }
    async find(searchOptions = {}) {
        return this.userRepo.find(searchOptions);
    }
    async findByUsernameOrEmail(query) {
        if (!query || query.trim() === '') {
            throw new common_1.BadRequestException('Поисковый запрос не может быть пустым');
        }
        return this.userRepo.find({
            where: [{ username: (0, typeorm_2.Like)(`%${query}%`) }, { email: (0, typeorm_2.Like)(`%${query}%`) }],
        });
    }
    async findByUsername(username) {
        if (!username || username.trim() === '') {
            throw new common_1.BadRequestException('Имя пользователя не может быть пустым');
        }
        const user = await this.userRepo.findOne({
            where: { username },
        });
        if (!user) {
            throw new common_1.NotFoundException(`Пользователь с именем ${username} не найден`);
        }
        return user;
    }
    async updateOne(userId, userChanges) {
        if (isNaN(userId) || userId <= 0) {
            throw new common_1.BadRequestException('Некорректный ID пользователя');
        }
        const user = await this.userRepo.findOne({ where: { id: userId } });
        if (!user) {
            throw new common_1.NotFoundException(`Пользователь с ID ${userId} не найден`);
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
    async removeOne(userId) {
        if (isNaN(userId) || userId <= 0) {
            throw new common_1.BadRequestException('Некорректный ID пользователя');
        }
        const user = await this.userRepo.findOne({ where: { id: userId } });
        if (!user) {
            throw new common_1.NotFoundException(`Пользователь с ID ${userId} не найден`);
        }
        await this.userRepo.delete(userId);
    }
    async validateUniqueFields(currentUserId, updatedFields) {
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
                throw new common_1.ConflictException('Email уже занят другим пользователем');
            }
            if (existingUser.username === updatedFields.username) {
                throw new common_1.ConflictException('Имя пользователя уже занято');
            }
        }
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map