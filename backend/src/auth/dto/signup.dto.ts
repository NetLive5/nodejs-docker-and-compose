import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Length,
} from 'class-validator';

export class SignupDto {
  @IsString()
  @IsNotEmpty()
  @Length(2, 30)
  username: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsOptional()
  @Length(2, 200)
  about?: string;

  @IsUrl()
  @IsOptional()
  avatar?: string;
}
