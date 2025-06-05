import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Length,
} from 'class-validator';

export class CreateWishlistDto {
  @IsString()
  @Length(1, 250)
  @IsNotEmpty()
  name: string;

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
