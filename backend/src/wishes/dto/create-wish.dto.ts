import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUrl,
  Length,
  Min,
} from 'class-validator';

export class CreateWishDto {
  @IsString()
  @Length(1, 250)
  @IsNotEmpty()
  name: string;

  @IsUrl()
  @IsNotEmpty()
  link: string;

  @IsUrl()
  @IsNotEmpty()
  image: string;

  @IsNumber()
  @Min(1)
  price: number;

  @IsString()
  @Length(1, 1024)
  @IsNotEmpty()
  description: string;
}
