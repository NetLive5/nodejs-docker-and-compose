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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Wish = void 0;
const class_validator_1 = require("class-validator");
const typeorm_1 = require("typeorm");
const offer_entity_1 = require("../../offers/entities/offer.entity");
const user_entity_1 = require("../../users/entities/user.entity");
let Wish = class Wish {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Wish.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Wish.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Wish.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 250 }),
    (0, class_validator_1.Length)(1, 250),
    __metadata("design:type", String)
], Wish.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsUrl)(),
    __metadata("design:type", String)
], Wish.prototype, "link", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsUrl)(),
    __metadata("design:type", String)
], Wish.prototype, "image", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], Wish.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], Wish.prototype, "raised", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.wishes),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", user_entity_1.User)
], Wish.prototype, "owner", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 1024 }),
    (0, class_validator_1.Length)(1, 1024),
    __metadata("design:type", String)
], Wish.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => offer_entity_1.Offer, (offer) => offer.item),
    __metadata("design:type", Array)
], Wish.prototype, "offers", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], Wish.prototype, "copied", void 0);
Wish = __decorate([
    (0, typeorm_1.Entity)()
], Wish);
exports.Wish = Wish;
//# sourceMappingURL=wish.entity.js.map