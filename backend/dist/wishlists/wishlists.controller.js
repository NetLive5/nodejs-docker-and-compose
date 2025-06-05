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
exports.WishlistsController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const create_wishlist_dto_1 = require("./dto/create-wishlist.dto");
const update_wishlist_dto_1 = require("./dto/update-wishlist.dto");
const wishlists_service_1 = require("./wishlists.service");
let WishlistsController = class WishlistsController {
    constructor(wishlistsService) {
        this.wishlistsService = wishlistsService;
    }
    create(req, createWishlistDto) {
        if (!req.user || !req.user.id) {
            throw new common_1.BadRequestException('Пользователь не авторизован');
        }
        return this.wishlistsService.create(req.user.id, createWishlistDto);
    }
    findAll() {
        return this.wishlistsService.findAll();
    }
    findOne(id) {
        const wishlistId = parseInt(id, 10);
        if (isNaN(wishlistId) || wishlistId <= 0) {
            throw new common_1.BadRequestException('ID списка подарков должен быть числом');
        }
        return this.wishlistsService.findOne(wishlistId);
    }
    findUserWishlists(userId) {
        const id = parseInt(userId, 10);
        if (isNaN(id) || id <= 0) {
            throw new common_1.BadRequestException('ID пользователя должен быть числом');
        }
        return this.wishlistsService.getUserWishlists(id);
    }
    findMyWishlists(req) {
        if (!req.user || !req.user.id) {
            throw new common_1.BadRequestException('Пользователь не авторизован');
        }
        return this.wishlistsService.getUserWishlists(req.user.id);
    }
    update(req, id, updateWishlistDto) {
        if (!req.user || !req.user.id) {
            throw new common_1.BadRequestException('Пользователь не авторизован');
        }
        const wishlistId = parseInt(id, 10);
        if (isNaN(wishlistId) || wishlistId <= 0) {
            throw new common_1.BadRequestException('ID списка подарков должен быть числом');
        }
        return this.wishlistsService.update(req.user.id, wishlistId, updateWishlistDto);
    }
    remove(req, id) {
        if (!req.user || !req.user.id) {
            throw new common_1.BadRequestException('Пользователь не авторизован');
        }
        const wishlistId = parseInt(id, 10);
        if (isNaN(wishlistId) || wishlistId <= 0) {
            throw new common_1.BadRequestException('ID списка подарков должен быть числом');
        }
        return this.wishlistsService.remove(req.user.id, wishlistId);
    }
};
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_wishlist_dto_1.CreateWishlistDto]),
    __metadata("design:returntype", void 0)
], WishlistsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], WishlistsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], WishlistsController.prototype, "findOne", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('user/:userId'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], WishlistsController.prototype, "findUserWishlists", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('me'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], WishlistsController.prototype, "findMyWishlists", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, update_wishlist_dto_1.UpdateWishlistDto]),
    __metadata("design:returntype", void 0)
], WishlistsController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], WishlistsController.prototype, "remove", null);
WishlistsController = __decorate([
    (0, common_1.Controller)('wishlists'),
    __metadata("design:paramtypes", [wishlists_service_1.WishlistsService])
], WishlistsController);
exports.WishlistsController = WishlistsController;
//# sourceMappingURL=wishlists.controller.js.map