"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OffersModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const users_module_1 = require("../users/users.module");
const wishes_module_1 = require("../wishes/wishes.module");
const offer_entity_1 = require("./entities/offer.entity");
const offers_controller_1 = require("./offers.controller");
const offers_service_1 = require("./offers.service");
let OffersModule = class OffersModule {
};
OffersModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([offer_entity_1.Offer]), users_module_1.UsersModule, wishes_module_1.WishesModule],
        controllers: [offers_controller_1.OffersController],
        providers: [offers_service_1.OffersService],
        exports: [offers_service_1.OffersService],
    })
], OffersModule);
exports.OffersModule = OffersModule;
//# sourceMappingURL=offers.module.js.map