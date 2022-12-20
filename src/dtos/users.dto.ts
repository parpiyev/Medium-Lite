import {
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
} from "class-validator";

export class ListUserDto {
  @IsNumber()
  @IsOptional()
  public limit: number;

  @IsNumber()
  @IsOptional()
  public offset: number;
}

export class CreateUserDto {
  @IsString()
  @IsEmail()
  public email: string;

  @IsString()
  @MinLength(6)
  public password: string;
}
