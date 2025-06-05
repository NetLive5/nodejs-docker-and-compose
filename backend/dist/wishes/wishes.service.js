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
exports.WishesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const users_service_1 = require("../users/users.service");
const wish_entity_1 = require("./entities/wish.entity");
let WishesService = class WishesService {
    constructor(wishRepository, usersService) {
        this.wishRepository = wishRepository;
        this.usersService = usersService;
    }
    async findLast() {
        return this.wishRepository.find({
            relations: ['owner'],
            order: { createdAt: 'DESC' },
            take: 40,
        });
    }
    async findPopular() {
        return this.wishRepository.find({
            relations: ['owner'],
            order: { copied: 'DESC' },
            take: 20,
        });
    }
    async findUserWishes(userId) {
        return this.wishRepository.find({
            where: { owner: { id: userId } },
            relations: ['owner'],
        });
    }
    async findOne(id) {
        const wish = await this.wishRepository.findOne({
            where: { id },
            relations: ['owner'],
        });
        if (!wish) {
            throw new common_1.NotFoundException(`Подарок с ID ${id} не найден`);
        }
        return wish;
    }
    async findOneWithOffers(id) {
        const wish = await this.wishRepository.findOne({
            where: { id },
            relations: ['owner', 'offers', 'offers.user'],
        });
        if (!wish) {
            throw new common_1.NotFoundException(`Подарок с ID ${id} не найден`);
        }
        return wish;
    }
    async findMany(ids) {
        return this.wishRepository.find({
            where: { id: (0, typeorm_2.In)(ids) },
        });
    }
    async create(userId, createWishDto) {
        const user = await this.usersService.findOne({
            where: { id: userId },
        });
        if (!user) {
            throw new common_1.NotFoundException('Пользователь не найден');
        }
        const wish = this.wishRepository.create(Object.assign(Object.assign({}, createWishDto), { owner: user }));
        return this.wishRepository.save(wish);
    }
    async update(userId, wishId, updateWishDto) {
        const wish = await this.wishRepository.findOne({
            where: { id: wishId },
            relations: ['owner', 'offers'],
        });
        if (!wish) {
            throw new common_1.NotFoundException(`Подарок с ID ${wishId} не найден`);
        }
        if (wish.owner.id !== userId) {
            throw new common_1.ForbiddenException('Вы не можете изменять чужие подарки');
        }
        if (wish.offers && wish.offers.length > 0 && updateWishDto.price) {
            throw new common_1.BadRequestException('Нельзя изменять стоимость подарка, на который уже есть предложения');
        }
        await this.wishRepository.update(wishId, updateWishDto);
        return this.wishRepository.findOne({
            where: { id: wishId },
            relations: ['owner'],
        });
    }
    async updateRaised(wishId, raised) {
        await this.wishRepository.update(wishId, { raised });
        return this.wishRepository.findOne({
            where: { id: wishId },
        });
    }
    async remove(userId, wishId) {
        const wish = await this.wishRepository.findOne({
            where: { id: wishId },
            relations: ['owner', 'offers'],
        });
        if (!wish) {
            throw new common_1.NotFoundException(`Подарок с ID ${wishId} не найден`);
        }
        if (wish.owner.id !== userId) {
            throw new common_1.ForbiddenException('Вы не можете удалять чужие подарки');
        }
        if (wish.offers && wish.offers.length > 0) {
            throw new common_1.BadRequestException('Нельзя удалить подарок, на который уже есть предложения');
        }
        await this.wishRepository.delete(wishId);
    }
    async findWishesByUsername(username) {
        if (!username || username.trim() === '') {
            throw new common_1.BadRequestException('Имя пользователя не может быть пустым');
        }
        const user = await this.usersService.findOne({
            where: { username },
        });
        if (!user) {
            throw new common_1.NotFoundException(`Пользователь с именем ${username} не найден`);
        }
        return this.findUserWishes(user.id);
    }
    async copyWish(userId, wishId) {
        const wish = await this.wishRepository.findOne({
            where: { id: wishId },
            relations: ['owner'],
        });
        if (!wish) {
            throw new common_1.NotFoundException(`Подарок с ID ${wishId} не найден`);
        }
        const user = await this.usersService.findOne({
            where: { id: userId },
        });
        wish.copied += 1;
        await this.wishRepository.save(wish);
        const newWish = this.wishRepository.create({
            name: wish.name,
            description: wish.description,
            image: wish.image,
            link: wish.link,
            price: wish.price,
            owner: user,
            raised: 0,
            copied: 0,
        });
        return this.wishRepository.save(newWish);
    }
};
WishesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(wish_entity_1.Wish)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        users_service_1.UsersService])
], WishesService);
exports.WishesService = WishesService;
//# sourceMappingURL=wishes.service.js.map