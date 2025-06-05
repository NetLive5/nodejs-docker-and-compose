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
exports.WishesController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const create_wish_dto_1 = require("./dto/create-wish.dto");
const update_wish_dto_1 = require("./dto/update-wish.dto");
const wishes_service_1 = require("./wishes.service");
let WishesController = class WishesController {
    constructor(wishesService) {
        this.wishesService = wishesService;
    }
    findLast() {
        return this.wishesService.findLast();
    }
    findPopular() {
        return this.wishesService.findPopular();
    }
    findOne(id) {
        return this.wishesService.findOne(+id);
    }
    findOneWithOffers(id) {
        return this.wishesService.findOneWithOffers(+id);
    }
    findUserWishes(id) {
        return this.wishesService.findUserWishes(+id);
    }
    findWishesByUsername(username) {
        return this.wishesService.findWishesByUsername(username);
    }
    findCurrentUserWishes(req) {
        return this.wishesService.findUserWishes(req.user.id);
    }
    create(req, createWishDto) {
        return this.wishesService.create(req.user.id, createWishDto);
    }
    update(req, id, updateWishDto) {
        return this.wishesService.update(req.user.id, +id, updateWishDto);
    }
    remove(req, id) {
        return this.wishesService.remove(req.user.id, +id);
    }
    copyWish(req, id) {
        return this.wishesService.copyWish(req.user.id, +id);
    }
};
__decorate([
    (0, common_1.Get)('last'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], WishesController.prototype, "findLast", null);
__decorate([
    (0, common_1.Get)('top'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], WishesController.prototype, "findPopular", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], WishesController.prototype, "findOne", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)(':id/full'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], WishesController.prototype, "findOneWithOffers", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('owner/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], WishesController.prototype, "findUserWishes", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('username/:username'),
    __param(0, (0, common_1.Param)('username')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], WishesController.prototype, "findWishesByUsername", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('me'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], WishesController.prototype, "findCurrentUserWishes", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_wish_dto_1.CreateWishDto]),
    __metadata("design:returntype", void 0)
], WishesController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, update_wish_dto_1.UpdateWishDto]),
    __metadata("design:returntype", void 0)
], WishesController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], WishesController.prototype, "remove", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)(':id/copy'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], WishesController.prototype, "copyWish", null);
WishesController = __decorate([
    (0, common_1.Controller)('wishes'),
    __metadata("design:paramtypes", [wishes_service_1.WishesService])
], WishesController);
exports.WishesController = WishesController;
//# sourceMappingURL=wishes.controller.js.map