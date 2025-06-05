import {
  IsEmail,
  IsOptional,
  IsString,
  Length,
  MinLength,
} from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @Length(2, 30)
  @IsOptional()
  username?: string;

  @IsString()
  @IsOptional()
  @Length(2, 200)
  about?: string;

  @IsString()
  @IsOptional()
  avatar?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @MinLength(6)
  @IsOptional()
  password?: string;
}
