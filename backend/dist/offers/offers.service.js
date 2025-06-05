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
exports.OffersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const users_service_1 = require("../users/users.service");
const wishes_service_1 = require("../wishes/wishes.service");
const offer_entity_1 = require("./entities/offer.entity");
let OffersService = class OffersService {
    constructor(offerRepository, usersService, wishesService) {
        this.offerRepository = offerRepository;
        this.usersService = usersService;
        this.wishesService = wishesService;
    }
    async create(userId, createOfferDto) {
        if (isNaN(userId) || userId <= 0) {
            throw new common_1.BadRequestException('Некорректный ID пользователя');
        }
        const user = await this.usersService.findOne({
            where: { id: userId },
        });
        if (isNaN(createOfferDto.itemId) || createOfferDto.itemId <= 0) {
            throw new common_1.BadRequestException('ID подарка должен быть положительным числом');
        }
        if (isNaN(createOfferDto.amount) || createOfferDto.amount <= 0) {
            throw new common_1.BadRequestException('Сумма должна быть положительным числом');
        }
        const wish = await this.wishesService.findOne(createOfferDto.itemId);
        if (wish.owner.id === userId) {
            throw new common_1.BadRequestException('Вы не можете скидываться на собственный подарок');
        }
        if (wish.raised + createOfferDto.amount > wish.price) {
            throw new common_1.BadRequestException('Сумма сбора превышает стоимость подарка');
        }
        await this.wishesService.updateRaised(wish.id, wish.raised + createOfferDto.amount);
        const offer = this.offerRepository.create({
            amount: createOfferDto.amount,
            user,
            item: wish,
            hidden: createOfferDto.hidden || false,
        });
        return this.offerRepository.save(offer);
    }
    async findAll() {
        return this.offerRepository.find({
            relations: ['user', 'item'],
        });
    }
    async findOne(id) {
        if (isNaN(id) || id <= 0) {
            throw new common_1.BadRequestException('Некорректный ID предложения');
        }
        const offer = await this.offerRepository.findOne({
            where: { id },
            relations: ['user', 'item'],
        });
        if (!offer) {
            throw new common_1.NotFoundException(`Предложение с ID ${id} не найдено`);
        }
        return offer;
    }
    async findOffersByWishId(wishId) {
        if (isNaN(wishId) || wishId <= 0) {
            throw new common_1.BadRequestException('Некорректный ID подарка');
        }
        await this.wishesService.findOne(wishId);
        return this.offerRepository.find({
            where: { item: { id: wishId } },
            relations: ['user', 'item'],
        });
    }
};
OffersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(offer_entity_1.Offer)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        users_service_1.UsersService,
        wishes_service_1.WishesService])
], OffersService);
exports.OffersService = OffersService;
//# sourceMappingURL=offers.service.js.map