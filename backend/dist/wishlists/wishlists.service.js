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
exports.WishlistsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const users_service_1 = require("../users/users.service");
const wish_entity_1 = require("../wishes/entities/wish.entity");
const wishlist_entity_1 = require("./entities/wishlist.entity");
let WishlistsService = class WishlistsService {
    constructor(wishlistRepository, wishRepository, usersService) {
        this.wishlistRepository = wishlistRepository;
        this.wishRepository = wishRepository;
        this.usersService = usersService;
    }
    async create(userId, createWishlistDto) {
        const user = await this.usersService.findOne({
            where: { id: userId },
        });
        if (!user) {
            throw new common_1.NotFoundException('Пользователь не найден');
        }
        const wishes = await this.wishRepository.find({
            where: { id: (0, typeorm_2.In)(createWishlistDto.itemsId) },
        });
        const wishlist = this.wishlistRepository.create({
            name: createWishlistDto.name,
            description: createWishlistDto.description,
            image: createWishlistDto.image,
            owner: user,
            items: wishes,
        });
        return this.wishlistRepository.save(wishlist);
    }
    async findAll() {
        return this.wishlistRepository.find({
            relations: ['owner', 'items', 'items.owner'],
        });
    }
    async findOne(id) {
        const wishlist = await this.wishlistRepository.findOne({
            where: { id },
            relations: ['owner', 'items', 'items.owner'],
        });
        if (!wishlist) {
            throw new common_1.NotFoundException(`Список подарков с ID ${id} не найден`);
        }
        return wishlist;
    }
    async update(userId, wishlistId, updateWishlistDto) {
        const wishlist = await this.wishlistRepository.findOne({
            where: { id: wishlistId },
            relations: ['owner', 'items'],
        });
        if (!wishlist) {
            throw new common_1.NotFoundException(`Список подарков с ID ${wishlistId} не найден`);
        }
        if (wishlist.owner.id !== userId) {
            throw new common_1.ForbiddenException('Вы не можете изменять чужие списки подарков');
        }
        if (updateWishlistDto.name) {
            wishlist.name = updateWishlistDto.name;
        }
        if (updateWishlistDto.description !== undefined) {
            wishlist.description = updateWishlistDto.description;
        }
        if (updateWishlistDto.image !== undefined) {
            wishlist.image = updateWishlistDto.image;
        }
        if (updateWishlistDto.itemsId && updateWishlistDto.itemsId.length > 0) {
            const wishes = await this.wishRepository.find({
                where: { id: (0, typeorm_2.In)(updateWishlistDto.itemsId) },
            });
            wishlist.items = wishes;
        }
        return this.wishlistRepository.save(wishlist);
    }
    async remove(userId, wishlistId) {
        const wishlist = await this.wishlistRepository.findOne({
            where: { id: wishlistId },
            relations: ['owner'],
        });
        if (!wishlist) {
            throw new common_1.NotFoundException(`Список подарков с ID ${wishlistId} не найден`);
        }
        if (wishlist.owner.id !== userId) {
            throw new common_1.ForbiddenException('Вы не можете удалять чужие списки подарков');
        }
        await this.wishlistRepository.delete(wishlistId);
    }
    async getUserWishlists(userId) {
        return this.wishlistRepository.find({
            where: { owner: { id: userId } },
            relations: ['owner', 'items', 'items.owner'],
        });
    }
};
WishlistsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(wishlist_entity_1.Wishlist)),
    __param(1, (0, typeorm_1.InjectRepository)(wish_entity_1.Wish)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        users_service_1.UsersService])
], WishlistsService);
exports.WishlistsService = WishlistsService;
//# sourceMappingURL=wishlists.service.js.map