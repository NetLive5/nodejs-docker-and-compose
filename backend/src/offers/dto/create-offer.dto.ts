import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  Min,
} from 'class-validator';

export class CreateOfferDto {
  @IsNumber()
  @Min(1)
  @IsNotEmpty()
  amount: number;

  @IsBoolean()
  @IsOptional()
  hidden?: boolean;

  @IsNumber()
  @IsNotEmpty()
  itemId: number;
}
