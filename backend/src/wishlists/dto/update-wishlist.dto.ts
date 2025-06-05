import { IsArray, IsOptional, IsString, IsUrl, Length } from 'class-validator';

export class UpdateWishlistDto {
  @IsString()
  @Length(1, 250)
  @IsOptional()
  name?: string;

  @IsString()
  @Length(0, 1500)
  @IsOptional()
  description?: string;

  @IsUrl()
  @IsOptional()
  image?: string;

  @IsArray()
  @IsOptional()
  itemsId?: number[];
}
