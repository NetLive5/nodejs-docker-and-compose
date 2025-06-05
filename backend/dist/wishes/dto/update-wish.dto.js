"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateWishDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_wish_dto_1 = require("./create-wish.dto");
class UpdateWishDto extends (0, mapped_types_1.PartialType)(create_wish_dto_1.CreateWishDto) {
}
exports.UpdateWishDto = UpdateWishDto;
//# sourceMappingURL=update-wish.dto.js.map